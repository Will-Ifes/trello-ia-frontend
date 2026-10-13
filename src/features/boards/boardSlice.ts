import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoardState {
  boards: string[];
}

const initialState: BoardState = {
  boards: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<string>) => {
      state.boards.push(action.payload);
    },
    removeBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board !== action.payload);
    },
  },
});

export const { addBoard, removeBoard } = boardSlice.actions;
export default boardSlice.reducer;
