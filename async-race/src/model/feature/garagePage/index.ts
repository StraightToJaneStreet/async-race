import { 
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface GaragePageState {
  currentPage: number;
  carForUpdate: number | null;
}

const initialState: GaragePageState = {
  currentPage: 1,
  carForUpdate: null,
}

const slice = createSlice({
  name: 'garagePage',
  initialState: initialState,
  reducers: {
    incrementPage(state) {
      state.currentPage += 1;
    },

    decrementPage(state) {
      if (state.currentPage === 1) {
        return;
      }

      state.currentPage -= 1;
    },

    setCarForUpdate(state, { payload: carId }: PayloadAction<number>) {
      state.carForUpdate = carId;
    },

    removeCarForUpdate(state) {
      state.carForUpdate = null;
    }
  }
});

export const {
  incrementPage,
  decrementPage,
  setCarForUpdate,
  removeCarForUpdate
} = slice.actions;

export default slice;

