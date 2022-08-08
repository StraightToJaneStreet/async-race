import { createReducer } from "@reduxjs/toolkit";
import { createActionCreatorFactory } from "../../utils";

const PREFIX = 'garagePages';
const actionFactory = createActionCreatorFactory<typeof PREFIX>(PREFIX);

interface GaragePagesState {
  currentPage: number;
}

const initialState: GaragePagesState = {
  currentPage: 0
}

export const actionIncrementPage = actionFactory<void, 'incrementPage'>('incrementPage');
export const actionDecrementPage = actionFactory<void, 'decrementPage'>('decrementPage');

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionIncrementPage, (state, _action) => {
      state.currentPage += 1;
    })
    .addCase(actionDecrementPage, (state, _action) => {
      if (state.currentPage > 0) {
        state.currentPage -= 1;
      }
    })
});

export default reducer;

