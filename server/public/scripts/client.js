console.log('JS is working');

$( document ).ready( function(){
    console.log( 'JQ' );
    // Establish Click Listeners
    // setupClickListeners()
    // load existing task on page load
    getTask();
    postTask();
  
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
//       fetchTask();
//     });

//     $(document).on('click', '.updateTaskStatsBtn', updateTaskStatus)

//     $(document).on('click', '.deleteTaskBtn', deleteTask);

//   }
  
  function getTask(){
    console.log( 'in get task' );
    // ajax call to server to get task
    $('#taskTable').empty();
    $.ajax({
        type: 'GET',
        url: '/toDo'
    }).then(function (response) {
        console.log('GET /toDo response', response);
        for (let i = 0; i < response.length; i++) {
            $('#taskTable').append(`
            <tr>
                <td>${response[i].taskName}</td>
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

function postTask(){
  let newTask = {
    taskName: $('#taskName').val(),
    taskCompleted: $('#taskCompleted').val(),
    taskNotes: $('#taskNotes').val()
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

// function updateTaskStatus() {
//   console.log('In task PUT')
//   const taskId = $(this).parents('tr').data('task-id')
//   console.log('Task Id is', taskId)

//   let taskCompleted  = $(this).parents('td').data('taskCompleted');
//   console.log('has task been completed?', taskCompleted);

//   let changeTaskStatus = {
//     taskStatus: taskCompleted
//   }

  
//   $.ajax({
//     url:'/task/' + taskId,
//     method: 'PUT',
//     data: changeTaskStatus
//   })
//   .then(() => {
//     console.log('PUT success');
//     getTask();
//   })
//   .catch((err) => {
//     console.log('There as an error in PUT', err)
//   })

// }

// function deleteTask() {
//   // $(this) === <button>
//   // Find the <tr> that's the parent of the <button>
//   let tr = $(this).parents('tr');
//   let taskId = tr.data('task-id');

//   console.log('in deleteTask()', taskId);

//   // Send a DELETE /task/:id request to the server
//   $.ajax({
//       method: 'DELETE',
//       url: `/task/${taskId}`,  
//   })
//       .then(() => {
//           console.log('DELETE /task succeeded 👍');
//       })
//       .catch((err) => {
//           alert('Failed to delete task. Sorry.');
//           console.log('DELETE /task failed:', err);
//       });
// }

// function deleteTask() {
//   const taskId = $(this).parents('tr').data('task-id');

//   console.log('in deleteTask()', taskId);

//   Swal.fire({
//     title: 'Are you sure you want to delete this task?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//       $.ajax({
//         method: 'DELETE',
//         url: `/task/${taskId}`,       
//       })
//         .then(() => {
//           addTaskBtn()
//             console.log('DELETE /task success');
//         })
//         .catch((err) => {
//             alert('Failed to delete.');
//             console.log('DELETE /task failed:', err);
//         });
//       }
//     });
//   } 