import * as actionTypes from "./actionTypes";

const initial_state = {
  searchLoading: false,
  searchResult: [],
  currentPage: 1,
  isFetch: false,
  totalPost: 0
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_POST:
      return {
        ...state,
        searchResult: action.posts,
        isFetch: true,
        currentPage: action.currentPage,
        totalPost: action.totalPost
      };

    default:
      return state;
  }
};

export default reducer;
