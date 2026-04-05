<?php
include "db.php";

$name = $_POST['name'];
$address = $_POST['address'];
$service = $_POST['service'];

$sql = "INSERT INTO orders (name, address, service, status)
        VALUES ('$name', '$address', '$service', 'Pending')";

$conn->query($sql);

echo "Order saved";
?>

<?php
include "db.php";

$name = $_POST['name'];
$address = $_POST['address'];
$service = $_POST['service'];

$sql = "INSERT INTO orders (name, address, service, status)
        VALUES ('$name', '$address', '$service', 'Pending')";

if ($conn->query($sql) === TRUE) {
  echo "✅ Order saved successfully";
} else {
  echo "❌ Error: " . $conn->error;
}
?>