/** @polymerBehavior */
'use strict';

Polymer.ReduxConnectBehavior = {
  properties: {
    store: {
      type: Object
    },

    state: {
      type: Object
    }
  },

  created: function created() {
    var provider = this.create('redux-provider');

    this.async(function () {
      var store = this.store = provider.store;
      console.log(store);
      store.subscribe(this._handleState.bind(this));

      store.dispatch({
        type: 'increment'
      });
    }, 1);
  },

  _handleState: function _handleState() {
    console.log(this.store.getState());
  }
};