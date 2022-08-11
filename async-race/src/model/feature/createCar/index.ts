import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_COLOR = '#000000';

export interface CreateCarConfigurationState {
  name: string;
  color: string;
}

const initialState = {
  name: '',
  color: INITIAL_COLOR,
};

const slice = createSlice({
  name: 'createCarConfiguration',
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
