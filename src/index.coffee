# bus = require './bus'
core = require './core'
_ = require 'lodash'

module.exports =
  install: (Vue, options = {})->

    { interpreters, feedbacks, prefix, plugins } = options

    core.interpreters = interpreters
    core.feedbacks = feedbacks

    prefix ||= 'touch'

    corePlugins =
      recognize: require './plugins/recognize'
      interpreter: require './plugins/interpreter'
      feedback: require './plugins/feedback'

    allPlugins = _.merge {}, corePlugins, plugins || {}

    isChanged = (el, binding, vnode)-> binding.value isnt binding.oldValue

    _.each allPlugins, (pluginInit, name)->

      plugin = pluginInit core

      Vue.directive "#{prefix}-#{name}",
        bind: (params...)-> plugin.on params...
        update: (params...)->
          if isChanged params...
            plugin.offOld params... # here should be oldValue
            plugin.on params...
        unbind: (params...)-> plugin.off params... # here should be value
