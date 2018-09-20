import React from 'react';
import { shallow } from 'enzyme';

import { UndoButton } from '../../src/components/undobutton/undobutton.component';
import tasks from '../fixtures/tasks';

jest.useFakeTimers();

let wrapper, startRestoreState;

beforeEach(() => {
  startRestoreState = jest.fn();
  wrapper = shallow(<UndoButton startRestoreState={startRestoreState} data={tasks} />);
});

test('should render UndoButton component correctly', () => {
  expect(wrapper).toMatchSnapshot();
  wrapper.setState({ show: true });
  expect(wrapper).toMatchSnapshot();
});

test('should change state on delete item(s)', () => {
  expect(wrapper.state().show).toBe(false);
  wrapper.setProps({ data: tasks.splice(2) });
  expect(wrapper.state().show).toBe(true);
});

test('should show button on delete item(s) and disappear after 5 seconds', () => {
  expect(wrapper.state().show).toBe(false);
  wrapper.setProps({ data: tasks.splice(2) });
  expect(wrapper.state().show).toBe(true);
  jest.advanceTimersByTime(5000);
  expect(wrapper.state().show).toBe(false);
});

test('should restore state on button press', () => {
  wrapper.setState({ show: true });
  wrapper.find('Button').prop('onPress')();
  expect(startRestoreState).toHaveBeenCalled();
});
