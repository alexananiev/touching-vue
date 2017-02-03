_ = require 'lodash'

module.exports = (core)->
  on: (el, binding, vnode)->
    {value, oldValue, arg, modifiers} = binding
    type = arg

    id = "#{type}/#{value}"
    payload = { type: type, id: value }

    fire = (ev, params...)-> core.emit "#{ev}/#{value}", params...

    if core.interpreters[type]

      events = {}
      _.each core.interpreters[type], (cb, key)->
        events["#{key}/#{value}"] = (params...)->
          cb.call vnode.context, fire, params...
          true
      core.onInterpreter id, events
    else
      console.log "error: can't find #{type} interpreter"

  off: (el, {value, oldValue, arg, modifiers}, vnode)->
    type = arg
    id = "#{type}/#{value}"
    core.offInterpreter id

  offOld: (el, {value, oldValue, arg, modifiers}, vnode)->
    type = arg
    id = "#{type}/#{oldValue}"
    core.offInterpreter id
