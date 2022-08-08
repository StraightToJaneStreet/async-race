import { combineReducers, configureStore } from '@reduxjs/toolkit';

import pageReducer from './feature/pages/slice';
import garageReducer from './feature/garage/slice';
import createCarRedcuer from './feature/createCar';
import updateCarReducer from './feature/updateCar';
import garagePageReducer from './feature/garagePages';

const store = configureStore({
  reducer: combineReducers({
    pages: pageReducer,
    garage: garageReducer,
    createCar: createCarRedcuer,
    updateCar: updateCarReducer,
    garagePage: garagePageReducer,
  })
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
