import { combineReducers, configureStore } from '@reduxjs/toolkit';
import pageReducer from './feature/pages/slice';

const store = configureStore({
  reducer: combineReducers({
    pages: pageReducer
  })
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
