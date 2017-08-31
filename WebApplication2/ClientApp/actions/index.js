import axios from 'axios';

export function setQuote(quote) {
  return {type: 'SET_QUOTE', quote}
}

export function setModal(isOpenModal) {
  return { type: 'SET_MODAL', isOpenModal }
}
export function setAuthorName(name) {
  return { type: 'SET_AUTHOR_NAME', name }
}

export function setQuotes(quotes) {
  return { type: 'SET_QUOTES', quotes }
}

export function setQuoteErrors(quoteErrors) {
  return { type: 'SET_QUOTE_ERRORS', quoteErrors}
}

export function setCategory(categoryId) {
  return { type: 'SET_CATEGORY', categoryId }
}

export function deleteQuote(id) {
  return(dispatch) => {
    return axios.delete(`/api/quotes/${id}/delete`).then(() => {
      return dispatch(fetchQuotes());
    });
  }
}

export  function fetchQuotes() {
  return(dispatch, getState) => {
    const categoryId = getState().categoryId;
    const author = getState().authorName;
    return axios.get('/api/quotes',{params: {author, categoryId}}).then((response) => {
      return dispatch(setQuotes(response.data));
    });
  }
}

export function updateQuote(quote) {
  return () => {
    return axios.patch(`/api/quotes/${quote.id}`, quote);
  }
}

export function createQuote() {
  return(dispatch, getState) => {
    const { quote } = getState();
    return axios.post('/api/quotes', quote).then(() => {
      dispatch(setModal(false));
      dispatch(setQuoteErrors([]));
      dispatch(setQuote(Object.assign({}, quote, {body: '', author: ''})));
      return dispatch(fetchQuotes());
    },(error) => {
      dispatch(setQuoteErrors(error.response.data));
    });
  }

}