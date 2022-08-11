import { configureStore } from '@reduxjs/toolkit';

import pageReducer from './feature/pages/slice';
import createCarRedcuer from './feature/createCar';
import updateCarReducer from './feature/updateCar';
import garagePageParamsReducer from './feature/garagePageProperties';
import tracksReducer from './feature/tracks';
import winnersTableParamsReducer from './feature/winnersTableParams';

import serviceAPI from './service/serviceAPI';

const store = configureStore({
  reducer: {
    pages: pageReducer,
    createCar: createCarRedcuer,
    updateCar: updateCarReducer,
    garagePageParams: garagePageParamsReducer,
    tracks: tracksReducer,
    winnersPageParams: winnersTableParamsReducer,
    [serviceAPI.reducerPath]: serviceAPI.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(serviceAPI.middleware)
  }
});

export type RootState = ReturnType<typeof store.getState>;

export const storeSelectPages = (state: RootState): ReturnType<typeof pageReducer> =>
  state.pages;

export const storeSelectCreateCar = (state: RootState): ReturnType<typeof createCarRedcuer> =>
  state.createCar;

export const storeSelectUpdateCar = (state: RootState): ReturnType<typeof updateCarReducer> =>
  state.updateCar;

export const storeSelectGaragePage = (state: RootState): ReturnType<typeof garagePageParamsReducer> =>
  state.garagePageParams;

export const storeSelectTracks = (state: RootState): ReturnType<typeof tracksReducer> =>
  state.tracks;

export const storeSelectWinnersPageParams = (state: RootState)
: ReturnType<typeof winnersTableParamsReducer> =>
  state.winnersPageParams;

export default store;
