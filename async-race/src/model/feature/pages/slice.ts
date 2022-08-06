import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Page from '../../../core/Page';

export type CurrentPageState = {
  value: Page
};

const initialState: CurrentPageState = {
  value: Page.Garage
};

const slice = createSlice({
  name: 'pages',
  initialState: initialState,
  reducers: {
    setPage(state, { payload }: PayloadAction<Page>) {
      state.value = payload;
    }
  }
});

export const { setPage } = slice.actions;
export default slice.reducer;
