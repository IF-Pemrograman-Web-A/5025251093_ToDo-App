<?php
include 'config.php';
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $result = mysqli_query($conn, "SELECT is_completed FROM tasks WHERE id=$id");
    $row = mysqli_fetch_assoc($result);
    $new_status = $row['is_completed'] == 1 ? 0 : 1;
    mysqli_query($conn, "UPDATE tasks SET is_completed=$new_status WHERE id=$id");
}
header("Location: index.php");
exit();
?>
