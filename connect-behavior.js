/* jshint ignore:start */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultMapStateToProps = function defaultMapStateToProps() {
	return {};
};
var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	return { dispatch: dispatch };
};
var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	return _extends({}, parentProps, stateProps, dispatchProps);
};

/** @polymerBehavior */
Polymer.ReduxConnectBehavior = function (mapStateToProps, mapDispatchToProps, mergeProps) {
	var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	var shouldSubscribe = Boolean(mapStateToProps);
	var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
	var finalMapDispatchToProps = mapDispatchToProps || defaultMapDispatchToProps;
	var finalMergeProps = mergeProps || defaultMergeProps;

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
				var store = _this._store = provider.store;

				store.subscribe(_this._handleNewState.bind(_this));

				_this._updateStateProps();
				_this._updateDispatchProps();
				Object.assign(_this, _this._computeNextState(_this._stateProps, _this._dispatchProps));
			}, 1);
		},

		_handleNewState: function _handleNewState() {
			Object.assign(this, this._store.getState());
		},

		_computeNextState: function _computeNextState(stateProps, dispatchProps) {
			var mergedProps = finalMergeProps(stateProps, dispatchProps);
			return mergedProps;
		},

		_updateStateProps: function _updateStateProps() {
			var props = arguments.length <= 0 || arguments[0] === undefined ? this : arguments[0];

			var nextStateProps = this._computeStateProps(this._store, props);
			this._stateProps = nextStateProps;
		},

		_updateDispatchProps: function _updateDispatchProps() {
			var props = arguments.length <= 0 || arguments[0] === undefined ? this : arguments[0];

			var nextDispatchProps = this._computeDispatchProps(this._store, props);
			this._dispatchProps = nextDispatchProps;
		},

		_computeStateProps: function _computeStateProps(store, props) {
			var state = store.getState();
			var stateProps = mapStateToProps(state, props);

			return stateProps;
		},

		_computeDispatchProps: function _computeDispatchProps(store, props) {
			var dispatch = store.dispatch;

			var dispatchProps = finalMapDispatchToProps(dispatch, props);

			return dispatchProps;
		}
	};
};