import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Winner {
  name: String;
  time: Number;
}

type WinnerMessageState = {
  winner: Winner | null
}

const initialState: WinnerMessageState = {
  winner: null
}

const slice = createSlice({
  name: 'winnerMessage',
  initialState,
  reducers: {
    setWinner(state, { payload }: PayloadAction<Winner>) {
      state.winner = payload;
    },

    resetWinner(state) {
      state.winner = null;
    }
  }
});
export const {
  setWinner,
  resetWinner
} = slice.actions;

export default slice;
