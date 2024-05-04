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
    let card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.date}</p>
        <p>${task.description}</p>
    `;

    card.setAttribute('data-task-id', task.id);

    let now = dayjs();
    if (now.isSame(task.date, "day")) {
        card.classList.add("yellow");
    } else if (now.isBefore(task.date, "day")) {
        card.classList.add("white");
    } else {
        card.classList.add("red");
    };



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

        const index = taskList.findIndex(item => item.id === task.id);
        if (index !== -1) {
            taskList.splice(index, 1);
            //remove task from local storage
            localStorage.setItem('tasks', JSON.stringify(taskList));
        }
    });
 
    card.appendChild(deleteButton);

    return card;
};


//handle add task
function handleAddTask() {
    let taskTitle = document.getElementById('title').value;
    let taskDate = dayjs(document.getElementById('date').value).format('MM-DD-YYYY');
    let taskDescription = document.getElementById('description').value;

    //create object for array storage
    let task = {
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
        id: generateTaskId(),
        status: 'to-do'
    };

    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
   

    //clear card input boxes after creating card
    document.getElementById('title').value = '';
    document.getElementById('date').value = '';
    document.getElementById('description').value = '';


    $('#formModal').modal('hide');
     
    renderTaskList();
};


//rendering cards from localstorage and in proper lanes
function renderTaskList() {

    const todoLane =  document.getElementById('todo-body');
    const progressLane = document.getElementById('in-progress-body');
    const doneLane = document.getElementById('done-body');


    todoLane.textContent = '';
    progressLane.textContent = '';
    doneLane.textContent = '';


   for (let i = 0; i < taskList.length; i++) {
    const taskItem = taskList[i];
    const card = createTaskCard(taskItem);
   
        if (taskItem.status === 'to-do') {
            todoLane.appendChild(card);
        }  else if (taskItem.status === 'in-progress') {
            progressLane.appendChild(card);
        } else {
            //change colors for done cards
            card.classList.remove("yellow", "red");
            card.classList.add("white");
            doneLane.appendChild(card);
        }
   };
};



//makes cards droppable
function handleDrop(event, ui) {
    event.preventDefault();
    
    //find lane id from dropped card
    const droppedLaneId = event.target.id;
    
    //determine status of card after dropping
    let newStatus;
    if (droppedLaneId === 'to-do') {
        newStatus = 'to-do'
    } else if (droppedLaneId === 'in-progress') {
        newStatus= 'in-progress'
    } else {
        newStatus = 'done'
    }
    
    //find card id from dropped card
    const droppedCardId = parseInt(ui.draggable[0].dataset.taskId);
    
    //update status of dropped card
    const taskIndex = taskList.findIndex(task => task.id === droppedCardId);
    if (taskIndex !== -1) {
        if (newStatus !== 'done' || taskList[taskIndex].status !== 'done') {
            taskList[taskIndex].status = newStatus;
            localStorage.setItem('tasks', JSON.stringify(taskList));
        }
    }

    //get dropped lane
    const droppedLane = event.target;

    //keep dropped card in lane body
    $(droppedLane).find('.card-body').prepend(ui.draggable[0]);

    //if dropped in done lane, change colors
    if (newStatus === 'done') {
        ui.draggable[0].classList.remove("yellow", "red");
        ui.draggable[0].classList.add("white");
    }

};



//handles adding tasks and dropping in lanes
$(document).ready(function () {
    $(".lane").droppable({
        drop: handleDrop
    });

    $("#date").datepicker()
    renderTaskList();
    addTask.addEventListener('click', handleAddTask)
});