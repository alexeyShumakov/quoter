import axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as appActions from '../../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('setQuote', () => {
    const quote = {body: 'body'};
    const action = {type: 'SET_QUOTE', quote};
    expect(appActions.setQuote(quote)).toEqual(action);
  });

  it('setModal', () => {
    const action = {type: 'SET_MODAL', isOpenModal: true};
    expect(appActions.setModal(true)).toEqual(action);
  });

  it('setAuthorName',() => {
    const action = {type: 'SET_AUTHOR_NAME', name: 'foo'};
    expect(appActions.setAuthorName('foo')).toEqual(action);
  });

  it('setQuotes',() => {
    const action = {type: 'SET_QUOTES', quotes: []};
    expect(appActions.setQuotes([])).toEqual(action);
  });

  it('setQuoteErrors',() => {
    const action = {type: 'SET_QUOTE_ERRORS', quoteErrors: []};
    expect(appActions.setQuoteErrors([])).toEqual(action);
  });

  it('setCategory',() => {
    const action = {type: 'SET_CATEGORY', categoryId: 1};
    expect(appActions.setCategory(1)).toEqual(action);
  });

  it('setLoading', () => {
    const action = {type: 'SET_IS_LOADING', isLoading: false};
    expect(appActions.setLoading(false)).toEqual(action);
  });

  it('deleteQuote', (done) => {
    const store = mockStore({authorName: 'name', categoryId: 1});

    axios.delete = jest.fn(() => Promise.resolve());
    axios.get = jest.fn(() => Promise.resolve({data: []}));

    store.dispatch(appActions.deleteQuote(1));
    setTimeout(() => {
      try {
        expect(axios.delete)
          .toBeCalledWith("/api/quotes/1/delete");
        expect(axios.get)
          .toBeCalledWith("/api/quotes", {"params": {"author": "name", "categoryId": 1}});
        done();
      } catch(error) {
        done.fail(error);
      }
    });
  });

  it('fetchQuotes', (done) => {
    const store = mockStore({authorName: 'name', categoryId: 1});

    axios.get = jest.fn(() => Promise.resolve({data: []}));
    store.dispatch(appActions.fetchQuotes());
    setTimeout(() => {
      try {
        expect(axios.get)
          .toBeCalledWith("/api/quotes", {"params": {"author": "name", "categoryId": 1}});
        done();
      } catch(error) {
        done.fail(error);
      }
    });
  });

  it('updateQuote', done => {
    const store = mockStore({authorName: 'name', categoryId: 1});
    const quote = {author: 'author', id: 1};
    axios.patch = jest.fn(() => Promise.resolve());
    store.dispatch(appActions.updateQuote(quote));
    setTimeout(() => {
      try {
        expect(axios.patch)
          .toBeCalledWith("/api/quotes/1", {"author": "author", "id": 1});
        done();
      } catch(error) {
        done.fail(error);
      }
    });
  });

  it('createQuote', done => {
    const store = mockStore({authorName: 'name', categoryId: 1, quote: {author: 'author', id: 1}});
    const quote = {author: 'author', id: 1};
    axios.post = jest.fn(() => Promise.resolve());
    axios.get = jest.fn(() => Promise.resolve({data: []}));
    store.dispatch(appActions.createQuote(quote));
    setTimeout(() => {
      try {
        expect(axios.post)
          .toBeCalledWith("/api/quotes", {"author": "author", "id": 1});
        expect(axios.get)
          .toBeCalledWith("/api/quotes", {"params": {"author": "name", "categoryId": 1}});
        expect(store.getActions().length).toEqual(6);
        done();
      } catch(error) {
        done.fail(error);
      }
    });
  });
});
