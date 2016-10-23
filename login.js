function loginAjax(event) {
    alert("Button clicked!")
    var username = document.getElementById("username").value; // Get the username from the form
    var password = document.getElementById("password").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "login_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
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
}

function registerAjax(event) {
    alert("Register Button clicked!")
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
}

function makeEventAjax(event) {
    alert("event Button clicked!")
    var event_name = document.getElementById("event_name").value;
    var event_date = document.getElementById("event_date").value;
    var event_time = document.getElementById("event_time").value;
    var recurring = document.getElementById("recurring").value;
 
    // Make a URL-encoded string for passing POST data:
    var dataString =
        "event_name=" + encodeURIComponent(event_name) +
        "&event_date=" + encodeURIComponent(event_date) +
        "&event_time=" + encodeURIComponent(event_time) +
        "&recurring=" + encodeURIComponent(recurring);

    var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
    xmlHttp.open("POST", "eventCreate_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
    xmlHttp.addEventListener("load", function(event) {
        var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
        if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
            alert("Event made!");
        } else {
            alert("Event not made: ");
        }
    }, false); // Bind the callback to the load event
    xmlHttp.send(dataString); // Send the data
}


document.getElementById("make_event").addEventListener("click", makeEventAjax, false);
document.getElementById("login_btn").addEventListener("click", loginAjax, false);
document.getElementById("register_btn").addEventListener("click", registerAjax, false); //need to add this button to calendar_base
