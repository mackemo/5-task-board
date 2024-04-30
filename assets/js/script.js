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
            <h4>${taskTitle}</h4>
            <p>${taskDate}</p>
            <p>${taskDescription}</p>
        `;
       
        //change colors of cards based on due date
        let now = dayjs();
        if (now.isSame(taskDate, "day")) {
            card.classList.add("yellow");
        } else if (now.isBefore(taskDate, "day")) {
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
        });
 
        card.appendChild(deleteButton);


        




        
    


}

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


                // remove card color
                droppedCard.removeClass("yellow red");


                // add white color
                droppedCard.addClass("white");


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


//calls all functions
$(document).ready(function () {
    generateTaskId();
    createTaskCard();
    renderTaskList();
});





