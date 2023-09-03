// reducers.js
const initialState = {
  books: [],
  loading: false,
  error: null,
  searchQuery: "",
  comments: [],
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_BOOKS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// reducers.js

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.payload,
        error: null,
      };
    case 'FETCH_COMMENTS_FAILURE':
      return {
        ...state,
        comments: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// You can define more reducers for other parts of your application.
