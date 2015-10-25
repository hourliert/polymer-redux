/**
     * Handle globaly the redux Store
     * @type {Object}
     */
'use strict';

var StoreEngine = Object.defineProperties({}, {
  store: {

    /**
     * Get the store
     * @return {Object} Redux store
     */

    get: function get() {
      return this._store;
    },

    /**
     * Set the store
     * @param  {Object} s Redux store
     */
    set: function set(s) {
      if (this._store) {
        console.log('\n            A store has already been registred.\n            Ignoring.\n          ');
      } else {
        this._store = s;
      }
    },
    configurable: true,
    enumerable: true
  }
});

Polymer(Object.defineProperties({

  is: 'redux-provider',

  properties: {

    /**
     * Redux store handler
     * @readonly
     * @type {Object}
     */
    _storeEngine: {
      type: Object,
      readOnly: true,
      value: StoreEngine
    }
  }

}, {
  store: { /**
            * Get the store
            * @return {Object} The redux store
            */

    get: function get() {
      return this._storeEngine.store;
    },

    /**
     * Set the store
     * @param  {Object} s Redux store
     */
    set: function set(s) {
      this._storeEngine.store = s;
    },
    configurable: true,
    enumerable: true
  }
}));