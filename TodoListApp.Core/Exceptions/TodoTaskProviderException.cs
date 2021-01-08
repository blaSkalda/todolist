using System;
using TodoListApp.Core.Enums;

namespace TodoListApp.Core.Exceptions
{
    public class TodoTaskProviderException : Exception
    {
        private TodoTaskErrors _error;

        public TodoTaskProviderException(TodoTaskErrors error) : base(GetExceptionMessage(error))
        {
            _error = error;
        }

        public int GetCode()
        {
            return _error switch
            {
                TodoTaskErrors.Duplicate => 400,
                TodoTaskErrors.NotFound => 404,
                TodoTaskErrors.MissingName => 400,
                _ => 500
            };
        }

        private static string GetExceptionMessage(TodoTaskErrors error)
        {
            return error switch
            {
                TodoTaskErrors.Duplicate => "Todo task with same message already exists",
                TodoTaskErrors.NotFound => "Todo task doesn't exist",
                TodoTaskErrors.MissingName => "Todo task has to have name",
                _ => "Undefined"
            };
        }
    }
}