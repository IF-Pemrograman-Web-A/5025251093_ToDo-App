const API_URL = "api.php";
const API_HEADERS = {
    "Content-Type": "application/json",
    "X-API-Key": "todo-key-5025251093"
};

const taskContainer = document.getElementById("task-container");
const taskForm = document.getElementById("task-form");

// 1. GET: Ambil semua task dari REST API
async function loadTasks() {
    try {
        const res = await fetch(API_URL, { headers: API_HEADERS });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        taskContainer.innerHTML = "";
        json.data.forEach(task => {
            const isDone = Number(task.is_completed) === 1;
            const card = document.createElement("div");
            card.className = isDone ? "task-card completed" : "task-card";
            card.setAttribute("role", "listitem");

            card.innerHTML = `
                <div class="task-header">
                    <input type="checkbox" onchange="toggleComplete(${task.id})" ${isDone ? "checked" : ""}>
                    <div class="info">
                        <h3>${task.name}</h3>
                        <div class="task-dates">Mulai: ${task.start_date} | Deadline: ${task.deadline}</div>
                    </div>
                </div>
                <div class="task-desc">
                    <p>${task.description}</p>
                </div>
                <div class="action-buttons">
                    <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskContainer.appendChild(card);
        });
    } catch (err) {
        console.error("Gagal memuat data:", err.message);
    }
}

// 2. POST: Tambah task baru
taskForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const payload = {
        name: document.getElementById("task-name").value,
        start_date: document.getElementById("start-date").value,
        deadline: document.getElementById("deadline").value,
        description: document.getElementById("task-desc").value
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        taskForm.reset();
        loadTasks();
    } else {
        const err = await res.json();
        alert(`Error ${res.status}: ${err.message}`);
    }
});

// 3. PATCH: Toggle status selesai
async function toggleComplete(id) {
    const res = await fetch(`${API_URL}?id=${id}`, {
        method: "PATCH",
        headers: API_HEADERS,
        body: JSON.stringify({})
    });
    if (res.ok) loadTasks();
}

// 4. DELETE: Hapus task
async function deleteTask(id) {
    const res = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
        headers: API_HEADERS
    });
    if (res.ok) loadTasks();
}

// Theme & PWA Logic
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('app-theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = 'Beralih ke Dark Mode';
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? 'Beralih ke Dark Mode' : 'Beralih ke Light Mode';
    localStorage.setItem('app-theme', isLight ? 'light' : 'dark');
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(err => console.error(err));
}

loadTasks();
