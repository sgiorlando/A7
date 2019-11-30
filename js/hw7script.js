/*
    FILE: /~sgiorlan/Assignment7/css/hw7script.js
    91.61 GUI Programming I Assignment No.7: Using the jQuery Validation Plugin with Your Dynamic Table
    Scott T. Giorlando, UMass Lowell Computer Science, scott_giorlando@student.uml.edu
    File Created on: 11/29/2019 3:27 PM.
        Updated by STG on 11/29/2019 7:19 PM

    File Description: This file is a script for my website which will give my website most of its functionality.

    This file did pass the validator required.
*/



/*
Function generateTable takes 4 parameters, a row beginning a row end a column start and a column end, this is the range of the 4 inputs for the user.
Once it gets the 4 numbers that the user submits, it then checks to see if any values are empty or not, then it checks to see if their first input is larger than their
second input and swithces the numbers if so.

After this it checks if the user's input is greater than 100, this will display an error message.  Values above 100 have been tested and work but I set it to 100 so the
user doesn't enter an absurd number and break my page.

Once that check is done this again has a check to see if the user's value is below 0 or not.  This is to be sure the table doesn't enter values that are below 0 and an
error message is printed.

If none of those issues are found then it will display a message about generating the table with their multiplier and multiplicand and the range of them.
Then generateTable will start making both the rows and columns to the specific range the user submitted.
*/
function generateTable(rowStart, rowEnd, colStart, colEnd) {

    document.getElementById("tOutput").innerHTML = "";

    if (Number(rowStart) > Number(rowEnd)) {
        console.log("Swapping the beginning and end values of the row of the table.")
        var tempStart = rowStart;
        rowStart = rowEnd;
        rowEnd = tempStart;
        document.getElementById("userSubmission").innerHTML = "<h4>Swapping the beginning and end row values.</h4>";
    }
    if (Number(colStart) > Number(colEnd)) {
        console.log("Swapping the beginning and end values of the column of the table.")
        var tempStart = colStart;
        colStart = colEnd;
        colEnd = tempStart;
        document.getElementById("userSubmission").innerHTML += "<h4>Swapping the beginning and end column values.</h4>";
    }
    if (colStart == "" || colEnd == "" || rowStart == "" || rowEnd == "") {
        document.getElementById("userSubmission").innerHTML = "";
    }
    else if (Number(rowStart) > 100 || Number(rowEnd) > 100 || Number(colStart) > 100 || Number(colEnd) > 100) {
      document.getElementById("userSubmission").innerHTML = "<h2>Error: User cannot have their entry numbers be greater than 100!</h2>";
    }
    else if (Number(rowStart) < 0 || Number(rowEnd) < 0 || Number(colStart) < 0 || Number(colEnd) < 0) {
      document.getElementById("userSubmission").innerHTML = "<h2>Error: User cannot have their entry numbers be less than 0!</h2>";
    }
    /*
    This executes if all the validations pass, which are if the beginning number is smaller than the end number.
    Those numbers get swapped, and this also checks if the user tries to put a number above 100 in the table so it doesn't break.
    */
    else {
      rowStart = Number(rowStart);
      rowEnd = Number(rowEnd);
      colStart = Number(colStart);
      colEnd = Number(colEnd);
      document.getElementById("userSubmission").innerHTML = "<h4>Creating a multiplication table with values from: " + rowStart + '-' + rowEnd +
      " and multiplying them with values from " + colStart + "-" + colEnd + ".</h4>";

    /*
    Here in the function I take the table output ID and start using loops to insert each cell with the numbers in the range that the user specified.
    For example, if the user put 1-5 for their columns then my loop will start at 1 and go up to 5 and fill each cell with the specific number.  For each inner cell
    the loop will take the rows and multiply it by the column, which is why it is a nested loop.
    */
    var table = document.getElementById("tOutput");
      for (var i = colStart; i <= colEnd; i++) {
         var row = table.insertRow(i - colStart);
         for (var j = rowStart; j <= rowEnd; j++) {
            var tableCell = row.insertCell(j - rowStart);
            tableCell.innerHTML = i * j;
          }
          var tableCell = row.insertCell(0);
          tableCell.innerHTML = i;
      }

    /*
    This makes the range of the table.
    */
    var row1 = table.insertRow(0);
      for (let k = rowStart; k <= rowEnd; k++) {
        var tableCell = row1.insertCell(k - rowStart);
        tableCell.innerHTML = k;
      }

    /*
    This is the top left corner of the table, I put a * to show that this is a multiplication table.
    */
    var tableCell = row1.insertCell(0);
    tableCell.innerHTML = "*";
  }
}

/*
Function readForm will take each number the user input and store it into a variable so it can be used in the generateTable function.
*/
function readForm(formInput) {
    if (formInput.preventDefault) formInput.preventDefault();
    var firstMultiplier = document.getElementById('firstMultiplier').value;
    var lastMultiplier = document.getElementById('lastMultiplier').value;
    var firstMultiplicand = document.getElementById('firstMultiplicand').value;
    var lastMultiplicand = document.getElementById('lastMultiplicand').value;
    generateTable(firstMultiplier, lastMultiplier, firstMultiplicand, lastMultiplicand);
    return false;
}

/*
Here I use attachEvent to the submit button so the vents can be used in IE8 or lower.
addEventListener will add a function to the event's stack instead of overwriting it, I read about both of these online and it was mentioned to be used in practice.
*/
var form = document.getElementById('userForm');
if (form.attachEvent) {
    form.attachEvent("submit", readForm);
} else {
    form.addEventListener("submit", readForm);
}

/*
This jQuery function sets rules for the user input on the form to make sure there is an entry and it is a digit.
If the rules specified are not followed it displays an error message.
*/
$(function () {
    $("form[name='userForm']").validate({
        rules: {
            firstMultiplier: {
                required: true,
                digits: true
            },
            lastMultiplier: {
                required: true,
                digits: true
            },
            firstMultiplicand: {
                required: true,
                digits: true
            },
            lastMultiplicand: {
                required: true,
                digits: true
            }
        },
        messages: {
            firstMultiplier: {
                required: "<br><h3>Error: User cannot leave this value blank!</h3>",
                digits: "<br><h3>Error: Value must be a number!</h3>"
            },
            lastMultiplier: {
                required: "<br><h3>Error: User cannot leave this value blank!</h3>",
                digits: "<br><h3>Error: Value must be a number!</h3>"
            },
            firstMultiplicand: {
                required: "<br><h3>Error: User cannot leave this value blank!</h3>",
                digits: "<br><h3>Error: Value must be a number!</h3>"
            },
            lastMultiplicand: {
                required: "<br><h3>Error: User cannot leave this value blank!</h3>",
                digits: "<br><h3>Error: Value must be a number!</h3>"
            }
        }
    });
});
