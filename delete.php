<?php
include 'config.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    mysqli_query($conn, "DELETE FROM tasks WHERE id=$id");
}
header("Location: index.php");
exit();
?>
