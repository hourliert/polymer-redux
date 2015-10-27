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

/**
 * Connector behavior
 * @polymerBehavior
 * @param {Function} mapStateToProps    Function that maps state props to element props
 * @param {Function} mapDispatchToProps Function that maps dispatch functions to element props
 * @param {Function} mergeProps         Merge function used to merge state and dispatch props
 * @param {Object} options            Option
 */
Polymer.ReduxConnectBehavior = function (mapStateToProps, mapDispatchToProps, mergeProps) {
	var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	var finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
	var finalMapDispatchToProps = mapDispatchToProps || defaultMapDispatchToProps;
	var finalMergeProps = mergeProps || defaultMergeProps;

	return {
		properties: {
			/**
    * Redux store
    * @type {Object}
    */
			_store: {
				type: Object
			}
		},

		/**
   * On creation we subscribe to the redux provider and map
   * states and dispatches to component properties.
   */
		created: function created() {
			var _this = this;

			this.async(function () {
				var provider = _this.create('redux-provider');
				var store = _this._store = provider.store;
				var stateProps = _this._computeStateProps(store);
				var dispatchProps = _this._computeDispatchProps(store);

				Object.assign(_this, finalMergeProps(stateProps, dispatchProps));

				store.subscribe(_this._handleNewState.bind(_this));
			}, 1);
		},

		/**
   * On new state, we update mapped props
   */
		_handleNewState: function _handleNewState() {
			var stateProps = this._computeStateProps(this._store);
			Object.assign(this, stateProps);
		},

		/**
   * Map the state to element props.
   * @param  {Object} store Redux store
   * @param  {Object} props Element properties
   * @return {Object}       The mapped props
   */
		_computeStateProps: function _computeStateProps(store) {
			var props = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];

			var state = store.getState();
			var stateProps = finalMapStateToProps(state, props);

			return stateProps;
		},

		/**
   * Map the dispatch function to element props.
   * @param  {Object} store Redux store
   * @param  {Object} props Element properties
   * @return {Object}       The mapped dispatch functions
   */
		_computeDispatchProps: function _computeDispatchProps(store) {
			var props = arguments.length <= 1 || arguments[1] === undefined ? this : arguments[1];
			var dispatch = store.dispatch;

			var dispatchProps = finalMapDispatchToProps(dispatch, props);

			return dispatchProps;
		}
	};
};