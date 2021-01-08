import * as React from 'react';
import { TodoListStatus, TodoListStatusFriendlyNames } from '../../enums';
import { TodoTask } from '../../store/TodoTasksService';
import * as TodoTasksService from '../../store/TodoTasksService';

export type TodoFormProps = {
    todoTask: TodoTask,
    editedTodoTask?: TodoTask,
} & TodoTasksService.TodoTasksState
  & typeof TodoTasksService.actionCreators;

export type TodoFormState = {
    editedTodoTask?: TodoTask,
    todoTask: TodoTask,
    isCreating: boolean,
};

class TodoForm extends React.PureComponent<TodoFormProps, TodoFormState> {
    constructor(props: TodoFormProps) {
        super(props);
        this.state = {
            todoTask: this.props.editedTodoTask || props.todoTask,
            isCreating: this.props.editedTodoTask !== undefined || false,
            editedTodoTask: this.props.editedTodoTask
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createNew = this.createNew.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidUpdate() {
        if ((this.props.editedTodoTask &&
            this.state.editedTodoTask &&
            this.props.editedTodoTask.name !== this.state.editedTodoTask.name) ||
            !this.state.editedTodoTask && this.props.editedTodoTask) {

            this.setState({
                todoTask: this.props.editedTodoTask,
                isCreating: true,
                editedTodoTask: this.props.editedTodoTask
            });
        }

        if (this.props.isDeleted) {
            this.setState({
                editedTodoTask: undefined
            });
        }
    }

    public render() {
        return this.state.isCreating ? this.renderForm() : <button className="btn btn-primary" onClick={this.createNew}>Create</button>;
    }

    private renderForm() {
        return (
            <div className="jumbotron">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Task name</label>
                        <input type="text"
                            className="form-control"
                            id="name"
                            placeholder="Todo task name"
                            onChange={this.handleChange}
                            value={this.state.todoTask.name}
                        />
                        <small className="form-text text-muted">Your TODO task name</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <input type="number"
                            className="form-control"
                            id="priority"
                            placeholder="Priority"
                            onChange={this.handleChange}
                            value={this.state.todoTask.priority}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select className="form-control"
                            id="status"
                            onChange={this.handleChange}
                            value={this.state.todoTask.status}>
                            {
                                Object
                                    .keys(TodoListStatus)
                                    .filter((k) => !isNaN(Number(k)))
                                    .map((s) => <option key={s} value={s}>{TodoListStatusFriendlyNames[Number(s)]}</option>)
                            }
                        </select>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">{this.state.editedTodoTask ? 'Update task' : 'Create new task'}</button>
                        <button type="submit" className="btn btn-default" onClick={this.cancel}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }

    private cancel() {
        this.props.cancelTodoTask();

        this.setState({
            isCreating: false,
            todoTask: {
                name: '',
                priority: 0,
                status: 0
            },
            editedTodoTask: undefined
        });
    }

    private createNew() {
        this.setState({
            isCreating: true,
            todoTask: {
                name: '',
                priority: 0,
                status: 0
            },
            editedTodoTask: undefined
        });
    }

    private handleSubmit(event: React.SyntheticEvent) {
        if (this.state.todoTask && this.state.editedTodoTask) {
            this.props.updateTodoTask(this.state.editedTodoTask.name, this.state.todoTask);
        } else {
            this.props.createTodoTask(this.state.todoTask);
        }
        this.setState({ isCreating: false });
        event.preventDefault();
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const newTodoTaskUpdate: TodoTasksService.TodoTask = Object.assign({}, this.state.todoTask);

        if (event.target.id === "name")
            newTodoTaskUpdate.name = event.target.value;
        else if (event.target.id === "status")
            newTodoTaskUpdate.status = Number(event.target.value) || 0;
        else
            newTodoTaskUpdate.priority = Number(event.target.value) || 0;

        this.setState({
            todoTask: newTodoTaskUpdate
        });
    }

}

export default TodoForm;