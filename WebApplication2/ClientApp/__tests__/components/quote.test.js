import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../components/quote';
import QEdit from '../../components/quoteEdit';
import QRead from '../../components/quoteRead';

function setup() {
  const props = {
    fetchQuotes: jest.fn(),
    deleteQuote: jest.fn(),
    updateQuote: jest.fn(),
    categories: [{Id: 1, Title: 'category 1' }, {Id: 2, Title: 'category 2'}],
    quote: {
      id: 1,
      categoryId: 1,
      body: 'foo bar body',
      author: 'John Doe',
      createdAt: '2017-01-01T12:10:10.10'
    }
  };

  const wrapper = shallow(<Comp {...props}/>);
  return {wrapper, props};
}

describe('components', () => {
  describe('quote', () => {
    it('render read component', () => {
      const { wrapper } = setup();
      expect(wrapper.find(QRead).exists()).toBeTruthy();
      expect(wrapper.find(QEdit).exists()).toBeFalsy();
    });
    it('render read component', () => {
      const { wrapper } = setup();
      wrapper.setState({isEdit: true});
      expect(wrapper.find(QRead).exists()).toBeFalsy();
      expect(wrapper.find(QEdit).exists()).toBeTruthy();
    });
  });
});
