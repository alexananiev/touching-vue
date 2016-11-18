Vue = require 'vue'
SHOW_LOG = true

module.exports = new Vue
  # data: ->
  #   mcs: []
  #   mcEvents: []
  #   current: null
  #   interpreters: []
  #   feedbacks: []
  # methods:
  #   startTouch: (id)-> @current = id
  #   endTouch: -> @current = null
  #   clearHammer: ->
  #
  #
  #   clearInterpreterEvents: ->
  #     if (this.events) {
  #       _.each(this.events, (cb, key) => {
  #         bus.$off(key, cb)
  #       })
  #     }
  #   clear: (id)->
  #     @mcs[id].off("hammer.input") if @mcs[id]
  #   emit: (params...)->
  #     @$emit params...
  #     console.log "TOUCH: #{params[0]}" if SHOW_LOG

#
# import Vue from 'vue'
#
# const SHOW_LOG = true
#
# export default new Vue({
#   methods: {
#     emit (...params) {
#       this.$emit(...params)
#       if (SHOW_LOG) console.log(`TOUCH: ${params[0]}`)
#     }
#   }
# })
