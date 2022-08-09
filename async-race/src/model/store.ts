import { combineReducers, configureStore, createSelector } from '@reduxjs/toolkit';

import pageReducer from './feature/pages/slice';
import garageReducer from './feature/garage/slice';
import createCarRedcuer from './feature/createCar';
import updateCarReducer from './feature/updateCar';
import garagePageReducer from './feature/garagePages';
import tracksReducer from './feature/tracks';

const store = configureStore({
  reducer: combineReducers({
    pages: pageReducer,
    garage: garageReducer,
    createCar: createCarRedcuer,
    updateCar: updateCarReducer,
    garagePage: garagePageReducer,
    tracks: tracksReducer,
  })
});

export type RootState = ReturnType<typeof store.getState>;

export const storeSelectPages = (state: RootState): ReturnType<typeof pageReducer> =>
  state.pages;

export const storeSelectGarage = (state: RootState): ReturnType<typeof garageReducer> =>
  state.garage;

export const storeSelectCreateCar = (state: RootState): ReturnType<typeof createCarRedcuer> =>
  state.createCar;

export const storeSelectUpdateCar = (state: RootState): ReturnType<typeof updateCarReducer> =>
  state.updateCar;

export const storeSelectGaragePage = (state: RootState): ReturnType<typeof garagePageReducer> =>
  state.garagePage;

export const storeSelectTracks = (state: RootState): ReturnType<typeof tracksReducer> =>
  state.tracks;
  
export default store;
