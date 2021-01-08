import * as React from 'react';
import { shallow } from 'enzyme'

import Error from './ErrorComponent';

describe('<Error />', () => {

    it('renders <Error />', () => {
        const wrapper = shallow(<Error message='error' />);
        expect(wrapper).toMatchSnapshot();
    });
});
