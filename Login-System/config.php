<?php
$servername = "localhost";
$username = "root"; // Default for XAMPP
$password = ""; // Default is empty in XAMPP
$database = "user_auth"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
