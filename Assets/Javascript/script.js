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
            // Object to hold Timeblock textarea info later
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
    var col3 = $(`
    <button class='col-md-1 col-2 saveBtn' data-hour='${hour}'>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-square-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
    </button>`);
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