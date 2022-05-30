console.log('JS is working');

$(document).ready(onReady);

function onReady() {
  console.log('JQ is works');
    // Establish Click Listeners
    // setupClickListeners()
    // load existing task on page load
    $('.addTaskBtn').on('click', getTask);
    // getTask();
    // postTask();
}
  
  function getTask(){
    console.log( 'in get task' );
    // ajax call to server to get task
    $('#taskTableBody').empty();
    $.ajax({
        type: 'GET',
        url: '/toDo'
    }).then(function (response) {
        console.log('GET /toDo response', response);
        for (let i = 0; i < response.length; i++) {
            $('#taskTable').append(`
            <tr data-toDo-id="${response[i].id}">
                <td>${response[i].taskName}</td>
                <td>${response[i].taskCompleted}</td>
                <td>${response[i].taskNotes}</td>
                <td>
                    <button class="addTaskBtn" type="button">Add Task</button>
                    <button class="deleteTaskBtn" type="button">❌</button>
                </td>
            </tr>
          `);
        }
    });
  }

function postTask(){
  let newTask = {
    taskName: taskName,
    taskCompleted: taskCompleted,
    taskNotes: taskNotes
  }

  console.log('in fetchTask');
  $.ajax({
    type: 'POST',
    url: '/toDo',
    data: newTask,
  }).then((response) => {
    console.log('POST works', response);
    getTask();
  
  }).catch((err) => {
    alert('Failed to add task');
    console.log('POST failed:', err);
  });
  
}

function updateTaskStatus() {
  console.log('In task PUT');
  const toDoId = $(this).parents('tr').data('toDo-id')
  console.log('Task Id is', toDoId)

  let taskCompleted  = $(this).parents('td').data('taskCompleted');
  console.log('has task been completed?', taskCompleted);

  let updateTaskStatus = {
    taskStatus: taskCompleted
  }
  
  $.ajax({
    url: `/toDo/${toDoId}`,
    method: 'PUT',
    data: updateTaskStatus
  })
  .then((res) => {
    console.log('PUT success');
    getTask();
  })
  .catch((err) => {
    console.log('There as an error in PUT', err);
  });

}

function deleteTask() {
  // $(this) === <button>
  // Find the <tr> that's the parent of the <button>
  let tr = $(this).parents('tr');
  let taskId = tr.data('task-id');

  console.log('in deleteTask()', taskId);

  // Send a DELETE /task/:id request to the server
  $.ajax({
      method: 'DELETE',
      url: `/toDo/${taskId}`,  
  })
      .then(() => {
          console.log('DELETE /toDo succeeded 👍');
      })
      .catch((err) => {
          alert('Failed to delete task. Sorry.');
          console.log('DELETE /toDo failed:', err);
      });
}
