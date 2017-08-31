import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../components/quoteRead';

function setup() {
  const props = {
    toggleEdit: jest.fn(),
    deleteQuote: jest.fn(),
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
  describe('quoteRead', () => {
    it('render correctly', () => {
      const { wrapper, props } = setup();
      expect(wrapper.hasClass('media')).toBeTruthy();
      expect(wrapper.find('strong').text()).toBe(props.quote.author);
      expect(wrapper.find('small').text()).toBe(" Sunday, January 1st 2017");
      expect(wrapper.find('.quote-body').text()).toBe("foo bar body");
    });

    it('toggle edit state', () => {
      const { wrapper, props } = setup();
      wrapper.find('.icon.is-small').at(0).simulate('click');
      expect(props.toggleEdit).toBeCalled();
    });

    it('delete edit state', () => {
      const { wrapper, props } = setup();
      wrapper.find('.icon.is-small').at(1).simulate('click');
      expect(props.deleteQuote).toBeCalled();
    });
  });
});
