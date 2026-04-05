<?php
include "db.php";

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "INSERT INTO users (username, password)
        VALUES ('$username', '$password')";

if ($conn->query($sql) === TRUE) {
  echo "Registered successfully";
} else {
  echo "Error";
}
?>