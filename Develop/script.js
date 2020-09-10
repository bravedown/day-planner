// Declare global variables
var initTime;
var plannerData;
var hours = ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"]

// Call init when the page loads
init();

function init() {
    // Get the current time via moment.js and store it in initTime
    initTime = moment();
    // Set the text of #currentDay to today's date
    $("#currentDay").text(initTime.format("dddd[,] MMMM Do"));

    plannerData = localStorage.getItem("plannerData");
    populateTimeBlocks(plannerData);
}
function populateTimeBlocks(arr) {
    // If arr
    if (arr && initTime.format("D") == plannerData.day) {
        $(".container").text("true");
    } else {
        plannerData = {
            // Stores day number
            day: initTime.format("D"),
            // Stores hour and AM/PM
            hour: parseInt(initTime.format("H"))
        };
        var timeblocks = [];
        if (plannerData.hour > 17) {

        } else {
            var startHour = plannerData.hour;
            for (let i = startHour; i < 24; i++) {
                timeblocks.push(makeButton(i));
                
            }
            timeblocks.forEach(e => $(".container").append(e) );
        }

    }
}

function makeButton(hour){
    var newRow = $("<div class='row' style='height: 80px'>");
    var col1 = $(`<div class='col-1'>`);
    col1.append(`<label for="${hour}">${hours[hour]}</label>`)
    var col2 = $("<div class='col-10'>");
    col2.append(`<textarea id="${hour}" name="${hour}" style="width: 100%; border: 1px solid black"></textarea>`)
    var col3 = $("<div class='col-1'>save</div>");
    newRow.append(col1, col2, col3);
    return newRow;
}