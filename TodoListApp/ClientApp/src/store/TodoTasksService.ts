import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TodoTasksState {
    isLoading: boolean;
    isDeleted?: boolean;
    todoTasks: TodoTask[];
    error?: string;
    isCreated?: boolean;
    editedTodoTask?: TodoTask,
}

export interface TodoTask {
    name: string;
    priority: number;
    status: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

export interface RequestTodoTasksAction {
    type: 'REQUEST_TODO_TASKS';
}

export interface ReceiveTodoTasksAction {
    type: 'RECEIVE_TODO_TASKS';
    todoTasks: TodoTask[];
}

interface CreatedTodoTaskAction {
    type: 'CREATED_TODO_TASK';
    createdTask: TodoTask;
}

interface UpdatedTodoTaskAction {
    type: 'UPDATED_TODO_TASK';
    updatedTask: TodoTask;
    originalName: string;
}

interface EditTodoTaskAction {
    type: 'EDIT_TODO_TASK';
    editTask?: TodoTask;
}

interface DeletedTodoTaskAction {
    type: 'DELETED_TODO_TASK';
    originalName: string;
}

interface ErrorTodoTaskAction {
    type: 'ERROR';
    error: string;
}

interface TodoTaskError {
    message: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = RequestTodoTasksAction | ReceiveTodoTasksAction | CreatedTodoTaskAction
    | ErrorTodoTaskAction | UpdatedTodoTaskAction | DeletedTodoTaskAction
    | EditTodoTaskAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTodoTasks: (): AppThunkAction<KnownAction> => (dispatch) => {

        dispatch({ type: 'REQUEST_TODO_TASKS' });
        fetch(`api/TodoTasks`)
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(error => {
                        dispatch({ type: 'ERROR', error: error.message });
                    });
                    return;
                }
                return (response.json() as Promise<TodoTask[]>).then(data => {
                    dispatch({ type: 'RECEIVE_TODO_TASKS', todoTasks: data });
                });
            });
    },
    createTodoTask: (task: TodoTask): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'REQUEST_TODO_TASKS' });
        fetch(`api/TodoTasks`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(task)
        })
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(error => dispatch({ type: 'ERROR', error: error.message }));
                    return;
                }
                return (response.json() as Promise<TodoTask>).then(data => {
                    dispatch({ type: 'CREATED_TODO_TASK', createdTask: data });
                });
            });
    },
    updateTodoTask: (name: string, task: TodoTask): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'REQUEST_TODO_TASKS' });
        fetch(`api/TodoTasks/${name}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(task)
        })
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(error => dispatch({ type: 'ERROR', error: error.message }));
                    return;
                }
                return (response.json() as Promise<TodoTask>).then(data => {
                    dispatch({ type: 'UPDATED_TODO_TASK', updatedTask: data, originalName: name });
                });
            });
    },
    updateTodoTaskStatus: (name: string, status: number): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'REQUEST_TODO_TASKS' });
        fetch(`api/TodoTasks/${name}/${status}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH'
        })
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(error => dispatch({ type: 'ERROR', error: error.message }));
                    return;
                }
                return (response.json() as Promise<TodoTask>).then(data => {
                    dispatch({ type: 'UPDATED_TODO_TASK', updatedTask: data, originalName: name });
                });
            });
    },
    deleteTodoTask: (name: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'REQUEST_TODO_TASKS' });
        fetch(`api/TodoTasks/${name}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(error => dispatch({ type: 'ERROR', error: error.message }));
                    return;
                }
                dispatch({ type: 'DELETED_TODO_TASK', originalName: name });
            });
    },
    editTodoTask: (todoTask: TodoTask): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'EDIT_TODO_TASK', editTask: todoTask });
    },
    cancelTodoTask: (): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'EDIT_TODO_TASK', editTask: undefined });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TodoTasksState = {
    todoTasks: [], isLoading: false
};

export const reducer: Reducer<TodoTasksState> = (state: TodoTasksState | undefined, incomingAction: Action): TodoTasksState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TODO_TASKS':
            return {
                todoTasks: state.todoTasks,
                isLoading: true
            };
        case 'RECEIVE_TODO_TASKS':
            return {
                todoTasks: action.todoTasks,
                isLoading: false
            };
        case 'CREATED_TODO_TASK':
            state.todoTasks.push(action.createdTask);
            return {
                todoTasks: Object.assign([], state.todoTasks),
                isCreated: true,
                isLoading: false
            };
        case 'UPDATED_TODO_TASK':
            const updateTaskIndex = state.todoTasks.findIndex((t) => t.name === action.originalName);
            if (updateTaskIndex >= 0)
                state.todoTasks[updateTaskIndex] = action.updatedTask;
            else
                state.todoTasks.push(action.updatedTask);

            return {
                todoTasks: Object.assign([], state.todoTasks),
                isLoading: false,
                editedTodoTask: undefined
            };
        case 'DELETED_TODO_TASK':
            const taskIndex = state.todoTasks.findIndex((t) => t.name === action.originalName);
            if (taskIndex >= 0)
                state.todoTasks.splice(taskIndex, 1);

            return {
                todoTasks: Object.assign([], state.todoTasks),
                isDeleted: true,
                isLoading: false
            };
        case 'EDIT_TODO_TASK':
            return {
                todoTasks: state.todoTasks,
                editedTodoTask: action.editTask,
                isLoading: false
            };
        case 'ERROR':
            return {
                error: action.error,
                todoTasks: state.todoTasks,
                editedTodoTask: undefined,
                isLoading: false
            };
    }

    return state;
};
