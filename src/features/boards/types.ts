export interface TaskCard {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string | null;
  position: number;
  listId: string;
}
export interface BoardList {
  id: string;
  title: string;
  position: number;
  cards: TaskCard[];
}
export interface Board {
  id: string;
  title: string;
  description: string;
  lists: BoardList[];
}
