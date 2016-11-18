var Hammer, _, directions,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require('lodash');

Hammer = require('hammerjs');

directions = {
  vertical: [Hammer.DIRECTION_UP, Hammer.DIRECTION_DOWN],
  horizontal: [Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT],
  any: [Hammer.DIRECTION_LEFT, Hammer.DIRECTION_RIGHT, Hammer.DIRECTION_UP, Hammer.DIRECTION_DOWN]
};

module.exports = function(core) {
  return {
    on: function(el, binding, vnode) {
      var arg, code, id, modifiers, oldValue, payload, type, value;
      value = binding.value, oldValue = binding.oldValue, arg = binding.arg, modifiers = binding.modifiers;
      code = _.keys(modifiers)[0] || 'any';
      type = arg;
      id = code + "/" + type + "/" + value;
      payload = {
        type: type,
        id: value
      };
      return core.onInput(id, el, function(ev) {
        var ref, ref1;
        if (!core.isLocked(id)) {
          if (core.isPending(id)) {
            core.emit(code + "-move:" + type + "/" + value, ev, payload);
            if (ev.eventType === 4) {
              core.endTouch();
              return core.emit(code + "-end:" + type + "/" + value, ev, payload);
            }
          } else if (((ref = ev.eventType) === 1 || ref === 2) && (ref1 = ev.direction, indexOf.call(directions[code], ref1) >= 0)) {
            core.startTouch(id);
            return core.emit(code + "-start:" + type + "/" + value, ev, payload);
          }
        }
      });
    },
    off: function(el, binding, vnode) {
      var arg, code, modifiers, oldValue, type, value;
      value = binding.value, oldValue = binding.oldValue, arg = binding.arg, modifiers = binding.modifiers;
      code = _.keys(modifiers)[0] || 'any';
      type = arg;
      return core.offInput(code + "/" + type + "/" + oldValue);
    }
  };
};
