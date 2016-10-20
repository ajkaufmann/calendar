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

 $(document).ready(function(){

	 (function () {
	 	"use strict";

	 	/* Date.prototype.deltaDays(n)
	 	 *
	 	 * Returns a Date object n days in the future.
	 	 */
	 	Date.prototype.deltaDays = function (n) {
	 		// relies on the Date object to automatically wrap between months for us
	 		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
	 	};

	 	/* Date.prototype.getSunday()
	 	 *
	 	 * Returns the Sunday nearest in the past to this date (inclusive)
	 	 */
	 	Date.prototype.getSunday = function () {
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


	 	this.nextWeek = function () {
	 		return new Week(this.sunday.deltaDays(7));
	 	};

	 	this.prevWeek = function () {
	 		return new Week(this.sunday.deltaDays(-7));
	 	};

	 	this.contains = function (d) {
	 		return (this.sunday.valueOf() === d.getSunday().valueOf());
	 	};

	 	this.getDates = function () {
	 		var dates = [];
	 		for(var i=0; i<7; i++){
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

	 	this.nextMonth = function () {
	 		return new Month( year + Math.floor((month+1)/12), (month+1) % 12);
	 	};

	 	this.prevMonth = function () {
	 		return new Month( year + Math.floor((month-1)/12), (month+11) % 12);
	 	};

	 	this.getDateObject = function(d) {
	 		return new Date(this.year, this.month, d);
	 	};

	 	this.getWeeks = function () {
	 		var firstDay = this.getDateObject(1);
	 		var lastDay = this.nextMonth().getDateObject(0);

	 		var weeks = [];
	 		var currweek = new Week(firstDay);
	 		weeks.push(currweek);
	 		while(!currweek.contains(lastDay)){
	 			currweek = currweek.nextWeek();
	 			weeks.push(currweek);
	 		}

	 		return weeks;
	 	};
	 }

	 var currentMonth = new Month(2012, 9); // October 2012

	 //helpful arrays of values
	 var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	 var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	 var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	 // Change the month when the "next" button is pressed
	 document.getElementById("next_month_btn").addEventListener("click", function(event){
	 	currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
	 	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
	 	alert("The new month is "+currentMonth.month+" "+currentMonth.year);
	 }, false);


	 // This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
	 // it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
	 function updateCalendar(){

	 	var weeks = currentMonth.getWeeks();
	 	var newMonth = months[currentMonth.month];
	 	$('h1#monthName').html(months[currentMonth.month]);
	 	for(var w in weeks){
			var days = weeks[w].getDates();
			alert(days);
			// for (var i = 0; i < 5; i++) {
	                //     for (var j = 0; j < 7; j++) {
	                //         var newLi = document.createElement("td"); // creates a node with the tag name li
	                //         newLi.appendChild(document.createTextNode("Date"));
	                //         newLi.setAttribute("class", "veggies");
	                //         var weekString = "week" + i;
	                //         document.getElementById(weekString).appendChild(newLi);
	                //     }
	                // }
	 		// days contains normal JavaScript Date objects.

	 		//alert("Week starting on "+days[0]);

	 		for(var d in days){
	 			// You can see console.log() output in your JavaScript debugging tool, like Firebug,
	 			// WebWit Inspector, or Dragonfly.
	 			//console.log(days[d].toISOString());
	 		}
	 	}
	 }

});
