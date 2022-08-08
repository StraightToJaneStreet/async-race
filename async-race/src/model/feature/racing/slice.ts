import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import RacingParams from "../../../core/RacingParams";

type RacingState = EntityState<RacingParams>;

const racingAdapter = createEntityAdapter<RacingParams>({
  selectId: (params) => params.carId
});

const slice = createSlice({
  name: 'racing',
  initialState: racingAdapter.getInitialState(),
  reducers: {
    addRacingParams(state, { payload }: PayloadAction<RacingParams>) {
      racingAdapter.addOne(state, payload);
    }
  }
});



export default slice.reducer;