module.exports = (core)->
  on: (el, binding, vnode)->

    {value, oldValue, arg, modifiers} = binding
    type = arg

    id = "#{type}/#{value}"
    payload = { type: type, id: value }

    if core.feedbacks[type]

      events = {}
      _.each core.feedbacks[type], (cb, key)->
        events["#{key}/#{value}"] = (params...)->
          cb.call vnode.context, params...
          true
      core.onFeedback id, events
    else
      console.log "error: can't find #{type} feedback"

  off: (el, {value, oldValue, arg, modifiers}, vnode)->
    type = arg
    id = "#{type}/#{oldValue}"
    core.offFeedback id # interpreterEvents event
