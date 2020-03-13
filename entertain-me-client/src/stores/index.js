import { createStore, combineReducers } from 'redux';

import { moviesReducer, tvSeriesReducer } from '../reducers';

const reducers = combineReducers({
  moviesReducer,
  tvSeriesReducer
});

const store = createStore(reducers);

export default store;
