// Declare global variables
var initTime;
var plannerData;

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
        }

    }
}

function makeButton(hour){

}