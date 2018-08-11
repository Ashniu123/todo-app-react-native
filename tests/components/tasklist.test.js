import React from 'react';
import { shallow } from 'enzyme';

import { Tasklist } from '../../src/components/taskslist/tasklist.component';

test('should render Tasklist component correctly', () => {
	const wrapper = shallow(<Tasklist />);

	expect(wrapper).toMatchSnapshot();
});