const taskContainer = document.getElementById('task-container');
const taskForm = document.getElementById('task-form');
const themeToggle = document.getElementById('theme-toggle');

function renderTasks() {
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = task.completed ? 'task-card completed' : 'task-card';

        card.innerHTML = `
            <div class="task-header">
                <!-- Checkbox untuk menandai selesai -->
                <input type="checkbox" onchange="toggleComplete(${task.id})" ${task.completed ? 'checked' : ''}>
                <div class="info">
                    <h3>${task.name}</h3>
                    <div class="task-dates">
                        Mulai: ${task.start} | Deadline: ${task.deadline}
                    </div>
                </div>
            </div>
            <div class="task-desc">
                <p>${task.desc}</p>
            </div>
            <!-- Tombol Edit dan Delete -->
            <div class="action-buttons">
                <button class="btn-edit" onclick="editTask(${task.id})">Edit</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskContainer.appendChild(card);
    });
}

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('task-name').value;
    const start = document.getElementById('start-date').value;
    const deadline = document.getElementById('deadline').value;
    const desc = document.getElementById('task-desc').value;

    const newTask = {
        id: Date.now(),
        name: name,
        start: start,
        deadline: deadline,
        desc: desc,
        completed: false
    };

    tasks.push(newTask);

    renderTasks();
    taskForm.reset();
});

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}
function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
        document.getElementById('task-name').value = taskToEdit.name;
        document.getElementById('start-date').value = taskToEdit.start;
        document.getElementById('deadline').value = taskToEdit.deadline;
        document.getElementById('task-desc').value = taskToEdit.desc;

        deleteTask(id); 
    }
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed; 
        renderTasks();
    }
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode'); 

    if (document.body.classList.contains('light-mode')) {
        themeToggle.textContent = 'Beralih ke Dark Mode';
    } else {
        themeToggle.textContent = 'Beralih ke Light Mode';
    }
});

renderTasks();
