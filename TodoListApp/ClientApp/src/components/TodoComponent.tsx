import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as TodoTasksService from '../store/TodoTasksService';
import Error from './utilities/ErrorComponent';
import TodoCard from './utilities/TodoCardComponent';
import TodoForm from './utilities/TodoFormComponent';

// At runtime, Redux will merge together...
type TodoTasksProps =
    TodoTasksService.TodoTasksState // ... state we've requested from the Redux store
    & typeof TodoTasksService.actionCreators; // ... plus action creators we've requested

class Todo extends React.PureComponent<TodoTasksProps> {

    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public componentDidUpdate() {

    }

    public render() {
        const todoTask: TodoTasksService.TodoTask = {
            name: '',
            priority: 0,
            status: 0
        };

        return (
            <React.Fragment>
                {this.props.error && <Error message={this.props.error} />}
                {this.renderTable()}
                <TodoForm todoTask={todoTask} {...this.props} />
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestTodoTasks();
    }

    private renderTable() {
        return (
            <div className="card-columns">
                {this.props.todoTasks.map((todoTask: TodoTasksService.TodoTask) =>
                    <TodoCard key={todoTask.name} todoTask={todoTask} {...this.props} />
                )}
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.todoTasks, // Selects which state properties are merged into the component's props
    TodoTasksService.actionCreators // Selects which action creators are merged into the component's props
)(Todo as any);
