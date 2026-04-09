export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export const todos: Todo[] = [
  {
    id: "1",
    text: "우유 사기",
    completed: false,
    createdAt: "2026-04-09T00:00:00.000Z",
  },
  {
    id: "2",
    text: "Next.js 공부하기",
    completed: true,
    createdAt: "2026-04-09T00:01:00.000Z",
  },
];
