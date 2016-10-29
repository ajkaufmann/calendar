<?php
// session_unset();
// session_destroy();
// header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
//
// echo json_encode(array(
//         "success" => true
// ));
// exit;
if ($_GET["argument"]=='logOut'){
    if(session_id() == '') {
        session_start();
    }
    session_unset();
    session_destroy();
    // $host  = $_SERVER['HTTP_HOST'];
    // $link = "http://$host/calendar_base.html";
    // echo $link;
    exit;
}
?>
