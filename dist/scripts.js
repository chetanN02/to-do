"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoClass = function () {
    function ToDoClass() {
        _classCallCheck(this, ToDoClass);

        this.tasks = JSON.parse(localStorage.getItem("TASKS"));
        if (!this.tasks) {
            this.tasks = [];
        }
        this.addEventListeners();
        this.loadtasks();
        console.log("This is a debugger");
    }

    _createClass(ToDoClass, [{
        key: "loadtasks",
        value: function loadtasks() {
            var _this = this;

            //ES5 syntax
            // let tasksHtml = (this.tasks).reduce(function(html, task, index) { 
            //     return html += this.generateTaskHtml(task, index)   // the this here refers to the todo object and we have to explicitly bind it with this.
            //   }.bind(this), '');   

            //ES6 syntax
            var tasksHtml = this.tasks.reduce(function (html, task, index) {
                return html += _this.generateTaskHtml(task, index);
            }, '');
            document.getElementById('taskList').innerHTML = tasksHtml;
            localStorage.setItem("TASKS", JSON.stringify(this.tasks));
        }
    }, {
        key: "generateTaskHtml",
        value: function generateTaskHtml(task, index) {
            return "\n         <li class=\"list-group-item checkbox\">\n          <div class=\"row\">\n           <div class=\"col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox\">\n            <label><input id=\"toggleTaskStatus\" type=\"checkbox\"  \n            onchange = \"toDo.toggleTaskStatus(" + index + ")\";\" value=\"\" class=\"\" \n            " + (task.isComplete ? 'checked' : '') + "></label>\n           </div>\n           <div class=\"col-md-9 col-xs-9 col-lg-9 col-sm-9 task-text " + (task.isComplete ? 'complete' : '') + "\">\n            " + task.task + "\n          </div>\n          <div class=\"col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area\">\n            <a class=\"\" href=\"/\" onClick=\"toDo.deleteTask(event, " + index + ")\"><span \n            id=\"deleteTask\" data-id=\"" + index + "\" class=\"delete-icon glyphicon \n            glyphicon-trash\"></span></a>\n           </div>\n           <div class=\"col-md-1 col-xs-1 col-lg-1 col-sm-1 edit-icon-area\">\n           <a class=\"\" href=\"/\" onClick=\"toDo.editTask(event, " + index + ")\"><span \n           id=\"deleteTask\" data-id=\"" + index + "\" class=\"edit-icon glyphicon \n           glyphicon-pencil\"></span></a>\n          </div>\n          </div>\n         </li>\n       ";
        }
    }, {
        key: "toggleTaskStatus",
        value: function toggleTaskStatus(index) {
            this.tasks[index].isComplete = !this.tasks[index].isComplete;
            this.loadtasks();
        }
    }, {
        key: "deleteTask",
        value: function deleteTask(event, taskIndex) {
            // console.log(event)
            event.preventDefault();
            this.tasks.splice(taskIndex, 1);
            this.loadtasks();
        }
    }, {
        key: "editTask",
        value: function editTask(event, taskIndex) {
            event.preventDefault();
            var text = prompt("Change the task name");
            this.tasks[taskIndex]["task"] = text;
            console.log(this.tasks[taskIndex]["task"]);
            this.loadtasks();
        }
    }, {
        key: "addTaskClick",
        value: function addTaskClick() {
            var target = document.getElementById("addTask");
            this.addTask(target.value);
            target.value = "";
        }
    }, {
        key: "addTask",
        value: function addTask(task) {
            var newtask = {
                task: task,
                isComplete: false
            };
            var target = document.getElementById("addTask");
            var parentDiv = target.parentElement;
            if (task === "") {
                parentDiv.classList.add("has-error");
                target.setAttribute("placeholder", "Enter some text here");
            } else {
                parentDiv.classList.remove("has-error");
                this.tasks.push(newtask);
                this.loadtasks();
            }
        }
    }, {
        key: "addEventListeners",
        value: function addEventListeners() {
            var _this2 = this;

            document.getElementById('addTask').addEventListener('keypress', function (event) {
                if (event.keyCode === 13) {
                    _this2.addTask(event.target.value);
                    event.target.value = '';
                }
            });
        }
    }]);

    return ToDoClass;
}();

var toDo;

window.addEventListener("load", function () {
    toDo = new ToDoClass();
});
//# sourceMappingURL=scripts.js.map