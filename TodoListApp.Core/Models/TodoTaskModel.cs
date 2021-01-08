using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using TodoListApp.Core.Enums;

namespace TodoListApp.Core.Models
{
    [JsonObject(NamingStrategyType = typeof(SnakeCaseNamingStrategy))]
    public class TodoTaskModel : IEquatable<TodoTaskModel>
    {
        [JsonRequired]
        public string Name { get; set; }

        public int Priority { get; set; }
        public TodoTaskStatus Status { get; set; }

        public bool Equals(TodoTaskModel todoTask)
        {
            return Name.Equals(todoTask.Name);
        }
    }
}