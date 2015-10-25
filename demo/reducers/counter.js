// this is very ugly because we don't have any module loader

/**
 * Counter reducer
 * @param  {Object} state  Redux state
 * @param  {{type: string, ...rest}} action Redux action
 * @return {Object}        New Redux State
 */
function counterReducer(state, action) {
  if (!state) {
    state = 0;
  }

  switch (action.type) {
  case SET_COUNTER:
    return action.payload;
  case INCREMENT_COUNTER:
    return state + 1;
  case DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}

var rootReducer = Redux.combineReducers({counter: counterReducer});