var Hammer, SHOW_LOG, _, bus,
  slice = [].slice;

Hammer = require('hammerjs');

bus = require('./bus');

_ = require('lodash');

SHOW_LOG = true;

module.exports = {
  _mcs: {},
  _interpreterEvents: {},
  _feedbackEvents: {},
  _customEvents: {},
  isLocked: function(id) {
    return (this.currentId != null) && this.currentId !== id;
  },
  isPending: function(id) {
    return this.currentId === id;
  },
  startTouch: function(id) {
    return this.currentId = id;
  },
  endTouch: function() {
    return this.currentId = null;
  },
  emit: function() {
    var params;
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    bus.$emit.apply(bus, params);
    if (SHOW_LOG) {
      return console.log("TOUCH: " + params[0]);
    }
  },
  offInput: function(id) {
    if (this._mcs[id]) {
      return this._mcs[id].off("hammer.input");
    }
  },
  onInput: function(id, el, cb) {
    this._mcs[id] = new Hammer(el, {
      inputClass: Hammer.TouchInput
    });
    return this._mcs[id].on("hammer.input", cb);
  },
  offInterpreter: function(id) {
    return _.each(this._interpreterEvents[id], function(cb, key) {
      return bus.$off(key, cb);
    });
  },
  onInterpreter: function(id, events) {
    this._interpreterEvents[id] = events;
    return _.each(this._interpreterEvents[id], function(cb, key) {
      return bus.$on(key, cb);
    });
  },
  offFeedback: function(id) {
    return _.each(this._feedbackEvents[id], function(cb, key) {
      return bus.$off(key, cb);
    });
  },
  onFeedback: function(id, events) {
    this._feedbackEvents[id] = events;
    return _.each(this._feedbackEvents[id], function(cb, key) {
      return bus.$on(key, cb);
    });
  },
  offCustom: function(id) {
    return _.each(this._customEvents[id], function(cb, key) {
      return bus.$off(key, cb);
    });
  },
  onCustom: function(id, events) {
    this._customEvents[id] = events;
    return _.each(this._customEvents[id], function(cb, key) {
      return bus.$on(key, cb);
    });
  }
};
