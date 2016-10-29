<?php
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$day = $_POST['day'];
$username = $_SESSION['username'];

$stmt = $mysqli->prepare("SELECT * FROM events WHERE event_date=? AND user=?");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "statement failed, User:".$username.", Date:".$event_date
  ));
  exit;
}

$stmt->bind_param('ss', $day, $username);

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
