'use strict';

var StoreEngine = Object.defineProperties({

  reduxProvider: null,

  attachReduxProvider: function attachReduxProvider(provider) {
    this.reduxProvider = provider;
  },

  detachReduxProvider: function detachReduxProvider() {
    this.reduxProvider = null;
  }

}, {
  store: {
    get: function get() {
      return this._store;
    },
    set: function set(s) {
      this._store = s;
    },
    configurable: true,
    enumerable: true
  }
});

Polymer(Object.defineProperties({

  is: 'redux-provider',

  properties: {

    /**
     * Redux Store
     * @type {Object}
     */
    _storeEngine: {
      type: Object,
      readOnly: true,
      value: StoreEngine
    }
  }

}, {
  store: {
    get: function get() {
      return this._storeEngine.store;
    },
    set: function set(s) {
      this._storeEngine.store = s;
    },
    configurable: true,
    enumerable: true
  }
}));