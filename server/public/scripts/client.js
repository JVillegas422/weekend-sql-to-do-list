console.log('JS is working');

$(document).ready(onReady);

function onReady() {
  console.log('JQ is works');
    // Establish Click Listeners
    // setupClickListeners()
    $('.addTaskBtn').on('click', postTask);
    $(document).on('click', '.deleteTaskBtn', deleteTask);
    $('#taskTableBody').on('click', '.complete-button', updateTaskStatus);
    getTask();
    // postTask();
}
  
  function getTask(){
    console.log( 'in get task' );
    // ajax call to server to get task
    $.ajax({
        type: 'GET',
        url: '/toDo'
    }).then(function (response) {
        console.log('GET /toDo response', response);
        // Moving append data to its own function 
        // for (let i = 0; i < response.length; i++) {
        //     $('#taskTable').append(`
        //     <tr data-toDo-id="${response[i].id}">
        //         <td>${response[i].taskName}</td>
        //         <td>${response[i].taskCompleted}</td>
        //         <td>${response[i].taskNotes}</td>
        //         <td>
        //             <button class="addTaskBtn" type="button">Add Task</button>
        //             <button class="deleteTaskBtn" type="button">❌</button>
        //         </td>
        //     </tr>
        //   `);
        // }
        appendToDoData(response);
    })
    .catch((err) => {
      console.log('Get /toDo failed', err);
      alert('Something went wrong..');

      $('body').html(
        `<h1>Tempprarily unavailable.</h1>`
      );
    });
    console.log('after ajax command');
  }

  // Append data to DOM
function appendToDoData(allItems) {
  //console.log('toDo list is working!');
    $("#taskTableBody").empty();
    for (let item of allItems) {
        const toDoClass = item.taskCompleted ? 'strikethrough' : '';
        const buttonText = item.taskCompleted ? 'Complete' : 'Incomplete';
        // const buttonText = item.taskCompleted ? 'Incomplete' : 'complete';
        $('#taskTableBody').append(`
        <tr class="${toDoClass}">
          <td>${item.taskName}</td>
          <td>${item.taskCompleted}</td>
          <td>${item.taskNotes}</td>
          <td>
              <button class="complete-button" data-id="${item.id}">
                ${buttonText}
              </button>
              <button class="deleteTaskBtn" data-id="${item.id}">
                Delete Task
              </button>
          </td>
        </tr>
      `);
    }
}

function postTask(){
  let newTask = {
    taskName: $('#taskName').val(),
    taskCompleted: $('#taskCompleted').val(),
    taskNotes: $('#taskNotes').val()
  }

  console.log('in postTask');
  $.ajax({
    type: 'POST',
    url: '/toDo',
    data: newTask,
  })
  .then((response) => {
    console.log('POST works', response);
    $('#taskName').val(''),
    $('#taskCompleted').val(''),
    $('#taskNotes').val('')
    getTask();
  
  })
  .catch((err) => {
    alert('Failed to add task');
    console.log('POST failed:', err);
  });
  
}

// Updates if task has been completed
function updateTaskStatus() {
  console.log('In task PUT');
  const itemId = $(this).data('id')
  
  $.ajax({
    method: 'PUT',
    url: `/toDo/${itemId}`,
  })
  .then((response) => {
    console.log('PUT success');
    getTask();
  })
  .catch((err) => {
    console.log('There as an error in PUT', err);
  });

}

function deleteTask() {
  let toDoId = $(this).data("id");
  // let toDoId = tr.data('toDo-id');
  console.log('in deleteTask()', toDoId);
  // Send a DELETE /toDo/:id request to the server
  $.ajax({
      method: 'DELETE',
      url: `/toDo/${toDoId}`
  })
  .then(() => {
      console.log('DELETE /toDo succeeded 👍');
      getTask();
  })
  .catch((err) => {
      alert('Failed to delete task. Sorry.');
      console.log('DELETE /toDo failed:', err);
  });
}
