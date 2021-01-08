import * as React from 'react';
import { shallow } from 'enzyme'

import TodoForm, { TodoFormState } from './TodoFormComponent';
import { TodoTask } from '../../store/TodoTasksService';

describe('<TodoForm />', () => {
    const props = {
        editedTodoTask: undefined as TodoTask | undefined,
        isLoading: false,
        todoTasks: [],
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

    it('renders <TodoForm />', () => {
        const wrapper = shallow(<TodoForm {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('renders <TodoForm /> and changes state to creating new todo list', () => {
        const wrapper = shallow(<TodoForm {...props} />);
        wrapper.setState({ isCreating: true });

        expect(wrapper).toMatchSnapshot();
    });

    it('renders <TodoForm /> in edit state', () => {
        props.editedTodoTask = {
            name: 'Test'
        } as TodoTask;
        const wrapper = shallow(<TodoForm {...props} />);

        expect(wrapper).toMatchSnapshot();
    });


    it('renders <TodoForm /> and changes state to creating new todo list adn changes name for new todo task', () => {
        props.editedTodoTask = undefined;

        const wrapper = shallow(<TodoForm {...props} />);
        wrapper.setState({ isCreating: true });

        wrapper.find('#name').simulate('change', { target: { value: 'Skalda', id: 'name' } });

        const state = wrapper.state() as TodoFormState;

        expect(state.todoTask.name).toEqual('Skalda');
    });

    it('renders <TodoForm /> edit todo list adn changes name for new todo task', () => {
        props.editedTodoTask = {
            name: 'Test'
        } as TodoTask;

        const wrapper = shallow(<TodoForm {...props} />);
        wrapper.setState({ isCreating: true });

        wrapper.find('#name').simulate('change', { target: { value: 'Skalda', id: 'name'} });

        const state = wrapper.state() as TodoFormState;

        expect(state.todoTask.name).toEqual('Skalda');
    });
});
