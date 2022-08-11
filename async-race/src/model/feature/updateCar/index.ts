import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_COLOR = '#000000';

export interface UpdateCarConfigurationState {
  name: string;
  color: string;
}

const initialState = {
  name: '',
  color: INITIAL_COLOR,
};

const slice = createSlice({
  name: 'updateCarConfiguration',
  initialState,
  reducers: {
    setName(state, { payload }: PayloadAction<string>) {
      state.name = payload;
    },

    setColor(state, { payload }: PayloadAction<string>) {
      state.color = payload;
    },
  },
});

export default slice;
