import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../components/modal';

function setup() {
  const props = {
    setModal: jest.fn(),
    setQuote: jest.fn(),
    createQuote: jest.fn(),
    quoteErrors: ['foo bar error'],
    categories: [{Id: 1, Title: 'category 1' }, {Id: 2, Title: 'category 2'}],
    quote: {
      id: 1,
      categoryId: 1,
      body: 'foo bar body',
      author: 'John Doe',
    }
  };

  const wrapper = shallow(<Comp {...props}/>);
  return {wrapper, props};
}
describe('components', () => {
  describe('modal', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('modal')).toBeTruthy();
    });

    it('render errors', () => {
      const { wrapper } = setup();
      expect(wrapper.find('.message.is-danger').exists()).toBeTruthy();
      expect(wrapper.find('.message.is-danger li').text()).toBe('foo bar error');
    });

    it('render and update author input', () => {
      const { wrapper, props } = setup();
      const input = wrapper.find('input');
      expect(input.props().value).toBe('John Doe');
      input.simulate('change', { target: { value: 'new author'}});
      const newQuote = Object.assign({}, props.quote, {author: 'new author'});
      expect(props.setQuote).toBeCalledWith(newQuote);
    });

    it('render and update body textarea', () => {
      const { wrapper, props } = setup();
      const textarea = wrapper.find('textarea');
      expect(textarea.props().value).toBe('foo bar body');
      textarea.simulate('change', { target: { value: 'new body'}});
      const newQuote = Object.assign({}, props.quote, {body: 'new body'});
      expect(props.setQuote).toBeCalledWith(newQuote);
    });

    it('render and update category select', () => {
      const { wrapper, props } = setup();
      const select = wrapper.find('select');
      expect(select.props().value).toBe(1);
      select.simulate('change', { target: { value: 2}});
      const newQuote = Object.assign({}, props.quote, {categoryId: 2});
      expect(props.setQuote).toBeCalledWith(newQuote);
    });

    it('create quote', () => {
      const { wrapper, props } = setup();
      const button = wrapper.find('footer > button');
      button.simulate('click');
      expect(props.createQuote).toBeCalled();
    });

    it('close modal', () => {
      const { wrapper, props } = setup();
      wrapper.find('.modal-background').simulate('click');
      wrapper.find('.delete').simulate('click');
      expect(props.setModal.mock.calls.length).toBe(2);
    });

  });
});