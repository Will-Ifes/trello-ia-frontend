import boardReducer, { addBoard, removeBoard } from '../boardSlice';

describe('boardSlice', () => {
  it('adiciona uma board ao estado', () => {
    const initialState = { boards: [] };
    const action = addBoard('Minha Board');
    const nextState = boardReducer(initialState, action);
    expect(nextState.boards).toEqual(['Minha Board']);
  });

  it('remove uma board do estado', () => {
    const initialState = { boards: ['Minha Board'] };
    const action = removeBoard('Minha Board');
    const nextState = boardReducer(initialState, action);
    expect(nextState.boards).toEqual([]);
  });
});
