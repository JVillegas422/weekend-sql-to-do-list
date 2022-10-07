console.log('JS is working!');

$(document).ready(onReady);

function onReady() {
    console.log('in JQ!');
    // Add click listeners here 👇
    $('#addButton').on('click', postTask);

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
        console.log('in ajax GET .then', response);
        renderTask();
      })
      .catch((err) => {
        console.log('Something went wrong in GET', err);
      });
};

// Adds task to database
function postTask() {
    console.log('in POST task');

    $.ajax({
        method: 'POST',
        url: '/tasksToDo'
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
function renderTask() {
    console.log('in appendTask!');

};

// Removes specific task from list
function deleteTask() {
    console.log('in deleteTask!');

};

// Updates specific task once completed 
function updateTask() {
    console.log('in updateTask!');

};