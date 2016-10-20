<?php
session_start();
$destination_username = $_POST['dest'];
$amount = $_POST['amount'];
if($_SESSION['token'] !== $_POST['token']){
	session_destroy();
	die("Request forgery detected");
}
?>
