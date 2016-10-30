<?php
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';

// if($_SESSION['token'] != $_POST['token']){
// 	session_destroy();
// 	die("Request forgery detected");
// }

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

// var_dump($_POST);
// var_dump(isset($other_user));
$username = htmlentities($_SESSION['username']);
$name = htmlentities($_POST['event_name']);
$event_date = htmlentities($_POST['event_date']);
$event_time = htmlentities($_POST['event_time']);
$recurring = htmlentities($_POST['recurring']);
$other_user = htmlentities($_POST['other_user']);
$tags = htmlentities($_POST['tags']);


if(isset($other_user)){
  $stmt = $mysqli->prepare("INSERT INTO events (user, event_name, event_date, event_time, recurring, event_descrip) VALUES (?, ?, ?, ?, ?, ?)");
  if(!$stmt){
    echo json_encode(array(
      "success" => false,
      "message" => "Incorrect Username or Password"
    ));
    exit;

  }
  $stmt->bind_param('ssssss', $other_user, $name, $event_date, $event_time, $recurring, $tags);

  $stmt->execute();

  $stmt->close();
}

$stmt = $mysqli->prepare("INSERT INTO events (user, event_name, event_date, event_time, recurring, event_descrip) VALUES (?, ?, ?, ?, ?, ?)");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "Incorrect Username or Password"
  ));
  exit;

}

$stmt->bind_param('ssssss', $username, $name, $event_date, $event_time, $recurring, $tags);

$stmt->execute();

$stmt->close();

echo json_encode(array(
  "success" => true
));
exit;

?>
