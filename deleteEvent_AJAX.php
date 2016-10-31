<?php
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

//check that user is logged in
if(!isset($_SESSION['username'])){
  die("You must be logged in to edit events");
}

//check legit request
if(!($_SESSION['token'] == $_POST['tokenA'])){
	die("Request forgery detected");
}

$username = htmlentities($_SESSION['username']);
$id = htmlentities($_POST['id']);

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
