<?php
session_start();
require 'database.php';

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

$username = htmlentities($_POST['username']);
$userpass = htmlentities($_POST['password']);

$userpassCryped = crypt($userpass);

$stmt = $mysqli->prepare("INSERT INTO userData (username, cryptPassword) VALUES (?, ?)");
if(!$stmt){
  echo json_encode(array(
    "success" => false,
    "message" => "Error creating account, please try again."
  ));
  exit;
}

$stmt->bind_param('ss', $username, $userpassCryped);

$stmt->execute();

$stmt->close();

$_SESSION['username'] = $_SESSION['newUserName'];

echo json_encode(array(
  "success" => true
));
exit;

?>
