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
var JSONObj = {};

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


  // Change the month when the "next" button is pressed
  document.getElementById("next_month_btn").addEventListener("click", function(event) {
    currentMonth = currentMonth.nextMonth(); //
    getUserEvents(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    // alert("The new month is " + currentMonth.month + " " + currentMonth.year);
  }, false);
  document.getElementById("back_month_btn").addEventListener("click", function(event) {
    currentMonth = currentMonth.prevMonth(); //
    getUserEvents(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    // alert("The new month is " + currentMonth.month + " " + currentMonth.year);
  }, false);

  getUserEvents(); // load the current month's calendar

  function getUserEvents() {
    var numMonth = currentMonth.month + 1;
    if (numMonth < 10) var thisMonth = currentMonth.year + "-0" + numMonth + "%";
    else var thisMonth = currentMonth.year + "-" + numMonth + "%";
    alert(thisMonth);
    // Make a URL-encoded string for passing POST data:
    var dataString = "thisMonth=" + encodeURIComponent(thisMonth);
    $.post('user_eventAjax.php', {thisMonth: thisMonth}).done(
      function(data) {
        // JSONObj = data;
        if(data.event_name=="_no_user") updateCalendar(data, false);
        else updateCalendar(data, true);

        alert(!(data.event_name=="_no_user"));
      }

    );
  }

  // This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
  // it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
  function updateCalendar(userEvents, hasUser) {
    console.log(userEvents);
    var weeks = currentMonth.getWeeks();
    var newMonth = months[currentMonth.month];
    $('h1#monthName').html(months[currentMonth.month]);
    clearCalendar();
    for (var w in weeks) { // for each week in the month
      var days = weeks[w].getDates();
      var weekString = "week" + w;
      var newWeek = document.createElement("tr");
      newWeek.setAttribute("id", weekString);
      document.getElementById("table-id").appendChild(newWeek);
      for (var d in days) { //each day in the week
        var newLi = document.createElement("td");
        if (days[d].getMonth() == currentMonth.month) { //if the day is in that month (makes sure we don't pring out 31 if thats the sunday of the week etc)
          newLi.appendChild(document.createTextNode(days[d].getDate())); //add the day to a the "box"
          newLi.setAttribute("class", "veggies"); //set its clas to veggies
          var dayInfo = document.createElement("ul") //make a list of all of the events for that day
          dayInfo.setAttribute("class", "eventActivites"); //that list now has the class of eventActivities
          if(hasUser){ //if there is a user check what's going on for that use during that day
            for(var i = 0; i < userEvents.length; i++){ //for each event during that day
              var eventDate = userEvents[i].event_date;
              var eventDay = eventDate[eventDate.length - 2] + eventDate[eventDate.length - 1];
              if(days[d].getDate() == eventDay){ //if the event's day is the current day of the month
                  dayInfo.appendChild(document.createElement("br")); //add a new line (just puts stuff on new lines)
                  var eventNode = dayInfo.appendChild(document.createElement("li")); //makes a list item for the new event to be added to
                  eventNode.appendChild(document.createTextNode(userEvents[i].event_time+": " + userEvents[i].event_name)); //add atext node into that list item
                  eventNode.addEventListener("click", alertFunction(eventNode.html), false);
                  // dayInfo.appendChild(document.createTextNode(userEvents[i].event_time+": "));
                  // dayInfo.appendChild(document.createTextNode(userEvents[i].event_name));
                  // dayInfo.addEventListener("click",alertFunction, false);
                  dayInfo.appendChild(eventNode);
              }
            }
          }
          newLi.appendChild(dayInfo);
        }

        document.getElementById(weekString).appendChild(newLi);
      }
    }
  }

  function alertFunction(content){
    alert("Alert function - Event Clicked!" + content);
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
  }

  function getUserEventsCallback(event) {
    //alert( "Your file contains the text: " + event.target.responseText );
    // var str = '{ "events" : [';
    // var splitJSONString = event.target.responseText.split("}{");
    // for (var i in splitJSONString) {
    //     if (i == 0) {
    //         fixed = splitJSONString[i] + "},";
    //     } else if (i == splitJSONString.length - 1) {
    //         var fixed = "{" + splitJSONString[i];
    //     } else {
    //         var fixed = "{" + splitJSONString[i] + "},";
    //     }
    //     str += fixed;
    //     //alert(obj.event_name);
    //     //JSONResults[i] = obj;
    //     //alert(JSONResults[i].event_name);
    // }

    //str += ']}'
    //alert(str);
    JSONString = event.target.responseText;
    alert(JSONString);

    //var jsonData = JSON.parse(event.target.responseText);
    //alert("Json data =>"+jsonData);
  }
  document.getElementById("login_btn").addEventListener("click", getUserEvents, false);
});
