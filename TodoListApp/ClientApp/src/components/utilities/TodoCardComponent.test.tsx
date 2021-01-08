import * as React from 'react';
import { shallow } from 'enzyme'

import TodoCard from './TodoCardComponent';

describe('<TodoTask />', () => {

    const props = {
        todoTask: {
            name: 'Test',
            priority: 1,
            status: 1
        },
        updateTodoTask: jest.fn(),
        cancelTodoTask: jest.fn(),
        editTodoTask: jest.fn(),
        deleteTodoTask: jest.fn(),
        updateTodoTaskStatus: jest.fn(),
        createTodoTask: jest.fn(),
        requestTodoTasks: jest.fn(),
    };

    it('renders <TodoTask />', () => {
        const wrapper = shallow(<TodoCard {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Click on edit <TodoTask /> calls editTodoTask function', () => {
        const wrapper = shallow(<TodoCard {...props} />);
        props.editTodoTask.mockReset();

        wrapper.find('#edit_Test').simulate('click');

        expect(props.editTodoTask.mock.calls.length).toEqual(1);
    });

    it('Click on delete fails if status is not equls 2 <TodoTask />', () => {
        const wrapper = shallow(<TodoCard {...props} />);
        props.editTodoTask.mockReset();

        expect(wrapper.find('#delete_Test').length).toEqual(0);
    });

    it('Click on delete <TodoTask /> calls deleteTodoTask function', () => {
        props.todoTask.status = 2;

        const wrapper = shallow(<TodoCard {...props} />);
        props.editTodoTask.mockReset();

        wrapper.find('#delete_Test').simulate('click');
        expect(props.deleteTodoTask.mock.calls.length).toEqual(1);
    });

    it('Click on move status <TodoTask /> calls updateTodoTaskStatus function twice', () => {
        props.todoTask.status = 1;
        const wrapper = shallow(<TodoCard {...props} />);
        props.editTodoTask.mockReset();

        wrapper.find('.move-button').forEach(button => button.simulate('click'));

        expect(props.updateTodoTaskStatus.mock.calls.length).toEqual(2);
    });
});
