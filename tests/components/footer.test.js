import React from 'react';
import { shallow } from 'enzyme';

import { Footer } from '../../src/components/footer/footer.component';

let wrapper, startRemoveCompleted;

beforeEach(() => {
  startRemoveCompleted = jest.fn();
  wrapper = shallow(<Footer startRemoveCompleted={startRemoveCompleted} />);
});

test('should render Footer component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should remove all completed items on button press', () => {
  wrapper.find('Button').prop('onPress')();
  expect(startRemoveCompleted).toHaveBeenCalled();
});
