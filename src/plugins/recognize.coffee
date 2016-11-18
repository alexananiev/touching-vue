_ = require 'lodash'
Hammer = require 'hammerjs'

directions =
  vertical: [Hammer.DIRECTION_UP, Hammer.DIRECTION_DOWN]
  horizontal: [Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT]
  any: [Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT, Hammer.DIRECTION_UP, Hammer.DIRECTION_DOWN]

module.exports = (core)->
  on: (el, binding, vnode)->
    {value, oldValue, arg, modifiers} = binding

    code = _.keys(modifiers)[0] || 'any' # or 'horizontal' or 'vertical'
    type = arg

    id = "#{code}/#{type}/#{value}"
    payload = { type: type, id: value }

    core.onInput id, el, (ev)->
      unless core.isLocked id
        if core.isPending id
          core.emit "#{code}-move:#{type}/#{value}", ev, payload

          if  ev.eventType is 4
            core.endTouch()
            core.emit "#{code}-end:#{type}/#{value}", ev, payload

        else if ev.eventType in [1, 2] && ev.direction in directions[code]
          core.startTouch id
          core.emit "#{code}-start:#{type}/#{value}", ev, payload

  off: (el, binding, vnode)->
    {value, oldValue, arg, modifiers} = binding
    code = _.keys(modifiers)[0] || 'any'
    type = arg
    core.offInput "#{code}/#{type}/#{oldValue}"
