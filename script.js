if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log("Service Worker Terdaftar!"))
    .catch(err => console.error("SW Gagal:", err));
}

// Minta izin kirim notifikasi ke user
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('app-theme');

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = 'Beralih ke Dark Mode';
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode'); 
    
    if (document.body.classList.contains('light-mode')) {
        themeToggle.textContent = 'Beralih ke Dark Mode';
        localStorage.setItem('app-theme', 'light');
    } else {
        themeToggle.textContent = 'Beralih ke Light Mode';
        localStorage.setItem('app-theme', 'dark');
    }
});

let db;
const request = indexedDB.open("TodoDatabase", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    // Bikin tabel (object store) bernama 'tasks' dengan kunci utama 'id'
    if (!db.objectStoreNames.contains('tasks')) {
        db.createObjectStore('tasks', { keyPath: 'id' });
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    loadTasks(); // Load data saat web dibuka
    startNotificationChecker(); // Mulai pemantau alarm
};

request.onerror = function(event) {
    console.error("Error membuka IndexedDB", event);
};

const taskContainer = document.getElementById('task-container');
const taskForm = document.getElementById('task-form');
let activeTasks = []; // Cache lokal

function loadTasks() {
    const transaction = db.transaction(['tasks'], 'readonly');
    const store = transaction.objectStore('tasks');
    const request = store.getAll();

    request.onsuccess = function() {
        activeTasks = request.result;
        renderTasks();
    };
}

function renderTasks() {
    taskContainer.innerHTML = ''; 
    activeTasks.forEach(task => {
        const card = document.createElement('div');
        card.className = task.completed ? 'task-card completed' : 'task-card';
        card.setAttribute('role', 'listitem'); // Aksesibilitas

        // Render gambar jika ada
        const imageHTML = task.image ? `<img src="${task.image}" class="task-image-preview" alt="Lampiran visual tugas">` : '';

        card.innerHTML = `
            <div class="task-header">
                <input type="checkbox" aria-label="Tandai selesai" onchange="toggleComplete(${task.id})" ${task.completed ? 'checked' : ''}>
                <div class="info">
                    <h3>${task.name}</h3>
                    <div class="task-dates">Mulai: ${task.start} | Deadline: ${task.deadline}</div>
                    ${task.notifTime ? `<div class="task-dates" style="color: #f59e0b;">🔔 Alarm: ${new Date(task.notifTime).toLocaleString()}</div>` : ''}
                </div>
            </div>
            <div class="task-desc">
                <p>${task.desc}</p>
                ${imageHTML}
            </div>
            <div class="action-buttons">
                <button class="btn-delete" aria-label="Hapus tugas" onclick="deleteTask(${task.id})">Delete</button>
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
    const notifTime = document.getElementById('notif-time').value;
    const desc = document.getElementById('task-desc').value;
    const imageFile = document.getElementById('task-image').files[0];

    const saveToDB = (imageBase64) => {
        const newTask = {
            id: Date.now(),
            name: name,
            start: start,
            deadline: deadline,
            notifTime: notifTime,
            desc: desc,
            image: imageBase64,
            completed: false,
            notified: false // Tanda kalau alarm belum bunyi
        };

        const transaction = db.transaction(['tasks'], 'readwrite');
        const store = transaction.objectStore('tasks');
        store.add(newTask);

        transaction.oncomplete = () => {
            loadTasks();
            taskForm.reset();
        };
    };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => saveToDB(e.target.result);
        reader.readAsDataURL(imageFile);
    } else {
        saveToDB(null);
    }
});

function deleteTask(id) {
    const transaction = db.transaction(['tasks'], 'readwrite');
    transaction.objectStore('tasks').delete(id);
    transaction.oncomplete = () => loadTasks();
}

function toggleComplete(id) {
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');
    const req = store.get(id);

    req.onsuccess = function() {
        const task = req.result;
        task.completed = !task.completed;
        store.put(task);
        transaction.oncomplete = () => loadTasks();
    };
}

function startNotificationChecker() {
    setInterval(() => {
        const now = new Date().getTime();
        
        activeTasks.forEach(task => {
            if (task.notifTime && !task.completed && !task.notified) {
                const alarmTime = new Date(task.notifTime).getTime();
                
                if (now >= alarmTime) {
                    // Panggil Service Worker untuk memunculkan notif
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification("Todo List Reminder!", {
                            body: `Waktunya ngerjain: ${task.name}`,
                            icon: task.image || null
                        });
                    });

                    task.notified = true;
                    const transaction = db.transaction(['tasks'], 'readwrite');
                    transaction.objectStore('tasks').put(task);
                }
            }
        });
    }, 10000); // Cek setiap 10 detik
}
