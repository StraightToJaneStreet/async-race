import { combineReducers, configureStore } from '@reduxjs/toolkit';

import pageReducer from './feature/pages/slice';
import createCarRedcuer from './feature/createCar';
import updateCarReducer from './feature/updateCar';
import garagePageReducer from './feature/garagePages';
import tracksReducer from './feature/tracks';
import winnersTableParamsReducer from './feature/winnersTableParams';

import serviceAPI from './service/serviceAPI';

const store = configureStore({
  reducer: combineReducers({
    pages: pageReducer,
    createCar: createCarRedcuer,
    updateCar: updateCarReducer,
    garagePage: garagePageReducer,
    tracks: tracksReducer,
    winnersPageParams: winnersTableParamsReducer,
    [serviceAPI.reducerPath]: serviceAPI.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serviceAPI.middleware)

});

export type RootState = ReturnType<typeof store.getState>;

export const storeSelectPages = (state: RootState): ReturnType<typeof pageReducer> =>
  state.pages;

export const storeSelectCreateCar = (state: RootState): ReturnType<typeof createCarRedcuer> =>
  state.createCar;

export const storeSelectUpdateCar = (state: RootState): ReturnType<typeof updateCarReducer> =>
  state.updateCar;

export const storeSelectGaragePage = (state: RootState): ReturnType<typeof garagePageReducer> =>
  state.garagePage;

export const storeSelectTracks = (state: RootState): ReturnType<typeof tracksReducer> =>
  state.tracks;

export const storeSelectWinnersPageParams = (state: RootState)
: ReturnType<typeof winnersTableParamsReducer> =>
  state.winnersPageParams;

export default store;
