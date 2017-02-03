var _,
  slice = [].slice;

_ = require('lodash');

module.exports = function(core) {
  return {
    on: function(el, binding, vnode) {
      var arg, events, fire, id, modifiers, oldValue, payload, type, value;
      value = binding.value, oldValue = binding.oldValue, arg = binding.arg, modifiers = binding.modifiers;
      type = arg;
      id = type + "/" + value;
      payload = {
        type: type,
        id: value
      };
      fire = function() {
        var ev, params;
        ev = arguments[0], params = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        return core.emit.apply(core, [ev + "/" + value].concat(slice.call(params)));
      };
      if (core.interpreters[type]) {
        events = {};
        _.each(core.interpreters[type], function(cb, key) {
          return events[key + "/" + value] = function() {
            var params;
            params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            cb.call.apply(cb, [vnode.context, fire].concat(slice.call(params)));
            return true;
          };
        });
        return core.onInterpreter(id, events);
      } else {
        return console.log("error: can't find " + type + " interpreter");
      }
    },
    off: function(el, arg1, vnode) {
      var arg, id, modifiers, oldValue, type, value;
      value = arg1.value, oldValue = arg1.oldValue, arg = arg1.arg, modifiers = arg1.modifiers;
      type = arg;
      id = type + "/" + value;
      return core.offInterpreter(id);
    },
    offOld: function(el, arg1, vnode) {
      var arg, id, modifiers, oldValue, type, value;
      value = arg1.value, oldValue = arg1.oldValue, arg = arg1.arg, modifiers = arg1.modifiers;
      type = arg;
      id = type + "/" + oldValue;
      return core.offInterpreter(id);
    }
  };
};
