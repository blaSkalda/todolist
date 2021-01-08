using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoListApp.Core.Exceptions;
using TodoListApp.Core.Models;

namespace TodoListApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        public ErrorModel Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context.Error; // Your exception
            var code = 500; // Internal Server Error by default

            if (exception is TodoTaskProviderException)
            {
                var todoException = exception as TodoTaskProviderException;
                code = todoException.GetCode();
            }

            Response.StatusCode = code; // You can use HttpStatusCode enum instead

            return new ErrorModel
            {
                Message = exception.Message
            };
        }
    }
}