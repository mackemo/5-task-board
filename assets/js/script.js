// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

//generates unique id per task
function generateTaskId() {
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return nextId;
};


//create a task card
function createTaskCard(task) {
    addTask.addEventListener('click', function() {
        let taskTitle = document.getElementById('title').value;
        let taskDate = document.getElementById('date').value;
        let taskDescription = document.getElementById('description').value;

        //create object for array storage
        let task = {
            title: taskTitle,
            date: taskDate,
            description: taskDescription
        };


        taskList.push(task);
        localStorage.setItem('tasks', JSON.stringify(taskList));


    })

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
