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
    // Assign the correct past/present/future classes
    applyTimeClasses();
    // Add event listener to savebuttons

    // Fill saved event textboxes

}
function populateTimeBlocks(obj) {
    // If obj doesn't exist or the object was created on a previous day
    if (!obj || initTime.format("D") != obj.day ) {
        // Create a new plannerData object
        plannerData = {
            // Stores day number
            day: initTime.format("D"),
            // Stores hour and AM/PM
            hour: parseInt(initTime.format("H")),
            // Array to hold Timeblocks
            timeblocks: []
        };
        var startHour = plannerData.hour;
        if (startHour > 17) startHour = 17;
        if (plannerData.timeblocks.length == 0) for (let i = startHour; i < 24; i++) plannerData.timeblocks.push(makeButton(i));
    }
    plannerData.timeblocks.forEach(e => $(".container").append(e) );
}

function applyTimeClasses() {
    for (let i = 0; i < plannerData.hour; i++) $(`#${i}`).addClass("past")
    $(`#${plannerData.hour}`).addClass("present")
    for (let i = plannerData.hour + 1; i < 24; i++) $(`#${i}`).addClass("future")
}

function makeButton(hour){
    var newRow = $("<div class='row' style='height: 80px'>");
    var col1 = $(`<div class='col-md-1 col-2 hour'>`);
    col1.append(`<label for="${hour}">${hours[hour]}</label>`)
    var col2 = $(`<div class='col-md-10 col-8 time-block' id=${hour}>`);
    col2.append(`<textarea id="${hour}txt" name="${hour}" class="description"></textarea>`)
    var col3 = $("<button class='col-md-1 col-2 saveBtn'></button>");
    newRow.append(col1, col2, col3);
    return newRow;
}