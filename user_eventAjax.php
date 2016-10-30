<?php
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

if(!isset($_SESSION['username'])){
  echo json_encode(array(
    "event_name" => "_no_user"
  ));
  exit;
}



$username = htmlentities($_SESSION['username']);
$event_date = htmlentities($_POST['thisMonth']);
$tag = htmlentities($_POST['tag']);

$stmt = $mysqli->prepare("SELECT * FROM events WHERE user=? AND event_date LIKE ? AND event_descrip LIKE ? ");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "statement failed, User:".$username.", Date:".$event_date
  ));
  exit;
}

$stmt->bind_param('sss', $username, $event_date, $tag);

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
    "tag" => htmlentities($event_description),
    "recurring" => htmlentities($recurring),
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
