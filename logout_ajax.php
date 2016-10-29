<?php
session_unset();
session_destroy();
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

echo json_encode(array(
        "success" => true
));
exit;

?>
