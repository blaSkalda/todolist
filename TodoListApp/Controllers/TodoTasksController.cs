using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TodoListApp.Core.Enums;
using TodoListApp.Core.Intefaces;
using TodoListApp.Core.Models;

namespace TodoListApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoTasksController : ControllerBase
    {
        private ITodoTaskProvider _todoTaskProvider;

        public TodoTasksController(ITodoTaskProvider todoTaskProvider)
        {
            _todoTaskProvider = todoTaskProvider;
        }

        [HttpPost]
        public TodoTaskModel CreateTodoTask(TodoTaskModel todoTask)
        {
            return _todoTaskProvider.CreateTodoTask(todoTask);
        }

        [HttpDelete("{name}")]
        public void DeleteTodoTask(string name)
        {
            _todoTaskProvider.DeleteTodoTaskByName(name);
        }

        [HttpGet("{name}")]
        public TodoTaskModel GetTodoTask(string name)
        {
            return _todoTaskProvider.GetTodoTaskByName(name);
        }

        [HttpGet]
        public IEnumerable<TodoTaskModel> GetTodoTasks()
        {
            return _todoTaskProvider.GetAllTodoTasks();
        }

        [HttpPut("{name}")]
        public TodoTaskModel UpdateTodoTask(string name, TodoTaskModel todoTask)
        {
            return _todoTaskProvider.UpdateTask(name, todoTask);
        }

        [HttpPatch("{name}/{status}")]
        public TodoTaskModel UpdateTodoTaskStatus(string name, TodoTaskStatus status)
        {
            return _todoTaskProvider.UpdateTodoTaskStatus(name, status);
        }
    }
}