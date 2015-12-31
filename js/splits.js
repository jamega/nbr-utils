function PadTime(time, digits) {
    var s = ("000000000" + time);
    return s.substr(s.length - digits);
}

function GenerateHtmlBoilerplate() {
    var html = "<html><head><title>NBR Track Workout Split Calculator</title><link href=\"bootstrap-3.3.5-dist/css/bootstrap.css\" rel=\"stylesheet\"/>";
    html += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1\"></head><body><div class='container'>";

    return html;
}


function DumpPaceTable(pace_distance, pr_minutes, pr_seconds) {
    var distance = 0;
    var distances = new Array(100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 1609);

    var pace_distance_km = (pace_distance / 1000).toFixed(2);
    var pace_distance_miles = (pace_distance / 1609).toFixed(2);
    var pace_distance_string = pace_distance.toFixed(2) + " meters";
    var pace_distance_string_short = pace_distance_string;
    if (pace_distance > 1000) {
        pace_distance_string = pace_distance_km + " km (" + pace_distance_miles + " miles)";
        pace_distance_string_short = pace_distance_km + "k";
    }

    if (pace_distance > 10000) {
        pace_distance_string = pace_distance_km + " km (" + pace_distance_miles + " miles)";
        pace_distance_string_short = pace_distance_miles + "m";
    }

    var str_hours = Math.floor(pr_minutes / 60);
    var str_minutes = PadTime(pr_minutes % 60, 2);
    var str_seconds = PadTime(pr_seconds, 2);

    var html = "<h2>Splits Based on " + pace_distance_string + " of " + str_hours + ":" + str_minutes + ":" + str_seconds + "</h2>";
    var total_seconds = (pr_minutes * 60 + pr_seconds);
    html += "<table border=1>";
    html += "<tr><td>meters</td><td>split</td></tr>";
    for (i = 0; i < distances.length; i++) {
        distance = distances[i];
        var split = (total_seconds / pace_distance) * distance;
        var sec_remainder = Math.floor(split % 60);
        var split_min_sec = Math.floor(split / 60) + ":" + ("0" + sec_remainder).slice(-2);
        html += "<tr><td>" + distance + "</td><td>" + split_min_sec + "</td></tr>";
    }
    html += "</table>";
    return html;
}

function CreateSplits(form) {

    console.log("Create splits");
    var o = this;
    o.document.write(GenerateHtmlBoilerplate());
    var minutes_800 = parseInt(form.minutes_800.value);
    var minutes_mile = parseInt(form.minutes_mile.value);
    var minutes_3k = parseInt(form.minutes_3k.value);
    var minutes_5k = parseInt(form.minutes_5k.value);
    var minutes_10k = parseInt(form.minutes_10k.value);
    var hours_half_marathon = parseInt(form.hours_half_marathon.value);
    var hours_marathon = parseInt(form.hours_marathon.value);
    var minutes_half_marathon = parseInt(form.minutes_half_marathon.value);
    var minutes_marathon = parseInt(form.minutes_marathon.value);
    var seconds_800 = parseInt(form.seconds_800.value);
    var seconds_mile = parseInt(form.seconds_mile.value);
    var seconds_3k = parseInt(form.seconds_3k.value);
    var seconds_5k = parseInt(form.seconds_5k.value);
    var seconds_10k = parseInt(form.seconds_10k.value);

    if (!isNaN(minutes_800) && !isNaN(seconds_800)) {
        o.document.write(DumpPaceTable(800, minutes_800, seconds_800));
    }
    if (!isNaN(minutes_mile) && !isNaN(seconds_mile)) {
        o.document.write(DumpPaceTable(1609, minutes_mile, seconds_mile));
    }
    if (!isNaN(minutes_3k) && !isNaN(seconds_3k)) {
        o.document.write(DumpPaceTable(3000, minutes_3k, seconds_3k));
    }
    if (!isNaN(minutes_5k) && !isNaN(seconds_5k)) {
        o.document.write(DumpPaceTable(5000, minutes_5k, seconds_5k));
    }
    if (!isNaN(minutes_10k) && !isNaN(seconds_10k)) {
        o.document.write(DumpPaceTable(10000, minutes_10k, seconds_10k));
    }
    if (!isNaN(hours_half_marathon) && !isNaN(minutes_half_marathon)) {
        o.document.write(DumpPaceTable((1609 * 13.1), minutes_half_marathon + (hours_half_marathon * 60), 0));
    }
    if (!isNaN(hours_marathon) && !isNaN(minutes_marathon)) {
        o.document.write(DumpPaceTable((1609 * 26.2), minutes_marathon + (hours_marathon * 60), 0));
    }

    o.document.write("<br><a href=\"index.html\" class=\"btn btn-success btn-lg btn-block\">Go back to split entry</a>");
    o.document.write("</div><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"/><script src=\"bootstrap-3.3.5-dist/js/bootstrap.js\"/></body></html>");
    return;
}
