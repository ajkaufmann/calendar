<?php
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_SESSION['username'];
$event_date = $_POST['thisMonth'];

$stmt = $mysqli->prepare("SELECT * FROM events WHERE user=? AND event_date LIKE ?");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "statement failed, User:".$username.", Date:".$event_date
  ));
  exit;

  exit;
}

$stmt->bind_param('ss', $username, $event_date);

$stmt->execute();

$stmt->bind_result($event_id, $user, $event_name, $event_date, $event_time, $event_description, $recurring);

while($stmt->fetch()){
  echo json_encode(array(
    "eventid" => $event_id,
    "user" => $user,
    "event_name" => $event_name,
    "event_date" => $event_date,
    "event_time" => $event_time,
    "event description" => $event_description,
    "recurring" => $recurring
  ));
}

$stmt->close();

// echo json_encode(array(
//   "success" => true
// ));
exit;

?>
