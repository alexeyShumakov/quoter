import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../components/header';


describe('components', () => {
  describe('header', () => {
    it('render correctly', () => {
      const wrapper = shallow(<Comp/>);
      expect(wrapper.hasClass('navbar has-shadow')).toBeTruthy();
    });
  });
});
