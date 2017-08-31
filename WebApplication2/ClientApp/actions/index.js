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

export function setLoading(isLoading) {
  return { type: 'SET_IS_LOADING', isLoading}
}

export function deleteQuote(id) {
  return(dispatch) => {
    dispatch(setLoading(true));
    return axios.delete(`/api/quotes/${id}/delete`).then(() => {
      return dispatch(fetchQuotes());
    });
  }
}

export  function fetchQuotes() {
  return(dispatch, getState) => {
    const categoryId = getState().categoryId;
    const author = getState().authorName;
    dispatch(setLoading(true));
    return axios.get('/api/quotes',{params: {author, categoryId}}).then((response) => {
      dispatch(setQuotes(response.data));
      return dispatch(setLoading(false));
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