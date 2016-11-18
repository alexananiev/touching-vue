Hammer = require 'hammerjs'
bus = require './bus'
_ = require 'lodash'

SHOW_LOG = true

module.exports =

  _mcs: {}
  _interpreterEvents: {}
  _feedbackEvents: {}
  _customEvents: {}

  isLocked: (id)-> @currentId? && @currentId != id

  isPending: (id)-> @currentId == id

  startTouch: (id)-> @currentId = id

  endTouch: -> @currentId = null

  emit: (params...)->
    bus.$emit params...
    console.log "TOUCH: #{params[0]}" if SHOW_LOG

  offInput: (id)->
    @_mcs[id].off "hammer.input" if @_mcs[id]

  onInput: (id, el, cb)->
    @_mcs[id] = new Hammer el, inputClass: Hammer.TouchInput
    @_mcs[id].on "hammer.input", cb


  # TODO: should be more elegant way

  offInterpreter: (id)->
    _.each @_interpreterEvents[id], (cb, key)-> bus.$off key, cb

  onInterpreter: (id, events)->
    @_interpreterEvents[id] = events
    _.each @_interpreterEvents[id], (cb, key)-> bus.$on key, cb

  offFeedback: (id)->
    _.each @_feedbackEvents[id], (cb, key)-> bus.$off key, cb

  onFeedback: (id, events)->
    @_feedbackEvents[id] = events
    _.each @_feedbackEvents[id], (cb, key)-> bus.$on key, cb

  offCustom: (id)->
    _.each @_customEvents[id], (cb, key)-> bus.$off key, cb

  onCustom: (id, events)->
    @_customEvents[id] = events
    _.each @_customEvents[id], (cb, key)-> bus.$on key, cb
