function loginAjax(event) {
    //alert("Button clicked!")
    var username = document.getElementById("username").value; // Get the username from the form
    var password = document.getElementById("password").value; // Get the password from the form

    $.post("login_ajax.php", {username: username, password: password}, function(data){
            if(data.success);
            else{
                alert("Unable to log in");
            }
    });
    // Make a URL-encoded string for passing POST data:
    // var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
    //
    // var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    // xmlHttp.open("POST", "login_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    // xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    // xmlHttp.addEventListener("load", function(event) {
    //     var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    //     if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
    //         alert("You've been Logged In!");
    //     } else {
    //         //alert("You were not logged in.  " + jsonData.message);
    //     }
    // }, false); // Bind the callback to the load event
    // xmlHttp.send(dataString); // Send the data
}

function registerAjax(event) {
    //alert("Register Button clicked!")
    var username = document.getElementById("username").value; // Get the username from the form
    var password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "userCreate_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", function(event) {
        var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
        if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
            alert("You've been Logged In!");
        } else {
            alert("You were not logged in.  " + jsonData.message);
        }
    }, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
    $("#username")[0].value = "";
    $("#password")[0].value = "";
}
document.getElementById("register_btn").addEventListener("click", registerAjax, false); //need to add this button to calendar_base
