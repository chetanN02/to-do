class ToDoClass {
    constructor(){
        this.tasks = JSON.parse(localStorage.getItem("TASKS"))
        if(!this.tasks){
            this.tasks = [
            ];
        }
        this.addEventListeners()
        this.loadtasks()
        console.log("This is a debugger")
    }

    loadtasks()
    {
        //ES5 syntax
        // let tasksHtml = (this.tasks).reduce(function(html, task, index) { 
        //     return html += this.generateTaskHtml(task, index)   // the this here refers to the todo object and we have to explicitly bind it with this.
        //   }.bind(this), '');   

        //ES6 syntax
        let tasksHtml = this.tasks.reduce((html,task,index)=>html += this.generateTaskHtml(task,index),'');
        document.getElementById('taskList').innerHTML = tasksHtml;
        localStorage.setItem("TASKS",JSON.stringify(this.tasks))
    }

    generateTaskHtml(task, index) {
        return `
         <li class="list-group-item checkbox">
          <div class="row">
           <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
            <label><input id="toggleTaskStatus" type="checkbox"  
            onchange = "toDo.toggleTaskStatus(${index})";" value="" class="" 
            ${task.isComplete?'checked':''}></label>
           </div>
           <div class="col-md-9 col-xs-9 col-lg-9 col-sm-9 task-text ${task.isComplete?'complete':''}">
            ${task.task}
          </div>
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
            <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><span 
            id="deleteTask" data-id="${index}" class="delete-icon glyphicon 
            glyphicon-trash"></span></a>
           </div>
           <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 edit-icon-area">
           <a class="" href="/" onClick="toDo.editTask(event, ${index})"><span 
           id="deleteTask" data-id="${index}" class="edit-icon glyphicon 
           glyphicon-pencil"></span></a>
          </div>
          </div>
         </li>
       `;
    }

    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadtasks();
    }

    deleteTask(event, taskIndex) {
        // console.log(event)
        event.preventDefault();
        this.tasks.splice(taskIndex,1);
        this.loadtasks();
    }

    editTask(event,taskIndex) {
        event.preventDefault();
        let text = prompt("Change the task name")
        this.tasks[taskIndex]["task"] = text
        console.log((this.tasks[taskIndex])["task"])
        this.loadtasks()
    }

    addTaskClick() {
        let target = document.getElementById("addTask")
        this.addTask(target.value);
        target.value = "";
    }

    addTask(task) {
        let newtask = {
            task,
            isComplete:false
        };
        let target = document.getElementById("addTask")
        let parentDiv = target.parentElement;
        if(task==="")
        {
            parentDiv.classList.add("has-error")
            target.setAttribute("placeholder","Enter some text here");
        }
        else{
            parentDiv.classList.remove("has-error")
            this.tasks.push(newtask)
            this.loadtasks()
        }
    }

    addEventListeners(){
        document.getElementById('addTask').addEventListener('keypress', event => {
            if(event.keyCode === 13) {
              this.addTask(event.target.value);
              event.target.value = '';
            }
          });
    }
    
  }

var toDo;

window.addEventListener("load",function(){
    toDo = new ToDoClass();
})