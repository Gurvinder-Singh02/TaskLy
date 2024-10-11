// script.js

//aray of all tasks
const tasks = document.querySelectorAll('.task');

//array of all catgories where we can drop the task
const categories = document.querySelectorAll('.category');

// dragstart and dragend are for task 
tasks.forEach(task => {
  task.addEventListener('dragstart', dragStart);

  //can coment the below but then multiple drag start will be in que so difficul
  task.addEventListener('dragend', dragEnd);
});

//dragging is prewritten class allow you to change DOM after dragged
function dragStart() {
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
}

//
categories.forEach(category => {

  //This event is fired when an element is being dragged over a valid drop target https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_mouseenter_mouseover#:~:text=mouseenter%20and%20mouseover.-,The%20mouseover%20event%20triggers%20when%20the%20mouse%20pointer%20enters%20the,pointer%20enters%20the%20div%20element.
  category.addEventListener('dragover', dragOver);

  //This event is fired when a dragged item enters a drop target changing the background color or adding a visual cue. 
  category.addEventListener('dragenter', dragEnter);

  // opposite of top (like changing the background back to its original color ( drag-over class ).
  category.addEventListener('dragleave', dragLeave);

  //Handles the logic for what happens when the drop occurs, such as moving the task to the new category.
  category.addEventListener('drop', drop);
});

function dragOver(e) {
  //Enables the drop operation by preventing the default handling of the element
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('drag-over');
}

function dragLeave() {
  this.classList.remove('drag-over');
}

function drop() {

  this.classList.remove('drag-over');
  
  //this mean current category 
  console.log('this is ',this)

  // draggind Element has the current element 
  const draggingTask = document.querySelector('.dragging');
  this.appendChild(draggingTask);
}
