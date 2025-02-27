<?php
session_start();
session_regenerate_id(true); // Regenerate session ID for security
$conn = new mysqli("localhost", "root", "", "user_auth");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Validate inputs
    if (empty($username) || empty($password)) {
        die("All fields are required.");
    }

    // Prepare statement to prevent SQL Injection
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $db_username, $db_password);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $db_password)) {
            $_SESSION["user_id"] = $id;
            $_SESSION["username"] = htmlspecialchars($db_username, ENT_QUOTES, 'UTF-8'); // Prevent XSS
            header("Location: dashboard.php");
            exit();
        } else {
            die("Incorrect password.");
        }
    } else {
        die("User not found.");
    }
    $stmt->close();
}
$conn->close();
?>

