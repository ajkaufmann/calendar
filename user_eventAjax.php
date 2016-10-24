<?php
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_SESSION['username'];
$event_date = $_POST['thisMonth'];

$stmt = $mysqli->prepare("SELECT * FROM events WHERE user=?");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "Incorrect Username or Password"
  ));
  exit;

  exit;
}
$stmt->bind_result($event_id, $user, $event_name, $event_date, $event_time, $event_description, $recurring);
$myArray = array();
while($stmt->fetch()){
        $myArray[] = {$event_id, $user, $event_name, $event_date, $event_time, $event_description, $recurring};
}
echo json_encode($myArray);
// $stmt->bind_result($event_id, $user, $event_name, $event_date, $event_time, $event_description, $recurring);
// while($stmt->fetch()){
//
//
// }

$stmt->close();

// echo json_encode(array(
//   "success" => true
// ));
// exit;

?>
