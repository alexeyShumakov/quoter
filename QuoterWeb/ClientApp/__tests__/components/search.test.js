import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../components/search';

function setup() {
  const props = {
    fetchQuotes: jest.fn(),
    setAuthorName: jest.fn(),
    authorName: 'John'
  };

  const wrapper = shallow(<Comp {...props}/>);
  return {wrapper, props};
}

describe('components', () => {
  describe('search', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('field')).toBeTruthy();
      expect(wrapper.find('input').props().value).toBe('John');
    });

    it('setAuthorName then fetchQuotes', () => {
      jest.useFakeTimers();
      const { wrapper, props } = setup();
      wrapper.find('input').simulate('change', { target: { value: 'jo' } });
      expect(setTimeout.mock.calls.length).toBe(1);
      expect(setTimeout.mock.calls[0][1]).toBe(200);
      jest.runAllTimers();
      expect(props.setAuthorName).toBeCalledWith('jo');
      expect(props.fetchQuotes).toBeCalled();
    });
  });
});
