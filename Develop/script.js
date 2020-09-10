// Declaring global variables
// Get the current time via moment.js and store it in initTime
var initTime = moment();
var initHour = parseInt(initTime.format("H"));
var plannerData;
var hours = ["12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"]
var timeblocks = [];
// Call init when the page loads
init();

function init() {
    
    // Set the text of #currentDay to today's date
    $("#currentDay").text(initTime.format("dddd[,] MMMM Do"));

    plannerData = JSON.parse(localStorage.getItem("plannerData"));
    populateTimeBlocks(plannerData);
    // Assign the correct past/present/future classes
    applyTimeClasses();
    // Add event listener to save buttons
    $(document).on("click", ".saveBtn", saveTextArea);
    // Fill saved event textboxes
    fillTextboxes();
}
function populateTimeBlocks(obj) {
    // If obj doesn't exist or the object was created on a previous day
    if (!obj || initTime.format("D") != obj.day ) {
        // Create a new plannerData object
        console.log("Made new planner item.")
        plannerData = {
            // Stores day number
            day: initTime.format("D"),
            // Stores hour and AM/PM
            hour: initHour,
            // Array to hold Timeblocks
            rowData: {}
        };
        savePlannerData();
    } else console.log("Loaded from localStorage");
    var startHour = plannerData.hour;
    if (startHour > 18) startHour = 18;
    for (let i = startHour; i < 24; i++) timeblocks.push(makeHourRow(i));
    timeblocks.forEach(e => $(".container").append(e) );
}

function applyTimeClasses() {
    for (let i = 0; i < initHour; i++) $(`#${i}`).addClass("past")
    $(`#${initHour}`).addClass("present")
    for (let i = initHour + 1; i < 24; i++) $(`#${i}`).addClass("future")
}

function makeHourRow(hour){
    var newRow = $("<div class='row' style='height: 80px'>");
    var col1 = $(`<div class='col-md-1 col-2 hour'>`);
    col1.append(`<label for="${hour}">${hours[hour]}</label>`)
    var col2 = $(`<div class='col-md-10 col-8 time-block' id=${hour}>`);
    col2.append(`<textarea id="${hour}txt" name="${hour}" class="description"></textarea>`)
    var col3 = $(`<button class='col-md-1 col-2 saveBtn' data-hour='${hour}'></button>`);
    newRow.append(col1, col2, col3);
    return newRow;
}

function saveTextArea() {
    let hour = $(this).attr("data-hour");
    plannerData.rowData[hour] = $(`#${hour}txt`).val();
    savePlannerData();
}

function savePlannerData() {
    localStorage.setItem("plannerData", JSON.stringify(plannerData));
    console.log("Saved plannerData to localstorage.");
    console.log(plannerData);
}

function fillTextboxes() {
    Object.keys(plannerData.rowData).forEach(e => $(`#${e}txt`).val(plannerData.rowData[e]) )
}