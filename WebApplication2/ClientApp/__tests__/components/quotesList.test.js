import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../components/quotesList';
import  Quote from '../../components/quote';

const quote = {
  id: 1,
  categoryId: 1,
  body: 'foo bar body',
  author: 'John Doe',
  createdAt: '2017-01-01T12:10:10.10'
};
function setup() {
  const props = {
    fetchQuotes: jest.fn(),
    deleteQuote: jest.fn(),
    updateQuote: jest.fn(),
    categories: [],
    quotes: [quote, quote]
  };

  const wrapper = shallow(<Comp {...props}/>);
  return {wrapper, props};
}

describe('components', () => {
  describe('quotesList', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.find(Quote).length).toBe(2);
    });

    it('fetch quotes on mount', () => {
      const { props } = setup();
      expect(props.fetchQuotes).toBeCalled();
    });
  });
});
