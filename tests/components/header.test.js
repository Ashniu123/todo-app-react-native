import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../src/components/header/header.component';

test('should render Header component correctly', () => {
	const wrapper = shallow(<Header />);

	expect(wrapper).toMatchSnapshot();
});