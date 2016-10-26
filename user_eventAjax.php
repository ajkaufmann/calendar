<?php
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

if(!isset($_SESSION['username'])){
  echo json_encode(array(
    "event_name" => "_no_user"
  ));
  exit;
}

$username = $_SESSION['username'];
$event_date = $_POST['thisMonth'];

$stmt = $mysqli->prepare("SELECT * FROM events WHERE user=? AND event_date LIKE ?");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "statement failed, User:".$username.", Date:".$event_date
  ));
  exit;
}

$stmt->bind_param('ss', $username, $event_date);

$stmt->execute();

$stmt->bind_result($event_id, $user, $event_name, $event_date, $event_time, $event_description, $recurring);
$rows = array();
while($stmt->fetch()){
  $row = array(
    "eventid" => $event_id,
    "user" => $user,
    "event_name" => $event_name,
    "event_date" => $event_date,
    "event_time" => $event_time,
    "event_description" => $event_description,
    "recurring" => $recurring
  );
  array_push($rows,$row);
}

$stmt->close();

// echo json_encode(array(
//   "success" => true
// ));
echo json_encode($rows);
exit;

?>
