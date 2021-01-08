using System.Collections.Concurrent;
using System.Collections.Generic;
using TodoListApp.Core.Enums;
using TodoListApp.Core.Exceptions;
using TodoListApp.Core.Intefaces;
using TodoListApp.Core.Models;

namespace TodoListApp.Core.Providers
{
    public class TodoTaskProvider : ITodoTaskProvider
    {
        private ConcurrentDictionary<string, TodoTaskModel> _todoTasks = new ConcurrentDictionary<string, TodoTaskModel>();

        public TodoTaskModel CreateTodoTask(TodoTaskModel todoTask)
        {
            if (string.IsNullOrWhiteSpace(todoTask.Name))
                throw new TodoTaskProviderException(TodoTaskErrors.MissingName);

            if (!_todoTasks.TryAdd(todoTask.Name, todoTask))
                throw new TodoTaskProviderException(TodoTaskErrors.Duplicate);

            return todoTask;
        }

        public void DeleteTodoTaskByName(string name)
        {
            if (!_todoTasks.TryRemove(name, out var _))
                throw new TodoTaskProviderException(TodoTaskErrors.NotFound);
        }

        public IEnumerable<TodoTaskModel> GetAllTodoTasks()
        {
            return _todoTasks.Values;
        }

        public TodoTaskModel GetTodoTaskByName(string name)
        {
            if (!_todoTasks.TryGetValue(name, out var todoTask))
                throw new TodoTaskProviderException(TodoTaskErrors.NotFound);

            return todoTask;
        }

        public TodoTaskModel UpdateTask(string name, TodoTaskModel todoTask)
        {
            var existingTodoTask = GetTodoTaskByName(name);
            DeleteTodoTaskByName(name);

            try
            {    
                CreateTodoTask(todoTask);
            }
            catch
            {
                // recreate if create fails
                CreateTodoTask(existingTodoTask);
                throw;
            }

            return todoTask;
        }

        public TodoTaskModel UpdateTodoTaskStatus(string name, TodoTaskStatus status)
        {
            var existingTodoTask = GetTodoTaskByName(name);
            existingTodoTask.Status = status;
            return existingTodoTask;
        }
    }
}