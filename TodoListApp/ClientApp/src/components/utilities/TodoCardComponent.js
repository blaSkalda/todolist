"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enums_1 = require("../../enums");
var TodoCard = /** @class */ (function (_super) {
    __extends(TodoCard, _super);
    function TodoCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TodoCard.prototype.render = function () {
        var cssClasses = "card " + (this.props.editedTodoTask && this.props.editedTodoTask.name === this.props.todoTask.name ? 'border-primary' : '');
        return (React.createElement("div", { className: cssClasses },
            this.renderCardHeader(this.props.todoTask),
            React.createElement("div", { className: "card-body" },
                React.createElement("h5", { className: "card-title" }, this.props.todoTask.name),
                React.createElement("p", { className: "card-text" },
                    React.createElement("small", { className: "text-muted" }, this.props.todoTask.priority))),
            this.renderCardFooter(this.props.todoTask)));
    };
    TodoCard.prototype.renderCardHeader = function (todoTask) {
        var _this = this;
        return (React.createElement("div", { className: "card-header" },
            React.createElement("div", { className: "d-flex justify-content-center" },
                React.createElement("button", { id: "edit_" + todoTask.name, onClick: function () { return _this.editTask(todoTask); }, type: "button", className: "btn btn-block btn-outline-primary btn-lg" },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-pencil", viewBox: "0 0 16 16" },
                        React.createElement("path", { d: "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" })),
                    "Edit"))));
    };
    TodoCard.prototype.renderCardFooter = function (todoTask) {
        return (React.createElement("div", { className: "card-footer" },
            React.createElement("div", { className: "d-flex justify-content-between" },
                todoTask.status > 0 && this.renderMoveTaskButton(todoTask, '<<', -1),
                React.createElement("small", { className: "text-muted" }, enums_1.TodoListStatusFriendlyNames[todoTask.status]),
                todoTask.status < 2 && this.renderMoveTaskButton(todoTask, '>>', 1),
                todoTask.status === 2 && this.renderBinButtonWithFuction(todoTask, this.deleteTask.bind(this)))));
    };
    TodoCard.prototype.renderMoveTaskButton = function (todoTask, buttonText, move) {
        var _this = this;
        return (React.createElement("button", { onClick: function () { return _this.moveTask(todoTask, move); }, type: "button", className: "move-button btn btn-outline-secondary" }, buttonText));
    };
    TodoCard.prototype.renderBinButtonWithFuction = function (todoTask, onClickFunction) {
        return (React.createElement("button", { id: "delete_" + todoTask.name, onClick: function () { return onClickFunction(todoTask); }, type: "button", className: "btn btn-outline-alert" },
            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-trash-fill", viewBox: "0 0 16 16" },
                React.createElement("path", { d: "M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" })),
            React.createElement("small", { className: "text-muted" }, "Delete")));
    };
    TodoCard.prototype.editTask = function (todoTask) {
        this.props.editTodoTask(todoTask);
    };
    TodoCard.prototype.moveTask = function (todoTask, status) {
        this.props.updateTodoTaskStatus(todoTask.name, todoTask.status + status);
    };
    TodoCard.prototype.deleteTask = function (todoTask) {
        this.props.deleteTodoTask(todoTask.name);
    };
    return TodoCard;
}(React.PureComponent));
exports.default = TodoCard;
//# sourceMappingURL=TodoCardComponent.js.map