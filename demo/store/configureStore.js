function configureStore(initialState) {
  var finalCreateStore;

  finalCreateStore = Redux.compose()(Redux.createStore);

  var store = finalCreateStore(rootReducer, initialState);

  return store;
}
