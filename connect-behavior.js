/** @polymerBehavior */
'use strict';

Polymer.ReduxConnectBehavior = function (mapStateToProps) {
	return {
		properties: {
			store: {
				type: Object
			},

			state: {
				type: Object
			}
		},

		created: function created() {
			var _this = this;

			this.async(function () {
				var provider = _this.create('redux-provider');
				var store = _this.store = provider.store;

				store.subscribe(_this._handleNewState.bind(_this));

				_this._computeStateProps(store);
			}, 1);
		},

		_handleNewState: function _handleNewState() {
			console.log(this.store.getState());
		},

		_computeStateProps: function _computeStateProps(store, props) {
			var state = store.getState();
			var stateProps = mapStateToProps(state, props);

			return stateProps;
		}
	};
};