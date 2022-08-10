import { createReducer } from "@reduxjs/toolkit";
import { createActionCreatorFactory } from "../../utils";

const PREFIX = 'garagePages';
const actionFactory = createActionCreatorFactory<typeof PREFIX>(PREFIX);

interface GaragePagesState {
  carIdForUpdate: number | null;
  currentPage: number;
}

const initialState: GaragePagesState = {
  carIdForUpdate: null,
  currentPage: 1,
}

export const actionIncrementPage = actionFactory<void, 'incrementPage'>('incrementPage');
export const actionDecrementPage = actionFactory<void, 'decrementPage'>('decrementPage');
export const actionSetCarForUpdate = actionFactory<number, 'setCarForUpdate'>('setCarForUpdate');
export const actionRemoveCarForUpdate = actionFactory<void, 'removeCarForUpdate'>('removeCarForUpdate');

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionIncrementPage, (state, _action) => {
      state.currentPage += 1;
    })
    .addCase(actionDecrementPage, (state, _action) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    })
    .addCase(actionSetCarForUpdate, (state, { payload }) => {
      state.carIdForUpdate = payload;
    })
    .addCase(actionRemoveCarForUpdate, (state) => {
      state.carIdForUpdate = null;
    })
});

export default reducer;

