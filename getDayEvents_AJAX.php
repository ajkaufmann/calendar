<?php
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$day = htmlentities($_POST['day']);
$username = htmlentities($_SESSION['username']);

$stmt = $mysqli->prepare("SELECT * FROM events WHERE event_date=? AND user=? ORDER BY event_time");
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
    "eventid" => htmlentities($event_id),
    "user" => htmlentities($user),
    "event_name" => htmlentities($event_name),
    "event_date" => htmlentities($event_date),
    "event_time" => htmlentities($event_time),
    "event_description" => htmlentities($event_description),
    "recurring" => htmlentities($recurring)
  );
  // $safe_row = addslashes($row);
  // array_push($rows,$safe_row);
  array_push($rows,$row);
}

$stmt->close();

// echo json_encode(array(
//   "success" => true
// ));
echo json_encode($rows);
exit;

?>
