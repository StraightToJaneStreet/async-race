import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../../../core/Car";

export type GarageState = EntityState<Car>;

const carAdapter = createEntityAdapter<Car>({
  selectId: (car) => car.id,

})
const initialState = carAdapter.getInitialState();

const slice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    actionAddCar(state, { payload }: PayloadAction<Car>) {
      carAdapter.addOne(state, payload);
    },

    actionAddCars(state, { payload }: PayloadAction<Car[]>) {
      carAdapter.addMany(state, payload);
    },

    actionDeleteCar(state, { payload }: PayloadAction<number>) {
      carAdapter.removeOne(state, payload);
    }
  }
});
export const selectCars = (state: GarageState): Car[] => carAdapter.getSelectors().selectAll(state);
export const {
  actionAddCar,
  actionAddCars,
  actionDeleteCar,
} = slice.actions;
export default slice.reducer;
