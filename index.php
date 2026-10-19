<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Todo List Gweh</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>[My Todo List Gweh]</h1>
        <button id="theme-toggle" class="btn-theme" aria-label="Ganti tema warna">Beralih ke Light Mode</button>
    </header>

    <div class="layout-wrapper">
        <main class="task-board" aria-labelledby="board-title">
            <h2 id="board-title">Active List</h2>
            
            <!-- WADAH TUGAS: Sekarang dicetak langsung dari Database MySQL -->
            <div id="task-container" role="list">
                <?php
                $result = mysqli_query($conn, "SELECT * FROM tasks");
                while ($row = mysqli_fetch_assoc($result)) {
                    $completed_class = $row['is_completed'] ? 'completed' : '';
                    $checked = $row['is_completed'] ? 'checked' : '';
                    
                    echo "
                    <div class='task-card $completed_class' role='listitem'>
                        <div class='task-header'>
                            <!-- Checkbox melempar ID ke update.php -->
                            <input type='checkbox' onchange=\"window.location.href='update.php?id={$row['id']}'\" $checked>
                            <div class='info'>
                                <h3>{$row['name']}</h3>
                                <div class='task-dates'>Mulai: {$row['start_date']} | Deadline: {$row['deadline']}</div>
                            </div>
                        </div>
                        <div class='task-desc'>
                            <p>{$row['description']}</p>
                        </div>
                        <div class='action-buttons'>
                            <!-- Tombol Delete melempar ID ke delete.php -->
                            <a href='delete.php?id={$row['id']}' class='btn-delete' style='text-decoration:none; padding: 0.4rem 0.8rem; background:#ef4444; border-radius:4px; color:white;'>Delete</a>
                        </div>
                    </div>";
                }
                ?>
            </div>
            
        </main>

        <aside class="control-panel" aria-labelledby="form-title">
            <section class="add-task">
                <h2 id="form-title">Deploy New Task</h2>
                
                <!-- FORM: Action diarahkan ke create.php -->
                <form id="task-form" action="create.php" method="POST">
                    <div class="input-group">
                        <label for="task-name">Task Name</label>
                        <!-- Tambah atribut name="task_name" -->
                        <input type="text" id="task-name" name="task_name" placeholder="Nama tugas..." required>
                    </div>
                    <div class="input-group split">
                        <div>
                            <label for="start-date">Start Date</label>
                            <input type="date" id="start-date" name="start_date" required>
                        </div>
                        <div>
                            <label for="deadline">Deadline</label>
                            <input type="date" id="deadline" name="deadline" required>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="task-desc">Description</label>
                        <textarea id="task-desc" name="task_desc" placeholder="Detail operasional..." rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn-execute" aria-label="Tambah tugas baru">Add Task</button>
                </form>
                
            </section>
        </aside>
    </div>

    <footer>
        <p>&copy; 2026 IF Pemrograman Web - Muhammad Hanif Musyafa (5025251093)</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
