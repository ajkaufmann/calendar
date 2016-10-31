<?php
ini_set("session.cookie_httponly", 1);
session_start();
?>
<!DOCTYPE html>
<head>
  <link rel="stylesheet" type="text/css" href="index_style.css" />
  <meta charset="utf-8" />
  <title> Calendar </title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script>
  </script>
</head>

<body>
  <div id="main">
    <div class="loginForm">
      <input type="text" id="username" placeholder="Username" />
      <input type="password" id="password" placeholder="Password" />
      <button id="login_btn">Log In</button>
      <button type="button" id="register_btn">Register</button>
    </div>
    <div class="logoutForm">
      <button type="button" id="logout_btn">Logout</button>
    </div>

    <h1 id="monthName">Your Calendar</h1>
    <div id="monthSelector">
      <button type="button" id="back_month_btn">Previous Month</button>
      <button type="button" id="next_month_btn">Next Month</button>
    </div>
    <div id="weatherInfo">
      <div id="getWeatherInfo">
        <h3>Weather Lookup</h3>
        <label for="zipcode">Zipcode:</label><input type="number" id="zipcode"/>
        <input type="submit" id="goWeather">
      </div>
      <div id="weatherData">

      </div>

    </div>
    <br>
    <div id="tagSelector">
      <label for="tags_none">Filter events by tag: None</label><input type="radio" name="picker" id="none_picker" value="tags_none" checked/>
      <label for="tags_work"> Work</label><input type="radio" name="picker" id="work_picker" value="tags_work"/>
      <label for="tags_leisure"> Leisure</label><input type="radio" name="picker" id="leisure_picker" value="tags_leasure"/>
    </div>
    <div id="make-event">
      <fieldset>
        <input type="text" id="event_name" placeholder="Event Title" />
        <label for="event_date">On</label><input type="Date" id="event_date" />
        <label for="event_time">At</label><input type="Time" id="event_time" />
        <input type="hidden" id="recurring" />
        <label for="tags_none">Tag: None</label><input type="radio" name="tags" id="tags_none" value="tags_none" />
        <label for="tags_work"> Work</label><input type="radio" name="tags" id="tags_work" value="tags_work" />
        <label for="tags_leisure"> Leisure</label><input type="radio" name="tags" id="tags_leisure" value="tags_leisure" />
        <label for="other_user"> User to share event with:</label><input type="text" id="other_user" placeholder="Other Username"/>
        <button type="button" id="make_event">Make Event</button>
      </fieldset>
    </div>

    <table style="width:100%" id="table-id">
      <tr id="headers">
        <th id="day0">Sunday</th>
        <th id="day1">Monday</th>
        <th id="day2">Tuesday</th>
        <th id="day3">Wednesday</th>
        <th id="day4">Thursday</th>
        <th id="day5">Friday</th>
        <th id="day6">Saturday</th>
      </tr>
      <!-- if something is broken, check below -->
      <!-- <div id="rows"> -->
      <tr id="week0">
        <td></td>
      </tr>
      <tr id="week1">
        <td></td>
      </tr>
      <tr id="week2">
        <td></td>
      </tr>
      <tr id="week3">
        <td></td>
      </tr>
      <tr id="week4">
        <td></td>
      </tr>
      <tr id="week5">
        <td></td>
      </tr>
      <!-- </div> -->
    </table>
    <script type="text/javascript">
    </script>
    <script src="login.js"></script>
    <script src="calendarAPI.js"></script>

    <!-- HTML ELEMENTS THAT ARE SELECTIVELY DISPLAYED -->
    <div id="wrapperDayForm">
      <div id="modfiyDayForm">
      </div>
      <input type="hidden" id="token12" name="token" value="<?php echo $_SESSION['token']; ?>" />
    </div>
  </div>
</body>
</html>
