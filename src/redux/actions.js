export const setSearchQuery = (query) => ({
  type: "SET_SEARCH_QUERY",
  payload: query,
});

export const fetchBooks = () => async (dispatch) => {
  try {
    const response = await fetch('https://data.aykhan.net/data/general/books.json');
    const data = await response.json();

    // Dispatch an action to store the fetched data in Redux
    dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: data });
  } catch (error) {
    // Handle any errors, e.g., dispatch an error action
    dispatch({ type: 'FETCH_BOOKS_ERROR', payload: error.message });
  }
};

export const fetchComments = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://data.aykhan.net/data/general/book-comments.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.status} ${response.statusText}`);
      }
      const comments = await response.json();
      dispatch({
        type: 'FETCH_COMMENTS_SUCCESS',
        payload: comments,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_COMMENTS_FAILURE',
        payload: error.message,
      });
    }
  };
};
