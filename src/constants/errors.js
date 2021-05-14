export const USER_ERRORS = {
  HTTP_500: 'Error while creating new user',
  HTTP_404: id => `User not found with id ${id}`,
};

export const BOARD_ERRORS = {
  HTTP_500: 'Error while creating new board',
  HTTP_404: id => `Board not found with id ${id}`,
};
