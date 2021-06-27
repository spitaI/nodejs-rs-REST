export const COMMON_ERRORS = {
  HTTP_500: 'Internal server error',
};

export const USER_ERRORS = {
  HTTP_500: 'Error while creating new user',
  HTTP_404: (id: string): string => `User not found with id ${id}`,
  HTTP_400: (username: string): string =>
    `Username ${username} is already taken`,
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

export const AUTH_ERRORS = {
  HTTP_400: 'No login or password provided',
  HTTP_401: 'Invalid access token',
  HTTP_403: 'Invalid login or password',
};
