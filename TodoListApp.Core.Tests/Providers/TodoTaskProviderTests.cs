using NUnit.Framework;
using System.Linq;
using TodoListApp.Core.Exceptions;
using TodoListApp.Core.Intefaces;
using TodoListApp.Core.Models;
using TodoListApp.Core.Providers;

namespace TodoListApp.Core.Tests.Providers
{
    public class TodoTaskProviderTests
    {
        private ITodoTaskProvider _taskProvider;


        [SetUp]
        public void Setup()
        {
            _taskProvider = new TodoTaskProvider();
        }

        [Test]
        public void Given_EmptyCollection_And_NameForNewTask_Then_CreateTodoTask_Returns_Task_WithGivenName()
        {
            var task = _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda"
            });

            Assert.AreEqual(task.Name, "Skalda");
        }

        [Test]
        public void Given_EmptyCollection_And_NoNameForNewTask_Then_CreateTodoTask_Throws_TodoTaskProviderException()
        {
            Assert.Throws<TodoTaskProviderException>(() => _taskProvider.CreateTodoTask(new TodoTaskModel()));
        }

        [Test]
        public void Given_CollectionWithOneRecord_And_SameNameForNewTaskAsExistingOne_Then_CreateTodoTask_Throws_TodoTaskProviderException()
        {
            var task = _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda"
            });

            Assert.Throws<TodoTaskProviderException>(() => _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda"
            }));
        }

        [Test]
        public void Given_EmptyCollection_Then_GetAllTodoTasks_Returns_EmpyList()
        {
            var tasks = _taskProvider.GetAllTodoTasks();

            Assert.AreEqual(tasks.Any(), false);
        }

        [Test]
        public void Given_EmptyCollection_Then_DeleteTodoTaskByName_Throws_TodoTaskProviderException()
        {
            Assert.Throws<TodoTaskProviderException>(() => _taskProvider.DeleteTodoTaskByName("Skalda"));
        }


        [Test]
        public void Given_CollectionWithOneRecord_Then_DeleteTodoTaskByName_RemovesRecordFromCollection()
        {
            var task = _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda"
            });

            _taskProvider.DeleteTodoTaskByName("Skalda");

            var tasks = _taskProvider.GetAllTodoTasks();

            Assert.AreEqual(tasks.Any(), false);
        }

        [Test]
        public void Given_EmptyCollection_Then_GetTodoTaskByName_Throws_TodoTaskProviderException()
        {
            Assert.Throws<TodoTaskProviderException>(() => _taskProvider.GetTodoTaskByName("Skalda"));
        }

        [Test]
        public void Given_CollectionWithOneRecord_Then_GetTodoTaskByName_ReturnsTask()
        {
            var task = _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda"
            });

            var retrievedTask = _taskProvider.GetTodoTaskByName("Skalda");

            Assert.AreEqual(task, retrievedTask);
        }

        [Test]
        public void Given_EmptyCollection_Then_UpdateTask_Throws_TodoTaskProviderException()
        {
            Assert.Throws<TodoTaskProviderException>(() => _taskProvider.UpdateTask("Skalda", new TodoTaskModel()));
        }

        [Test]
        public void Given_CollectionWithOneRecord_Then_UpdateTask_With_NoName_Throws_TodoTaskProviderException()
        {
            _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda"
            });


            Assert.Throws<TodoTaskProviderException>(() => _taskProvider.UpdateTask("Skalda", new TodoTaskModel()));
        }

        [Test]
        public void Given_CollectionWithTwoRecords_Then_UpdateTask_With_SameNameAsExistingRecord_Throws_TodoTaskProviderException_And_RecordStillExistsINOriginalState()
        {
            var task = _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda",
                Status = Enums.TodoTaskStatus.NOT_STARTED
            });

            _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "new",
                Status = Enums.TodoTaskStatus.COMPLETED
            });

            Assert.Throws<TodoTaskProviderException>(() => _taskProvider.UpdateTask("Skalda", new TodoTaskModel
            {
                Name = "new"
            }));

            var retrievedTask = _taskProvider.GetTodoTaskByName("Skalda");

            Assert.AreEqual(task, retrievedTask);
        }

        [Test]
        public void Given_CollectionWithTwoRecords_Then_UpdateTask_With_ChangedProperties_UpdatesRecordCorrectly()
        {
            _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda",
                Status = Enums.TodoTaskStatus.NOT_STARTED
            });

            _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "new",
                Status = Enums.TodoTaskStatus.COMPLETED
            });

            var newTask = new TodoTaskModel
            {
                Name = "Updated",
                Priority = 2,
                Status = Enums.TodoTaskStatus.IN_PROGRESS
            };


            var retrievedTask = _taskProvider.UpdateTask("Skalda", newTask);

            Assert.AreEqual(newTask, retrievedTask);
        }


        [Test]
        public void Given_EmptyCollection_Then_UpdateTodoTaskStatus_Throws_TodoTaskProviderException()
        {
            Assert.Throws<TodoTaskProviderException>(() => _taskProvider.UpdateTodoTaskStatus("Skalda", Enums.TodoTaskStatus.IN_PROGRESS));
        }

        [Test]
        public void Given_CollectionWithTwoRecords_Then_UpdateTodoTaskStatus_With_ChangedProperties_UpdatesRecordCorrectly()
        {
            _taskProvider.CreateTodoTask(new TodoTaskModel
            {
                Name = "Skalda",
                Status = Enums.TodoTaskStatus.NOT_STARTED
            });

            var retrievedTask = _taskProvider.UpdateTodoTaskStatus("Skalda", Enums.TodoTaskStatus.IN_PROGRESS);

            Assert.AreEqual(Enums.TodoTaskStatus.IN_PROGRESS, retrievedTask.Status);
        }
    }
}