var _,
  slice = [].slice;

_ = require('lodash');

module.exports = function(core) {
  return {
    on: function(el, binding, vnode) {
      var arg, events, id, modifiers, oldValue, payload, type, value;
      value = binding.value, oldValue = binding.oldValue, arg = binding.arg, modifiers = binding.modifiers;
      type = arg;
      id = type + "/" + value;
      payload = {
        type: type,
        id: value
      };
      if (core.feedbacks[type]) {
        events = {};
        _.each(core.feedbacks[type], function(cb, key) {
          return events[key + "/" + value] = function() {
            var params;
            params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            cb.call.apply(cb, [vnode.context].concat(slice.call(params)));
            return true;
          };
        });
        return core.onFeedback(id, events);
      } else {
        return console.log("error: can't find " + type + " feedback");
      }
    },
    off: function(el, arg1, vnode) {
      var arg, id, modifiers, oldValue, type, value;
      value = arg1.value, oldValue = arg1.oldValue, arg = arg1.arg, modifiers = arg1.modifiers;
      type = arg;
      id = type + "/" + oldValue;
      return core.offFeedback(id);
    }
  };
};
