import reducer from '../../reducers';
import initialState from "../../store/initialState";

describe('reducers', () => {
  it('return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('set author name', () => {
    expect(reducer({authorName: ''}, {
      type: 'SET_AUTHOR_NAME',
      name: 'john'
    }))
      .toEqual({authorName: 'john'});
  });

  it('set modal', () => {
    expect(reducer({isOpenModal: true}, {
      type: 'SET_MODAL',
      isOpenModal: true
    }))
      .toEqual({isOpenModal: true});
  });

  it('set quotes', () => {
    expect(reducer({quotes: []}, {
      type: 'SET_QUOTES',
      quotes: [1, 2]
    }))
      .toEqual({quotes: [1, 2]});
  });

  it('set quote', () => {
    expect(reducer({quote: {}}, {
      type: 'SET_QUOTE',
      quote: {author: 'john'}
    }))
      .toEqual({quote: {author: 'john'}});
  });

  it('set quote errors', () => {
    expect(reducer({quoteErrors: []}, {
      type: 'SET_QUOTE_ERRORS',
      quoteErrors: ['err']
    }))
      .toEqual({quoteErrors: ['err']});
  });

  it('set category', () => {
    expect(reducer({categoryId: 1}, {
      type: 'SET_CATEGORY',
      categoryId: 2
    }))
      .toEqual({categoryId: 2});
  });
});