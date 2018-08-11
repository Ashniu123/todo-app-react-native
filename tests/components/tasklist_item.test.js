import React from 'react';
import { shallow } from 'enzyme';

import TasklistItem from '../../src/components/taskslist/tasklist_item/tasklist_item.component';
import tasks from '../fixtures/tasks';

test('should render TasklistItem component correctly', () => {
	const firstTask = tasks[0];
	const onCheckboxChange = jest.fn();
	const wrapper = shallow(<TasklistItem 
		id={firstTask.key}
		item={firstTask.item}
		completed={firstTask.completed}
		onCheckboxChange={onCheckboxChange}
	/>);

	expect(wrapper).toMatchSnapshot();
});