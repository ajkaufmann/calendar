/* * * * * * * * * * * * * * * * * * * *\
*               Module 4              *
*      Calendar Helper Functions      *
*                                     *
*        by Shane Carr '15 (TA)       *
*  Washington University in St. Louis *
*    Department of Computer Science   *
*               CSE 330S              *
*                                     *
*      Last Update: October 2012      *
\* * * * * * * * * * * * * * * * * * * */

/*  This program is free software: you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation, either version 3 of the License, or
*  (at your option) any later version.
*
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  You should have received a copy of the GNU General Public License
*  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
$(document).ready(function() {

  (function() {
    "use strict";

    /* Date.prototype.deltaDays(n)
    *
    * Returns a Date object n days in the future.
    */
    Date.prototype.deltaDays = function(n) {
      // relies on the Date object to automatically wrap between months for us
      return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
    };

    /* Date.prototype.getSunday()
    *
    * Returns the Sunday nearest in the past to this date (inclusive)
    */
    Date.prototype.getSunday = function() {
      return this.deltaDays(-1 * this.getDay());
    };
  }());

  /** Week
  *
  * Represents a week.
  *
  * Functions (Methods):
  *	.nextWeek() returns a Week object sequentially in the future
  *	.prevWeek() returns a Week object sequentially in the past
  *	.contains(date) returns true if this week's sunday is the same
  *		as date's sunday; false otherwise
  *	.getDates() returns an Array containing 7 Date objects, each representing
  *		one of the seven days in this month
  */
  function Week(initial_d) {
    "use strict";

    this.sunday = initial_d.getSunday();


    this.nextWeek = function() {
      return new Week(this.sunday.deltaDays(7));
    };

    this.prevWeek = function() {
      return new Week(this.sunday.deltaDays(-7));
    };

    this.contains = function(d) {
      return (this.sunday.valueOf() === d.getSunday().valueOf());
    };

    this.getDates = function() {
      var dates = [];
      for (var i = 0; i < 7; i++) {
        dates.push(this.sunday.deltaDays(i));
      }
      return dates;
    };
  }

  /** Month
  *
  * Represents a month.
  *
  * Properties:
  *	.year == the year associated with the month
  *	.month == the month number (January = 0)
  *
  * Functions (Methods):
  *	.nextMonth() returns a Month object sequentially in the future
  *	.prevMonth() returns a Month object sequentially in the past
  *	.getDateObject(d) returns a Date object representing the date
  *		d in the month
  *	.getWeeks() returns an Array containing all weeks spanned by the
  *		month; the weeks are represented as Week objects
  */
  function Month(year, month) {
    "use strict";

    this.year = year;
    this.month = month;

    this.nextMonth = function() {
      return new Month(year + Math.floor((month + 1) / 12), (month + 1) % 12);
    };

    this.prevMonth = function() {
      return new Month(year + Math.floor((month - 1) / 12), (month + 11) % 12);
    };

    this.getDateObject = function(d) {
      return new Date(this.year, this.month, d);
    };

    this.getWeeks = function() {
      var firstDay = this.getDateObject(1);
      var lastDay = this.nextMonth().getDateObject(0);

      var weeks = [];
      var currweek = new Week(firstDay);
      weeks.push(currweek);
      while (!currweek.contains(lastDay)) {
        currweek = currweek.nextWeek();
        weeks.push(currweek);
      }
      return weeks;
    };
  }

  var currentMonth = new Month(2016, 9); // October 2016

  //helpful arrays of values
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


  // Change the month when the "next" button is presse

  function getUserEvents() {
    var numMonth = currentMonth.month + 1;
    if (numMonth < 10) var thisMonth = currentMonth.year + "-0" + numMonth + "%";
    else var thisMonth = currentMonth.year + "-" + numMonth + "%";
    //alert(thisMonth);
    // Make a URL-encoded string for passing POST data:
    //var dataString = "thisMonth=" + encodeURIComponent(thisMonth);
    if ($("#work_picker").is(":checked")) {
      var tags = "work";
    } else if ($("#leisure_picker").is(":checked")) {
      var tags = "leisure";
    } else {
      var tags = "%";
    }
    $.post('user_eventAjax.php', {
      thisMonth: thisMonth,
      tag: tags
    }).done(
      function(data) {
        if (data.event_name == "_no_user") updateCalendar(data, false);
        else updateCalendar(data, true);
      }

    );
  }

  function clearWeatherSection(){
    var weatherDiv = document.getElementById("weatherData");
    weatherDiv.remove();
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "weatherData");
    document.getElementById("weatherInfo").append(newDiv);
    $("#zipcode")[0].value="";
  }

  function getWeather(){
    var APICall = "http://api.openweathermap.org/data/2.5/weather?zip="
    APICall += $("#zipcode").val() + ",us";
    APICall += "&appid=5a8e5f0dcdd550c273e6ef3bc226791d"
    //APICall = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=5a8e5f0dcdd550c273e6ef3bc226791d";
    $.getJSON(APICall, null).done(function(data){
      //(K - 273.15) * 9/5 + 32
      var curTemp = (data.main.temp- 273.15) * 9/5 + 32
      curTemp = curTemp.toFixed(1);
      var location = data.name;
      //var lowTemp = (data.main.temp_min- 273.15) * 9/5 + 32
      //console.log(highTemp);
      //console.log(lowTemp);
      clearWeatherSection();
      $("#weatherData").append("Current Temperature in " + location + " is "+ curTemp + "°F");
      $("#weatherData").append("<br>");

    });
  }


  $.post("logout_ajax.php", null, null);
  getUserEvents(); // load the current month's calendar
  $(".logoutForm").hide();
  $("#make-event").hide();
  $("#tags_none").prop('checked', true);

  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var monthNum = currentDate.getMonth();
  var currentMonth = new Month(currentYear, monthNum); // October 2016

  function clearModDayForm() {
    var evnts = document.getElementById("modfiyDayForm");
    evnts.remove();
    var section = document.createElement("div");
    section.setAttribute("id", "modfiyDayForm");
    var wrapper = document.getElementById("wrapperDayForm");
    wrapper.append(section);
  }

  function clearCalendar() {
    for (var i = 0; i < 6; i++) {
      var curWeek = "week" + i;
      var rowNode = document.getElementById(curWeek);
      if (rowNode != null) {
        while (rowNode.hasChildNodes()) {
          rowNode.removeChild(rowNode.childNodes[0]);
        }
        rowNode.remove();
      }
    }
    clearModDayForm();
    clearWeatherSection();
  }

  function singleEventForm(eventItem) {
    //alert(eventItem.event_date);

    var divID = "eventID-" + eventItem.eventid;
    //console.log(eventItem.eventid);
    $("#modfiyDayForm").append("<div id =" + divID + ">");
    $("#modfiyDayForm").append("<label for='event'>Event</label> <input type='text' name='event' id='event" + eventItem.eventid + "' value='" + eventItem.event_name + "'>");
    var token = $("#token12").val();
    console.log(token);
    //$("#modfiyDayForm").append("<label for='token'>Token</label> <input type='hidden' name='token' id='token12' value='" + token + "'>");
    $("#modfiyDayForm").append("<label for='time'>Time</label><input type='time' name='time' id='time" + eventItem.eventid + "' value=" + eventItem.event_time + ">");
    $("#modfiyDayForm").append("<label for='eventDate'>Date</label><input type='date' name='date' id='date" + eventItem.eventid + "' value=" + eventItem.event_date + ">");
    $("#modfiyDayForm").append("<input type='hidden' id='recurring" + eventItem.eventid + "' name='recurring' value=" + eventItem.recurring + ">");
    $("#modfiyDayForm").append("<button type='submit' id='editEvent" + eventItem.eventid + "' value='Edit'>Edit</button>");
    $('#modifyDayForm').append("<input type='hidden' id='eventNum' value=" + eventItem.eventid + ">");
    $("#modfiyDayForm").append("<button type='submit' id='deleteEvent" + eventItem.eventid + "' value='Delete'>Delete</button>");
    $("#modfiyDayForm").append("</div>");
    $("#editEvent" + eventItem.eventid).click(function() {
      var title = $("#event" + eventItem.eventid).val();
      var time = $("#time" + eventItem.eventid).val();
      var date = $("#date" + eventItem.eventid).val();
      var recurring = $("#recurring" + eventItem.eventid).val();
      var id = eventItem.eventid;
      $.post("editEvent_AJAX.php", {
        id: id,
        name: title,
        event_date: date,
        event_time: time,
        recurring: recurring,
        tokenA: token
      }, function(data) {
        // alert("Event edited? " + data.success);
        getUserEvents();
      });
    });
    $("#deleteEvent" + eventItem.eventid).click(function() {
      // alert("Yo! You clicked Delete button! Value was: " + eventItem.eventid);
      var title = $("#event" + eventItem.eventid).val();
      var time = $("#time" + eventItem.eventid).val();
      var date = $("#date" + eventItem.eventid).val();
      var recurring = $("#recurring" + eventItem.eventid).val();
      var id = eventItem.eventid;
      $.post("deleteEvent_AJAX.php", {
        id: id,
        tokenA: token
      }, function(data) {
        // alert("Event deleted?" + data.success);
        getUserEvents();
      });
    });
  }

  function modDayEvents(date) {
    $.post('getDayEvents_AJAX.php', {
      day: date
    }).done(
      function(data) {
        clearModDayForm();
        for (var i = 0; i < data.length; i++) {
          singleEventForm(data[i]);
        }
      }
    );
  }

  function addButtonClick(buttonID) {
    $("#" + buttonID).click(function() {
      // alert("`EDIT DAY BUTTON` CLICKED");
      var date = $("#" + buttonID).val();
      var splitDate = date.split("-");
      var day = splitDate[2];
      console.log("DAY:" + day);
      if (day > 10) {
        modDayEvents(date);
      } else {
        modDayEvents(splitDate[0] + "-" + splitDate[1] + "-0" + splitDate[2]);
      }
    });
  }

  // This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
  // it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
  function updateCalendar(userEvents, hasUser) {
    var weeks = currentMonth.getWeeks();
    var newMonth = months[currentMonth.month];
    $('h1#monthName').html(months[currentMonth.month]+", "+currentMonth.year);
    clearCalendar();
    for (var w in weeks) { // for each week in the month
      var days = weeks[w].getDates();
      var weekString = "week" + w;
      var newWeek = document.createElement("tr");
      newWeek.setAttribute("id", weekString);
      document.getElementById("table-id").appendChild(newWeek);
      for (var d in days) { //each day in the week
        var addButton = false;
        var newLi = document.createElement("td");
        if (days[d].getMonth() == currentMonth.month) { //if the day is in that month (makes sure we don't pring out 31 if thats the sunday of the week etc)
        newLi.appendChild(document.createTextNode(days[d].getDate())); //add the day to a the "box"
        newLi.setAttribute("class", "veggies"); //set its clas to veggies
        var dayInfo = document.createElement("div") //make a list of all of the events for that day
        dayInfo.setAttribute("class", "eventActivites"); //that list now has the class of eventActivities
        if (hasUser) { //if there is a user check what's going on for that use during that day
        for (var i = 0; i < userEvents.length; i++) { //for each event during that day
          var eventDate = userEvents[i].event_date;
          var eventDay = eventDate[eventDate.length - 2] + eventDate[eventDate.length - 1];
          if (days[d].getDate() == eventDay) { //if the event's day is the current day of the month
          dayInfo.appendChild(document.createElement("br")); //add a new line (just puts stuff on new lines)
          var eventNode = dayInfo.appendChild(document.createElement("p")); //makes a list item for the new event to be added to
          eventNode.appendChild(document.createTextNode(userEvents[i].event_time + ": " + userEvents[i].event_name)); //add a text node into that list item
          dayInfo.appendChild(eventNode);
          addButton = true;

        }
      }
    }
    if (addButton) {
      var buttonDiv = document.createElement("div");
      buttonDiv.setAttribute("id", "modEvent");
      var button = document.createElement("input");
      button.setAttribute("type", "button");
      var buttonID = "editDay-" + days[d].getDate();
      button.setAttribute("id", buttonID);
      var dayDate = days[d].getFullYear() + "-" + (days[d].getMonth() + 1) + "-" + days[d].getDate();
      button.setAttribute("value", dayDate);
      $("#" + buttonID).html("Modify Day");
      buttonDiv.appendChild(button);
      dayInfo.appendChild(buttonDiv);
    }
    newLi.appendChild(dayInfo);
  }


  document.getElementById(weekString).appendChild(newLi);
  if (addButton) {
    addButtonClick(buttonID);
  }
}
}
}

//all general listeners should go here because it allows for the entire DOM to be created before adding anything.
document.getElementById("next_month_btn").addEventListener("click", function(event) {
  currentMonth = currentMonth.nextMonth(); //
  getUserEvents(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);
document.getElementById("back_month_btn").addEventListener("click", function(event) {
  currentMonth = currentMonth.prevMonth(); //
  getUserEvents(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);
$("#login_btn").click(function() {
  var username = document.getElementById("username").value; // Get the username from the form
  var password = document.getElementById("password").value; // Get the password from the form
  $.post("login_ajax.php", {
    username: username,
    password: password
  }, function(data) {
    if (data.success) {
      $(".loginForm").hide();
      $(".logoutForm").show();
      $("#make-event").show();
      $("#token12").val(data.token);
      getUserEvents();
    } else {
      alert("Unable to log in");
    }
  })
});
$("#logout_btn").click(function() {
  //alert("Logging out!");
  $.post("logout_ajax.php", {
    value: true
  }, function(data) {
    if (data.success) {
      getUserEvents();
      $(".loginForm").show();
      $(".logoutForm").hide();
      $("#make-event").hide();
      $("#username")[0].value = "";
      $("#password")[0].value = "";
    }
  });
});

function makeEventAjax(event) {
  var event_name = document.getElementById("event_name").value;
  var event_date = document.getElementById("event_date").value;
  var event_time = document.getElementById("event_time").value;
  var recurring = document.getElementById("recurring").value;
  var other_user = document.getElementById("other_user").value;
  if ($("#tags_work").is(":checked")) {
    var tags = "work";
  } else if ($("#tags_leisure").is(":checked")) {
    var tags = "leisure";
  } else {
    var tags = "none";
  }

  // Make a URL-encoded string for passing POST data:
  var dataString =
  "event_name=" + encodeURIComponent(event_name) +
  "&event_date=" + encodeURIComponent(event_date) +
  "&event_time=" + encodeURIComponent(event_time) +
  "&recurring=" + encodeURIComponent(recurring) +
  "&other_user=" + encodeURIComponent(other_user) +
  "&tags=" + encodeURIComponent(tags);

  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "eventCreate_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event) {
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
  } else {
    alert("Error: Event not made");
  }
}, false); // Bind the callback to the load event

//alert(dataString);
xmlHttp.send(dataString); // Send the data
$("#event_name")[0].value = "";
$("#event_date")[0].value = "";
$("#event_time")[0].value = "";
$("#recurring")[0].value = "";
$("#other_user")[0].value = "";
$("#tags_none").prop('checked', true);
getUserEvents();
getUserEvents(); //dont know why but keep this here, otherwise it wont work
}

document.getElementById("make_event").addEventListener("click", makeEventAjax, false);
$("#none_picker").click(getUserEvents);
$("#work_picker").click(getUserEvents);
$("#leisure_picker").click(getUserEvents);
$("#goWeather").click(getWeather);
});
