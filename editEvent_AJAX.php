<?php
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_SESSION['username'];
$name = $_POST['name'];
$event_date = $_POST['event_date'];
$event_time = $_POST['event_time'];
$recurring = $_POST['recurring'];
$id = $_POST['id'];

$stmt = $mysqli->prepare("UPDATE events SET event_name=?, event_date=?, event_time=?, recurring=? WHERE event_id=? AND user=?");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "Incorrect Username or Password"
  ));
  exit;
}

$stmt->bind_param('ssssis',$name, $event_date, $event_time, $recurring, $id, $username);

$stmt->execute();

$stmt->close();

echo json_encode(array(
  "success" => true
));
exit;

?>
