// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

let addTask = document.getElementById('add-button');

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
        let taskDate = dayjs(document.getElementById('date').value).format('MM-DD-YYYY');
        let taskDescription = document.getElementById('description').value;

        //create object for array storage
        let task = {
            title: taskTitle,
            date: taskDate,
            description: taskDescription
        };


        taskList.push(task);
        localStorage.setItem('tasks', JSON.stringify(taskList));

        let card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h4>${taskTitle}</h4>
            <p>${taskDate}</p>
            <p>${taskDescription}</p>
        `;

        // make cards draggable
        $(card).draggable({
            revert: "invalid",
            opacity: 0.5,
            helper: "clone",
            zIndex: 100,
            cursorAt: {top: 25, left: 25}
        });

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            card.remove();
        });
 
        card.appendChild(deleteButton); 

        //clear card input boxes after creating card
        document.getElementById('title').value = '';
        document.getElementById('date').value = '';
        document.getElementById('description').value = '';


        $('#formModal').modal('hide');
        document.getElementById('todo-cards').appendChild(card);
    })

}

//drop cards
function renderTaskList() {
    $(document).ready(function() {
        //dropping cards in every lane
        $("#in-progress-body").droppable({
            drop: function( event, ui ) {
                const droppedCard = ui.draggable;
                $(this).append(droppedCard);  
            }
        });


        $("#done-body").droppable({
            drop: function( event, ui ) {
                const droppedCard = ui.draggable;
                $(this).append(droppedCard);
            }
        });


        $("#todo-body").droppable({
            drop: function( event, ui ) {
                const droppedCard = ui.draggable;
                $(this).append(droppedCard);
            }
        });
    });
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

//calls all functions
$(document).ready(function () {
    generateTaskId();
    createTaskCard();
    renderTaskList();
});
