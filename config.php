<?php
$server = "localhost";
$user = "root";
$password = ""; // Kosongkan kalau pakai XAMPP bawaan
$database = "todo_db";

$conn = mysqli_connect($server, $user, $password, $database);
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
