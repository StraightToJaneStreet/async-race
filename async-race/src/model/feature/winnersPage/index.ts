import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderingField = 'time' | 'wins';

export enum OrderingType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export interface WinnersPageState {
  currentPage: number;
  orderingField: OrderingField;
  orderingType: OrderingType;
}

const initialState: WinnersPageState = {
  currentPage: 1,
  orderingField: 'wins',
  orderingType: OrderingType.Asc,
};

const slice = createSlice({
  name: 'winnersPage',
  initialState,
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

    setOrderingType(state, { payload }: PayloadAction<OrderingType>) {
      state.orderingType = payload;
    },

    setOrderingField(state, { payload }: PayloadAction<OrderingField>) {
      state.orderingField = payload;
    },
  },
});

export default slice;
