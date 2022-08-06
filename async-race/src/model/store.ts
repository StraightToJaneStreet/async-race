import { combineReducers, configureStore } from '@reduxjs/toolkit';

import pageReducer from './feature/pages/slice';
import garageReducer from './feature/garage/slice';

const store = configureStore({
  reducer: combineReducers({
    pages: pageReducer,
    garage: garageReducer
  })
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
