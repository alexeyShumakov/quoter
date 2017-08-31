import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../components/sidebar';

function setup() {
  const props = {
    setModal: jest.fn(),
    setCategory: jest.fn(),
    fetchQuotes: jest.fn(),
    categories: [{Id: 1, Title: 'c1'}, {Id: 2, Title: 'c2'}],
  };

  const wrapper = shallow(<Comp {...props}/>);
  return {wrapper, props};
}

describe('components', () => {
  describe('sidebar', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('menu')).toBeTruthy();
      expect(wrapper.find('li').length).toBe(2);
      expect(wrapper.find('li').at(0).text()).toBe('c1');
    });

    it('open modal', () => {
      const { wrapper, props } = setup();
      wrapper.find('button').simulate('click');
      expect(props.setModal).toBeCalledWith(true);
    });

    it('set category and fetch quotes', () => {
      const { wrapper, props } = setup();
      wrapper.find('li').at(1).simulate('click');
      expect(props.setCategory).toBeCalledWith(2);
      expect(props.fetchQuotes).toBeCalled();
    })
  });
});
