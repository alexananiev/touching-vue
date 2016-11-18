var _, core,
  slice = [].slice;

core = require('./core');

_ = require('lodash');

module.exports = {
  install: function(Vue, options) {
    var allPlugins, corePlugins, feedbacks, interpreters, isChanged, plugins, prefix;
    if (options == null) {
      options = {};
    }
    interpreters = options.interpreters, feedbacks = options.feedbacks, prefix = options.prefix, plugins = options.plugins;
    core.interpreters = interpreters;
    core.feedbacks = feedbacks;
    prefix || (prefix = 'touch');
    corePlugins = {
      recognize: require('./plugins/recognize'),
      interpreter: require('./plugins/interpreter'),
      feedback: require('./plugins/feedback')
    };
    allPlugins = _.merge({}, corePlugins, plugins || {});
    isChanged = function(el, binding, vnode) {
      return binding.value !== binding.oldValue;
    };
    return _.each(allPlugins, function(pluginInit, name) {
      var plugin;
      plugin = pluginInit(core);
      return Vue.directive(prefix + "-" + name, {
        bind: function() {
          var params;
          params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return plugin.on.apply(plugin, params);
        },
        update: function() {
          var params;
          params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (isChanged.apply(null, params)) {
            plugin.off.apply(plugin, params);
            return plugin.on.apply(plugin, params);
          }
        },
        unbind: function() {
          var params;
          params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return plugin.off.apply(plugin, params);
        }
      });
    });
  }
};
