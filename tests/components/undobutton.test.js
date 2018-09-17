import React from 'react';
import { shallow } from 'enzyme';

import { UndoButton } from '../../src/components/undobutton/undobutton.component';
import tasks from '../fixtures/tasks';

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

test('should restore state on button press', () => {
	wrapper.setState({ show: true });
	wrapper.find('Button').prop('onPress')();
	expect(startRestoreState).toHaveBeenCalled();
});