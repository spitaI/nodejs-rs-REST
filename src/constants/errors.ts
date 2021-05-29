export const COMMON_ERRORS = {
  HTTP_500: 'Internal server error',
};

export const USER_ERRORS = {
  HTTP_500: 'Error while creating new user',
  HTTP_404: (id: string): string => `User not found with id ${id}`,
};

export const BOARD_ERRORS = {
  HTTP_500: 'Error while creating new board',
  HTTP_404: (id: string): string => `Board not found with id ${id}`,
};

export const TASK_ERRORS = {
  HTTP_500: 'Error while creating new task',
  HTTP_404: (boardId: string, taskId: string): string =>
    `Task not found with id ${taskId} within board ${boardId}`,
};