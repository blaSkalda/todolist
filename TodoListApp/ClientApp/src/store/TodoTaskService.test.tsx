import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { TodoTasksState, KnownAction, actionCreators } from './TodoTasksService';

type DispatchExts = ThunkDispatch<TodoTasksState, undefined, KnownAction>;

const middlewares = [thunk];
const mockStore = configureMockStore<TodoTasksState, DispatchExts>(middlewares);

describe('actions', () => {
    describe('requestTodoTasks', () => {
        let store = mockStore();

        const mockSuccessResponse = { id: 1, dev: 'Skalda' };
        const mockErrorResponse = { message: 'Error' };

        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            status: 200,
            json: () => mockJsonPromise,
        });

        const mockFetchErrorPromise = Promise.resolve({ // 3
            status: 404,
            json: () => Promise.resolve(mockErrorResponse),
        });

        const mockErrorPromise = Promise.resolve(mockFetchErrorPromise);

        beforeEach(() => {
            store = mockStore();
        });

        it('should dispatch start and fail with error', (done) => {
            self.fetch = jest.fn().mockImplementationOnce(() => mockErrorPromise);

            store.dispatch(actionCreators.requestTodoTasks()).then(() => {
                const [startAction, successAction] = store.getActions();

                expect(startAction).toEqual({
                    type: 'REQUEST_TODO_TASKS',
                });

                expect(successAction).toEqual({
                    type: 'ERROR',
                    error: mockErrorResponse.message,
                });

                done();
            });
        });

        it('should dispatch start and succeed', (done) => {
            self.fetch = jest.fn().mockImplementationOnce(() => mockFetchPromise);

            store.dispatch(actionCreators.requestTodoTasks()).then(() => {
                const [startAction, successAction] = store.getActions();

                expect(startAction).toEqual({
                    type: 'REQUEST_TODO_TASKS',
                });

                expect(successAction).toEqual({
                    type: 'RECEIVE_TODO_TASKS',
                    todoTasks: mockSuccessResponse,
                });

                done();
            });
        });
    });
});