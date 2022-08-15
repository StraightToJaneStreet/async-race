import { configureStore } from '@reduxjs/toolkit';

import tracksSlice from './feature/tracks';

import createCarSlice from './feature/createCar';
import updateCarSlice from './feature/updateCar';

import garagePageSlice from './feature/garagePage';
import winnersPageSlice from './feature/winnersPage';

import winnerMessage from './feature/winnerMessage';

import serviceAPI from './service/serviceAPI';

const store = configureStore({
  reducer: {
    [createCarSlice.name]: createCarSlice.reducer,
    [updateCarSlice.name]: updateCarSlice.reducer,
    [garagePageSlice.name]: garagePageSlice.reducer,
    [tracksSlice.name]: tracksSlice.reducer,
    [winnersPageSlice.name]: winnersPageSlice.reducer,
    [winnerMessage.name]: winnerMessage.reducer,
    [serviceAPI.reducerPath]: serviceAPI.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(serviceAPI.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const storeSelectCreateCarConfigurationState = (state: RootState): ReturnType<typeof createCarSlice.reducer> =>
  state[createCarSlice.name];

export const storeSelectUpdateCarConfigurationState = (state: RootState): ReturnType<typeof updateCarSlice.reducer> =>
  state[updateCarSlice.name];

export const storeSelectGaragePage = (state: RootState): ReturnType<typeof garagePageSlice.reducer> =>
  state[garagePageSlice.name];

export const storeSelectTracks = (state: RootState): ReturnType<typeof tracksSlice.reducer> => state[tracksSlice.name];

export const storeSelectWinnersPageParams = (state: RootState): ReturnType<typeof winnersPageSlice.reducer> =>
  state[winnersPageSlice.name];

export const storeSelectWinnerMessage = (state: RootState): ReturnType<typeof winnerMessage.reducer> =>
  state[winnerMessage.name];

export default store;
