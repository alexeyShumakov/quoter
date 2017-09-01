import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../components/quoteEdit';

function setup() {
  const props = {
    toggleEdit: jest.fn(),
    fetchQuotes: jest.fn(),
    updateQuote: jest.fn(() => Promise.resolve()),
    categories: [{Id: 1, Title: 'category 1' }, {Id: 2, Title: 'category 2'}],
    quote: {
      id: 1,
      categoryId: 1,
      body: 'foo bar body',
      author: 'John Doe'
    }
  };

  const wrapper = shallow(<Comp {...props}/>);
  return {wrapper, props};
}

describe('components', () => {
  describe('quoteEdit', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('box')).toBeTruthy();
    });

    it('render and update author input', () => {
      const { wrapper } = setup();
      const input = wrapper.find('input');
      expect(input.props().value).toBe('John Doe');
      input.simulate('change', { target: { value: 'new author'}});
      expect(wrapper.state('quote').author).toBe('new author');
    });

    it('render and update body textarea', () => {
      const { wrapper } = setup();
      const input = wrapper.find('textarea');
      expect(input.props().value).toBe('foo bar body');
      input.simulate('change', { target: { value: 'new body'}});
      expect(wrapper.state('quote').body).toBe('new body');
    });

    it('render and update category select', () => {
      const { wrapper } = setup();
      const select = wrapper.find('select');
      expect(select.props().value).toBe(1);
      select.simulate('change', { target: { value: 2}});
      expect(wrapper.state('quote').categoryId).toBe(2);
    });

    it('toggle editState', () => {
      const { wrapper, props } = setup();
      wrapper.find("a.button").at(1).simulate('click');
      expect(props.toggleEdit).toBeCalled();
    });

    it('update quote then toggle editState', (done) => {
      const { wrapper, props } = setup();
      wrapper.find("a.button").at(0).simulate('click');
      setTimeout(() => {
        try {
          expect(props.updateQuote).toBeCalled();
          expect(props.fetchQuotes).toBeCalled();
          expect(props.toggleEdit).toBeCalled();
          done();
        } catch(error) {
          done.fail(error);
        }
      });
    });
  });
});
