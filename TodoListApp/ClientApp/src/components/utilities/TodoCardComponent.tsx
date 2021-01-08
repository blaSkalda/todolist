import * as React from 'react';
import { TodoListStatusFriendlyNames } from '../../enums';
import { TodoTask } from '../../store/TodoTasksService';
import * as TodoTasksService from '../../store/TodoTasksService';

export type TodoCardProps = {
    todoTask: TodoTask,
    editedTodoTask?: TodoTask,
} & typeof TodoTasksService.actionCreators;

class TodoCard extends React.PureComponent<TodoCardProps> {
    public render() {
        const cssClasses = `card ${this.props.editedTodoTask && this.props.editedTodoTask.name === this.props.todoTask.name ? 'border-primary' : ''}`

        return (
            <div className={cssClasses}>
                {this.renderCardHeader(this.props.todoTask)}
                <div className="card-body">
                    <h5 className="card-title">{this.props.todoTask.name}</h5>
                    <p className="card-text"><small className="text-muted">{this.props.todoTask.priority}</small></p>
                </div>
                {this.renderCardFooter(this.props.todoTask)}
            </div>
        );
    }


    private renderCardHeader(todoTask: TodoTask) {
        return (
            <div className="card-header">
                <div className="d-flex justify-content-center">
                    <button id={`edit_${todoTask.name}`} onClick={() => this.editTask(todoTask)} type="button" className="btn btn-block btn-outline-primary btn-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
                        </svg>
                Edit
            </button>
                </div>
            </div>
        );
    }

    private renderCardFooter(todoTask: TodoTask) {
        return (
            <div className="card-footer">
                <div className="d-flex justify-content-between">
                    {todoTask.status > 0 && this.renderMoveTaskButton(todoTask, '<<', -1)}
                    <small className="text-muted">{TodoListStatusFriendlyNames[todoTask.status]}</small>
                    {todoTask.status < 2 && this.renderMoveTaskButton(todoTask, '>>', 1)}
                    {todoTask.status === 2 && this.renderBinButtonWithFuction(todoTask, this.deleteTask.bind(this))}
                </div>
            </div>
        );
    }

    private renderMoveTaskButton(todoTask: TodoTask, buttonText: string, move: number) {
        return (
            <button onClick={() => this.moveTask(todoTask, move)} type="button" className="move-button btn btn-outline-secondary">{buttonText}</button>
        );
    }

    private renderBinButtonWithFuction(todoTask: TodoTask, onClickFunction: Function) {
        return (
            <button id={`delete_${todoTask.name}`} onClick={() => onClickFunction(todoTask)} type="button" className="btn btn-outline-alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                </svg>
                <small className="text-muted">Delete</small>
            </button>
        );
    }

    private editTask(todoTask: TodoTask) {
        this.props.editTodoTask(todoTask);
    }

    private moveTask(todoTask: TodoTask, status: number) {
        this.props.updateTodoTaskStatus(todoTask.name, todoTask.status + status);
    }

    private deleteTask(todoTask: TodoTask) {
        this.props.deleteTodoTask(todoTask.name);
    }

}

export default TodoCard;