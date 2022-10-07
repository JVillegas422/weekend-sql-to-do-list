console.log('JS is working!');

$(document).ready(onReady);

function onReady() {
    console.log('in JQ!');
    // Add click listeners here 👇
    $('#addButton').on('click', postTask);
    $('#showTasks').on('click', '.deleteBtn', deleteTask);

    getTask();

};

// Calls server to get tasks & render to DOM
function getTask() {
    console.log('in GET task');

    $.ajax({
        method: 'GET',
        url: '/tasksToDo'
    })
      .then((response) => {
        console.log('in ajax GET .then');
        renderTask(response);
      })
      .catch((err) => {
        console.log('Something went wrong in GET', err);
      });
};

// Adds task to database
function postTask() {
    console.log('in POST task');

    let newTask = {
        taskName: $('#taskNameIn').val(),
        taskNotes: $('#taskNotesIn').val(),
        taskIsComplete: $('#taskIsCompleteIn').val()
    };
    console.log('newTask', newTask);

    $.ajax({
        method: 'POST',
        url: '/tasksToDo',
        data: newTask,
    })
      .then((response) => {
        console.log('in ajax POST .then', response);
        getTask();
      })
      .catch((err) => {
        console.log('Something went wrong in POST', err);
      });
};

// Displays array of tasks to DOM
function renderTask(newTask) {
    console.log('in appendTask!');

    $('#showTasks').empty();
    for (let task of newTask) {
        $('#showTasks').append(`
            <tr>
                <td>${task.taskName}</td>
                <td>${task.taskNotes}</td>
                <td>${task.taskIsComplete}</td>
                <td>
                    <button class="taskCompleteBtn" data-id="${task.id}">
                        Task Complete ✅
                    </button>
                </td>

            </tr>
        `);
    };
};

// Removes specific task from list
function deleteTask() {
    console.log('in deleteTask!');

    let taskId = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: `/tasksToDo/${taskId}`,
    })
      .then((response) => {
        console.log('Task deleted!');
        getTask();
      })
      .catch((err) => {
        console.log('Error with delete task', err);
      });
};

// Updates specific task once completed 
// function updateTask() {
//     console.log('in updateTask!');

// };

                // <td>
                //     <button class="deleteBtn" 
                //     data-id=${task.id} data-taskName="${task.taskName}" data-taskNotes="${task.taskNotes}">
                //         Task Complete ✅
                //     </button>
                // </td>