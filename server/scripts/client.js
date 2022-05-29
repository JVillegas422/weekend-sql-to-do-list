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
                    <button class="deleteButton">❌ 🐨 </button>
                </td>
            </tr>
          `);
        }
    });
  } // end addTasks