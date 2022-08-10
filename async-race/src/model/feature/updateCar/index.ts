import { createReducer } from "@reduxjs/toolkit";
import { MAXIMAL_CAR_NAME_LENGTH } from "../../../core/Contants";
import { createActionCreatorFactory } from "../../utils";

const PREFIX = 'updateCar';
type TPrefix = `${typeof PREFIX}`;

const actionFactory = createActionCreatorFactory<TPrefix>(PREFIX);

export interface CreateCarState {
  name: string;
  color: string;
}

const INITIAL_COLOR = '#000000';

const initialState = {
  name: '',
  color: INITIAL_COLOR
}

export const actionSetName = actionFactory<string, 'setColor'>('setColor');
export const actionSetColor = actionFactory<string, 'setName'>('setName');
export const actionSetParams = actionFactory<CreateCarState, 'setParams'>('setParams');

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionSetParams, (_state, { payload }) => {
      return { ...payload };
    })
    .addCase(actionSetName, (state, { payload }) => {
      if (payload.length > MAXIMAL_CAR_NAME_LENGTH) {
        return;
      }
      state.name = payload;
    })
    .addCase(actionSetColor, (state, { payload }) => {
      state.color = payload;
    })
});

export default reducer;
