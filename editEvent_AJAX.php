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
        var_dump($_SESSION);
        var_dump($_POST);
	die("Request forgery detected");
}

$username = htmlentities($_SESSION['username']);
$name = htmlentities($_POST['name']);
$event_date = htmlentities($_POST['event_date']);
$event_time = htmlentities($_POST['event_time']);
$recurring = htmlentities($_POST['recurring']);
$id = htmlentities($_POST['id']);

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
