// Task list array
let tasks = [];
let editIndex = null;

// Get elements from DOM
const taskInput = document.getElementById('task-input');
const taskDateTime = document.getElementById('task-datetime');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const editModal = document.getElementById('edit-modal');
const editTaskInput = document.getElementById('edit-task-input');
const editTaskDateTime = document.getElementById('edit-task-datetime');
const saveTaskButton = document.getElementById('save-task-button');
const closeModal = document.querySelector('.close');

// Event listeners
addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);
closeModal.addEventListener('click', () => editModal.style.display = 'none');
saveTaskButton.addEventListener('click', saveTaskChanges);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = taskDateTime.value;
    
    if (taskText === '' || dueDate === '') {
        alert('Please enter a task and a due date.');
        return;
    }

    const task = {
        text: taskText,
        completed: false,
        dueDate: new Date(dueDate),
    };

    tasks.push(task);
    taskInput.value = '';
    taskDateTime.value = '';
    displayTasks();
}

// Function to display tasks
function displayTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        
        const dateFormatted = new Date(task.dueDate).toLocaleString();
        
        li.innerHTML = `
            <span>${task.text} (Due: ${dateFormatted})</span>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}

// Function to handle task actions (complete, edit, delete)
function handleTaskActions(event) {
    const target = event.target;
    const taskItem = target.closest('.task-item');
    const taskIndex = Array.from(taskList.children).indexOf(taskItem);
    
    if (target.classList.contains('complete-btn')) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        displayTasks();
    } else if (target.classList.contains('edit-btn')) {
        editIndex = taskIndex;
        editTaskInput.value = tasks[taskIndex].text;
        editTaskDateTime.value = new Date(tasks[taskIndex].dueDate).toISOString().slice(0, 16);
        editModal.style.display = 'flex';
    } else if (target.classList.contains('delete-btn')) {
        tasks.splice(taskIndex, 1);
        displayTasks();
    }
}

// Function to save changes to a task
function saveTaskChanges() {
    const newTaskText = editTaskInput.value.trim();
    const newDueDate = editTaskDateTime.value;
    
    if (newTaskText === '' || newDueDate === '') {
        alert('Please enter a valid task and due date.');
        return;
    }

    tasks[editIndex].text = newTaskText;
    tasks[editIndex].dueDate = new Date(newDueDate);
    displayTasks();
    editModal.style.display = 'none';
}
