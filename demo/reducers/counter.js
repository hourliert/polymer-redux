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
  case 'set':
    return action.payload;
  case 'increment':
    return state + 1;
  case 'decrement':
    return state - 1;
  default:
    return state;
  }
}