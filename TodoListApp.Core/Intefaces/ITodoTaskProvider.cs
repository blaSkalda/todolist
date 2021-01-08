using System.Collections.Generic;
using TodoListApp.Core.Enums;
using TodoListApp.Core.Models;

namespace TodoListApp.Core.Intefaces
{
    public interface ITodoTaskProvider
    {
        TodoTaskModel CreateTodoTask(TodoTaskModel todoTask);

        void DeleteTodoTaskByName(string name);

        IEnumerable<TodoTaskModel> GetAllTodoTasks();

        TodoTaskModel GetTodoTaskByName(string name);

        TodoTaskModel UpdateTask(string name, TodoTaskModel todoTask);
        TodoTaskModel UpdateTodoTaskStatus(string name, TodoTaskStatus status);
    }
}