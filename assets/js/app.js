let timerInterval;

/* Select a random header background */
var totalBackgrounds = 8;
var backgroundRandom = Math.floor(Math.random() * totalBackgrounds) + 1;
$("header").css({ background: "url(assets/images/backgrounds/" + backgroundRandom + ".jpg)" });

/* Create dots */
function createDots() {

    if(timerInterval) { window.clearInterval(timerInterval); }

    $("#live-panel").fadeOut(100);
    $("#more-years").fadeOut(100);

    /* Estimated years to live ~80 */
    let yearsLiveEstimated = 80;

    /* Birth inputs */
    let day = $("input#day").val();
    let month = $("input#month").val();
    let year = $("input#year").val();

    if(day == '' || month == '' || year == '') {
        $("#error").fadeIn(500);
        $("#error").html('Insert your birthday to continue');
        return;
    }

    if(day < 1 || day > 31) {
        $("#error").fadeIn(500);
        $("#error").html('Insert day of the month (1-31)');
        return;
    }

    if(month < 1 || month > 12) {
        $("#error").fadeIn(500);
        $("#error").html('Insert number of the month (1-12)');
        return;
    }

    if(year < 1940 || year > 2021) {
        $("#error").fadeIn(500);
        $("#error").html('Insert number of the year (1940-2021)');
        return;
    }

    /* Set date with moment */
    let birthDate = moment(new Date(year, month, day));
    let futureDate = moment(new Date(year + yearsLiveEstimated, month, day));
    let currentDate = moment();

    /* Set total of weeks and years from birth date */
    let totalWeeks = moment.duration(currentDate.diff(birthDate)).asWeeks();

    /* Set integers to weeks and years */
    let totalWeeksInt = Math.round(totalWeeks);

    let weeksCount = 0;
    let yearsCount = 0;
    let html = '';

    /* Add dots for weeks and years lived */
    for(let i = 0; i < totalWeeksInt; i++) {
        if(weeksCount == 52) {
            weeksCount = 0;
            yearsCount++;
            html += `<div class="dots year-lived">${yearsCount}</div>`;
            html += '<br>';
        }
        if(yearsCount <= 79) { 
            html += '<div class="dots week-lived"></div>';
            weeksCount++;
        } else {
            $("#more-years").fadeIn(1000);
            break;
        }
    }

    $("#weeks").html(html);

    /* Set total of future weeks and years from current date */
    let totalFutureWeeks = moment.duration(futureDate.diff(currentDate)).asWeeks();

    /* Set integers to future weeks and years */
    let totalFutureWeeksInt = Math.round(totalFutureWeeks);

    let futureWeeksCount = weeksCount;

    /* Add dots for future weeks and years to live */
    for(let i = 1; i < totalFutureWeeksInt; i++) {
        if(futureWeeksCount == 52) {
            futureWeeksCount = 0;
            yearsCount++;
            html += `<div class="dots year-tolive">${yearsCount}</div>`;
            html += '<br>';
        }
        if(yearsCount <= 79) { 
            html += '<div class="dots week-tolive"></div>';
            futureWeeksCount++;
        } else {
            break;
        }
    }

    $("#weeks").html(html);
    $("#live-panel").fadeIn(1000);
    
    timerDate(year, month, day);

    timerInterval = window.setInterval(() => {
        timerDate(year, month, day);
    }, 50);
}

/* Create timers */
function timerDate(year, month, day) {

    let birthDate = moment(new Date(year, month, day));
    let currentDate = moment();

    let seconds = currentDate.diff(birthDate, 'seconds');
    let minutes = currentDate.diff(birthDate, 'minutes');
    let hours = currentDate.diff(birthDate, 'hours');
    let days = currentDate.diff(birthDate, 'days');
    let weeks = currentDate.diff(birthDate, 'weeks');
    let months= currentDate.diff(birthDate, 'months');
    let years = currentDate.diff(birthDate, 'years');

    $("#day-alive").html(days);

    $("#years-lived").html(years);
    $("#months-lived").html(months);
    $("#weeks-lived").html(weeks);
    $("#days-lived").html(days);
    $("#hours-lived").html(hours);
    $("#minutes-lived").html(minutes);
    $("#seconds-lived").html(seconds);

}