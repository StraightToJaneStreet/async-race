import { createReducer } from '@reduxjs/toolkit';
import { createActionCreatorFactory } from '../../utils';

export type OrderingField = 'time' | 'wins';
export type OrderingType = 'ASC' | 'DESC';

const actionFactory = createActionCreatorFactory('winnersTableParams');

export interface WinnersTableParamsState {
  page: number;
  orderingField: OrderingField;
  orderingType: OrderingType;
}

export const actionIncrementPage = actionFactory<void, 'incrementPage'>('incrementPage');
export const actionDecrementPage = actionFactory<void, 'decrementPage'>('decrementPage');
export const actionSetOrderingType = actionFactory<OrderingType, 'setOrderingType'>('setOrderingType');
export const actionSetOrderingField = actionFactory<OrderingField, 'setOrderingField'>('setOrderingField');

const initialState: WinnersTableParamsState = {
  page: 1,
  orderingField: 'wins',
  orderingType: 'ASC'
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionIncrementPage, (state) => {
      state.page += 1;
    })
    .addCase(actionDecrementPage, (state) => {
      if (state.page === 1) {
        return;
      }

      state.page -= 1;
    })
    .addCase(actionSetOrderingField, (state, { payload }) => {
      state.orderingField = payload;
    })
    .addCase(actionSetOrderingType, (state, { payload }) => {
      state.orderingType = payload;
    })
});

export default reducer;
