<?php
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_SESSION['username'];
$event_date = $_POST['thisMonth'];

<<<<<<< HEAD
$stmt = $mysqli->prepare("SELECT * FROM events WHERE user=?");
=======
$stmt = $mysqli->prepare("SELECT * FROM events WHERE user=? AND event_date LIKE ?");
>>>>>>> 8e93eae3288ea71a0a90d1667cb19934eccdc803
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "statement failed, User:".$username.", Date:".$event_date
  ));
  exit;

  exit;
}
<<<<<<< HEAD
$stmt->bind_result($event_id, $user, $event_name, $event_date, $event_time, $event_description, $recurring);
$myArray = array();
while($stmt->fetch()){
        $myArray[] = {$event_id, $user, $event_name, $event_date, $event_time, $event_description, $recurring};
=======

$stmt->bind_param('ss', $username, $event_date);

$stmt->execute();

// $return_array[];
$stmt->bind_result($event_id, $user, $event_name, $event_date, $event_time, $event_description, $recurring);
$rows = array();
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
>>>>>>> 8e93eae3288ea71a0a90d1667cb19934eccdc803
}

$stmt->close();

// echo json_encode(array(
//   "success" => true
// ));
exit;

?>
