import initialState from "../store/initialState";

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTHOR_NAME":
      return Object.assign({}, state, {authorName: action.name});
    case "SET_MODAL":
      return Object.assign({}, state, {isOpenModal: action.isOpenModal});
    case "SET_QUOTES":
      return Object.assign({}, state, {quotes: action.quotes});
    case "SET_QUOTE":
      return Object.assign({}, state, {quote: action.quote});
    case "SET_QUOTE_ERRORS":
      return Object.assign({}, state, {quoteErrors: action.quoteErrors});
    case "SET_CATEGORY":
      return Object.assign({}, state, {categoryId: action.categoryId});
    default:
      return state;
  }
};
