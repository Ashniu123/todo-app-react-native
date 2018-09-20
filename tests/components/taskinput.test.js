import React from 'react';
import { shallow } from 'enzyme';

import { Taskinput } from '../../src/components/taskinput/taskinput.component';
import startAddItemMock from '../__mocks__/startAddItem.mock';

let wrapper, startAddItem;

beforeEach(() => {
  startAddItem = jest.fn(startAddItemMock);
  wrapper = shallow(<Taskinput startAddItem={startAddItem} />);
});

test('should render Taskinput component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should add item on Textinput and carriage return if string is not empty', () => {
  const testString = 'Testing Taskinput component';
  wrapper.find('TextInput').prop('onChangeText')(testString);
  expect(wrapper.state('text')).toEqual(testString);
  wrapper.find('TextInput').prop('onSubmitEditing')();
  expect(startAddItem).toHaveBeenCalledWith(testString);
});
