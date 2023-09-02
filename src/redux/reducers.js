// reducers.js
const initialState = {
  searchQuery: "",
  // Add more initial state properties as needed.
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    // Add more cases for other actions and reducers.
    default:
      return state;
  }
};

// You can define more reducers for other parts of your application.
