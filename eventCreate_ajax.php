<?php
session_start();
require 'database.php';

// if($_SESSION['token'] != $_POST['token']){
// 	session_destroy();
// 	die("Request forgery detected");
// }

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_SESSION['username'];
$name = $_POST['event_name'];
$event_date = $_POST['event_date'];
$event_time = $_POST['event_time'];
$recurring = $_POST['recurring'];
$other_user = $_POST['other_user'];


$stmt = $mysqli->prepare("INSERT INTO events (user, event_name, event_date, event_time, recurring) VALUES (?, ?, ?, ?, ?)");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "Incorrect Username or Password"
  ));
  exit;

  exit;
}

$stmt->bind_param('sssss', $username, $name, $event_date, $event_time, $recurring);

$stmt->execute();

$stmt->close();

echo json_encode(array(
  "success" => true
));
exit;

?>
