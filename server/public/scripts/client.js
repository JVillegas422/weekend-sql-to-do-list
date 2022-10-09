console.log('JS is working!');

$(document).ready(onReady);

function onReady() {
    console.log('in JQ!');
    // Add click listeners here 👇
    $('#addButton').on('click', postTask);
    $('#showTasks').on('click', '.deleteBtn', deleteTask);
    $('#showTasks').on('click', '.taskCompleteBtn', updateTask);

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
        taskIsComplete: false
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
        const tasksToDoClass = task.taskIsComplete ? 'strikethrough' : '';
        const buttonText = task.taskIsComplete ? 'Completed' : 'Not Complete';

        const checkClass = task.taskIsComplete ? 'checkClass' : '';
        const checkText = task.taskIsComplete ? '' : '';
        
        $('#showTasks').append(`
            <tr class="${tasksToDoClass}">
                <td>${task.taskName}</td>
                <td>${task.taskNotes}</td>
                <td class="${checkClass}">
                    <label label class="container">
                    <input class="taskCompleteBtn" ${checkText} data-id="${task.id}" type="checkbox" />
                     ${buttonText}
                    <span class="checkmark"></span>
                    </label>
                </td>
                <td>
                    <button class="deleteBtn" data-id=${task.id}>
                         ☠️
                    </button>
                </td>
            </tr>
        `);
    };
    $('#taskNameIn').val(''),
    $('#taskNotesIn').val(''),
    $('#taskIsCompleteIn').val('')
};

// Removes specific task from list
function deleteTask() {
    let taskId = $(this).data('id');

    //Sweet alert to verify you want to delete said tasks
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal(
            "Poof! Your task has been deleted!", {
                icon: "success",
        })
          //Sends a DELETE request to server to delete the task from DB
        $.ajax({
            url: `/tasksToDo/${taskId}`,
            method: 'DELETE',
        })
          .then(() => {
            console.log('DELETE task successful');
            getTask()
          })
          .catch((err) => {
            console.log(`DELETE tasks failed ${err}`)
            alert('Unable to Delete Task at this time')
          })
        }
        else {
            swal('Your task has been saved')
        }
    });
}


// Updates specific task once completed 
function updateTask() {
    console.log('in updateTask!');

    let taskId = $(this).data('id');

    $.ajax({
        method: 'PUT',
        url: `/tasksToDo/${taskId}`,
    })
      .then((response) => {
        console.log('Task updated!');
        getTask();
      })
      .catch((err) => {
        console.log('Error with updating task', err);
      });
};


// Testing a different checkbox
/* <td>
    <div class="switch_box box_4">
        <div class="input_wrapper">
            <input type="checkbox" class="switch_4"/>
            <svg class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
                <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
            </svg>
            <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
                <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
            </svg>
        </div>
    </div>
</td> */
