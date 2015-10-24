/** @polymerBehavior */
'use strict';

Polymer.ReduxConnectBehavior = {
  properties: {
    state: {
      type: Object
    }
  },

  ready: function ready() {
    this.store.subscribe(this._handleStore.bind(this));
    console.log(this.store);

    this.store.dispatch({
      type: 'increment'
    });
  },

  _handleStore: function _handleStore(res) {
    console.log(this.store.getState());
  }
};