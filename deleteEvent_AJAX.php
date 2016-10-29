<?php
session_start();
require 'database.php';

// if($_SESSION['token'] != $_POST['token']){
// 	session_destroy();
// 	die("Request forgery detected");
// }

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = $_SESSION['username'];
$id = $_POST['id'];

$stmt = $mysqli->prepare("DELETE FROM events WHERE event_id=? AND user=?");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "Event did not delete."
  ));
  exit;

  exit;
}

$stmt->bind_param('is', $id, $username);

$stmt->execute();

$stmt->close();

echo json_encode(array(
  "success" => true
));
exit;

?>
