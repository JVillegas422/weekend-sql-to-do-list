console.log('JS is working');

$( document ).ready( function(){
    console.log( 'JQ' );
    // Establish Click Listeners
    // setupClickListeners()
    // load existing koalas on page load
    addTaskBtn();
  
  }); // end doc ready

// Still working on this
// function setupClickListeners() {
//     $( '#addTaskBtn' ).on( 'click', function(){
//       console.log( 'in addTaskBtn on click' );
//       // get user input and put in an object
//       let taskToAdd = {
//         taskName: $('#taskName').val(),
//         taskCompleted: $('#taskCompleted').val(),
//         taskNotes: $('#taskNotes').val()
//       };
//     }); 
//   }
  
  function addTaskBtn(){
    console.log( 'in add task' );
    // ajax call to server to get koalas
    $('#taskTable').empty();
    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log('GET /task response', response);
        for (let i = 0; i < response.length; i++) {
            $('#taskTable').append(`
            <tr data-task-id="${response[i].id}">
                <td>${response[i].TaskName}</td>
                <td>${response[i].taskCompleted}</td>
                <td>${response[i].taskNotes}</td>
                <td>
                    <button class="deleteTaskBtn">❌</button>
                </td>
            </tr>
          `);
        }
    });
  } // end addTasks

function fetchTask( newTask ){
  console.log( 'in fetchTask', newTask );
  $.ajax({
    type: 'POST',
    url: '/task',
    data: newTask,
  }).then(()=>{
    console.log('POST works');
    addTaskBtn();
  
  }).catch((err) => {
    alert('Failed to add task');
    console.log('POST failed:', err);
  });
  
}

function updateTaskStatus() {
  console.log('In task PUT')
  const taskId = $(this).parents('tr').data('task-id')
  console.log('Task Id is', taskId)

  let taskCompleted  = $(this).parents('td').data('taskCompleted');
  console.log('has task been completed?', taskCompleted);

  let changeTaskStatus = {
    taskStatus: taskCompleted
  }

  
  $.ajax({
    url:'/task/' + taskId,
    method: 'PUT',
    data: changeTaskStatus
  })
  .then(() => {
    console.log('PUT success');
    addTaskBtn();
  })
  .catch((err) => {
    console.log('There as an error in PUT', err)
  })

}

function deleteTask() {
  const taskId = $(this).parents('tr').data('task-id');

  console.log('in deleteTask()', taskId);

  Swal.fire({
    title: 'Are you sure you want to delete this task?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      $.ajax({
        method: 'DELETE',
        url: `/task/${taskId}`,       
      })
        .then(() => {
          addTaskBtn()
            console.log('DELETE /task success');
        })
        .catch((err) => {
            alert('Failed to delete.');
            console.log('DELETE /task failed:', err);
        });
      }
    });
  } 