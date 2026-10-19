<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['task_name'];
    $start = $_POST['start_date'];
    $deadline = $_POST['deadline'];
    $desc = $_POST['task_desc'];

    $sql = "INSERT INTO tasks (name, start_date, deadline, description) 
            VALUES ('$name', '$start', '$deadline', '$desc')";
    
    mysqli_query($conn, $sql);
    header("Location: index.php"); // Balik ke halaman awal
    exit();
}
?>
