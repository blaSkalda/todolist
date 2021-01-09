import * as React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme'

import TodoComponent from './TodoComponent';

it('renders TodoComponent', () => {
    const storeFake = (state: any) => ({
        default: () => { },
        subscribe: () => { },
        dispatch: () => { },
        getState: () => ({ ...state })
    });
    const store = storeFake({
        todoTasks: {
            todoTasks: []
        }
    }) as any;

    const wrapper = mount(<Provider store={store}><TodoComponent /></Provider>);
    expect(wrapper).toMatchSnapshot();
});
