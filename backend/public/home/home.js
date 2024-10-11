const fetchUserData = async () => {
    // Get the token from local storage or wherever you are storing it
    const token = localStorage.getItem('token'); // Ensure you have set this token during sign-in

    // alert(token)

    if (!token) {
        window.location.href = "/sinnnnup";
        return;
    }

    try {
        const response = await axios.get('https://taskly-6y3t.onrender.com/api/v1/todos/all', {
            headers: {
                token: localStorage.getItem("token")
                // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDQxMzljMzZjYmMyZjUxZTViOGViNiIsImlhdCI6MTcyODY3ODEwNn0.cA1um1XLeuNglBfHGfsZDYpCeNENK8S_crC_60gCCYo"
            }
        });

        const todos = response.data.todos;
        const user = response.data.user;

        console.log(response)

        renderTodos(todos);

        greetUser(response.data.user, todos.length);


    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};


const greetUser = (user, taskCount) => {
    // Get the elements for the greeting section
    const greetDiv = document.getElementById('greet');
    const userNameElement = greetDiv.querySelector('h1');
    const taskCountElement = greetDiv.querySelector('h5');
    const countElement = greetDiv.querySelector('.count');

    // Update the user name and task count
    userNameElement.innerHTML = `Hey ${user.firstName || 'User'} 😃`;
    taskCountElement.innerHTML = `Just ${taskCount} More task${taskCount !== 1 ? 's' : ''} to complete 🥳`;
    countElement.innerHTML = taskCount; // Update the number of tasks
};

const renderTodos = (todos) => {
    const taskContainer = document.getElementById('tasks');

    // taskContainer.innerHTML =''

    todos.forEach(todo => {

        const taskDiv = document.createElement('div');

        taskDiv.classList.add('task');

        // Populate task content using todo data
        taskDiv.innerHTML = `
            <h3>${todo.title || 'Task Title'}</h3>
            <h5>${todo.description || ' No description'}</h5>
            <div class="metrics">
                <div class="left">
                    <img src="../src/task/watch.svg" alt="">
                    <p class="time">${new Date(todo.createdAt).toLocaleDateString() || 'Due Date'}</p>
                </div>
                <div class="badge">
                    <div class="circle ${todo.status === 'In Progress' ? 'in-progress' : ''}"></div>
                    <p>${todo.status || 'Status'}</p>
                </div>
                <p>${getTimeAgo(new Date(todo.updatedAt)) || 'Time Ago'}</p>
            </div>
            <div class="priority">
                <p>${todo.priority || 'Priority'}</p>
                <img src="../src/task/${todo.priority}.svg" alt="">
            </div>
        `;

        // Append the created task div to the parent container
        taskContainer.appendChild(taskDiv);
    });
};

// Utility function to get relative time (e.g. "1 Hr ago")
const getTimeAgo = (date) => {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);

    if (hoursAgo > 0) {
        return `${hoursAgo} Hr${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (minutesAgo > 0) {
        return `${minutesAgo} Min${minutesAgo > 1 ? 's' : ''} ago`;
    } else {
        return `${secondsAgo} Sec${secondsAgo > 1 ? 's' : ''} ago`;
    }
};


// Call the fetchUserData when window loads

// add button 
const addbtn = document.getElementById('add-btn')

addbtn.addEventListener('click', () => {

    document.getElementById('task-form').style.display = 'flex'

})
// add button 
const clearbtn = document.getElementById('clear-btn')

clearbtn.addEventListener('click', () => {

    document.getElementById('task-form').style.display = 'none'

})




// 

document.getElementById('task-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get the form data
    const taskTitle = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value; // Assuming cohort input is the description
    const priority = document.getElementById('priority').value;

    // Create the request body object
    const taskData = {
        title: taskTitle,
        descriptionn: description, // Note the spelling 'descriptionn'
        priorty: priority // Note the spelling 'priorty'
    };

    console.log(taskData)

    try {

        const response = await axios.post('https://taskly-6y3t.onrender.com/api/v1/todos/', taskData, {
            headers: {
                token: localStorage.getItem('token')
            }
        });

        // Check if the request was successful
        if (response.ok) {
            const data = await response.json();
            console.log('Task created successfully:', data);

            fetchUserData()

        } else {
            console.error('Error creating task:', response.statusText);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
});

window.onload = fetchUserData;

