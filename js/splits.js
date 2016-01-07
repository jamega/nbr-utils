(function () {
    var app = angular.module('splits-module', []);

    app.controller('SplitController', function () {

        this.selection = 0;
        this.selectTab = function (selection) {
            this.selection = selection;
        };

        this.showSplits = function () {
            return this.selection == 0;
        };

        this.showAgeGrade = function () {
            return this.selection == 1;
        };

        this.showWeather = function () {
            return this.selection == 2;
        };

        this.showAbout = function () {
            return this.selection == 3;
        };

        this.padTime = function (time, digits) {
            var s = ("000000000" + time);
            return s.substr(s.length - digits);
        };

        this.generateHtmlBoilerplate = function () {
            return "<div class='container'>";
        };

        this.dumpPaceTable = function (pace_distance, pr_hours, pr_minutes, pr_seconds) {
            console.log("dumpPaceTable");
            console.log("pace_distance: " + pace_distance);
            console.log("pr_hours:      " + pr_hours);
            console.log("pr_minutes:    " + pr_minutes);
            console.log("pr_seconds:    " + pr_seconds);

            var distance = 0;
            var distances = new Array(100, 200, 300, 400, 500, 600, 800, 1000, 1200, 1600, 1609);

            var pace_distance_km = (pace_distance / 1000).toFixed(2);
            var pace_distance_miles = (pace_distance / 1609).toFixed(2);
            var pace_distance_string = pace_distance + " meters"; //.toFixed(2)
            var pace_distance_string_short = pace_distance_string;

            if (pace_distance > 1000) {
                pace_distance_string = pace_distance_km + " km (" + pace_distance_miles + " miles)";
                pace_distance_string_short = pace_distance_km + "k";
            }

            if (pace_distance > 10000) {
                pace_distance_string = pace_distance_km + " km (" + pace_distance_miles + " miles)";
                pace_distance_string_short = pace_distance_miles + "m";
            }

            var str_hours = this.padTime(pr_hours, 2);
            var str_minutes = this.padTime(pr_minutes, 2);
            var str_seconds = this.padTime(pr_seconds, 2);

            var html = "<h5>Splits Based on " + pace_distance_string + " of " + str_hours + ":" + str_minutes + ":" + str_seconds + "</h5>";
            var total_seconds = (pr_hours * 3600 + pr_minutes * 60 + pr_seconds);
            html += "<table class=\"table table-striped table-condensed table-bordered table-hover \">";
            html += "<tr><th>meters</th><th>split</th></tr>";
            for (i = 0; i < distances.length; i++) {
                distance = distances[i];
                var split = (total_seconds / pace_distance) * distance;
                var sec_remainder = Math.floor(split % 60);
                var split_min_sec = Math.floor(split / 60) + ":" + ("0" + sec_remainder).slice(-2);
                html += "<tr><td>" + distance + "</td><td>" + split_min_sec + "</td></tr>";
            }
            html += "</table>";
            return html;
        };

        this.prs = [
            {
                "event": "800",
                "text": "800m (Min:Sec)",
                "distance": 800.0,
                "showHours": false,
                "hours": "",
                "minutes": "",
                "seconds": ""
            },
            {
                "event": "Mile",
                "text": "Mile (Min:Sec)",
                "distance": 1609.0,
                "showHours": false,
                "hours": "",
                "minutes": "",
                "seconds": ""
            },
            {
                "event": "3000",
                "text": "3k",
                "distance": 3000.0,
                "showHours": false,
                "hours": "",
                "minutes": "",
                "seconds": ""
            },
            {
                "event": "5k",
                "text": "5k",
                "distance": 5000.0,
                "showHours": false,
                "hours": "",
                "minutes": "",
                "seconds": ""
            },
            {
                "event": "10k",
                "text": "10k",
                "distance": 10000.0,
                "showHours": false,
                "hours": "",
                "minutes": "",
                "seconds": ""
            },
            {
                "event": "Half",
                "text": "Half (Hour:Min)",
                "distance": 13.1 * 1609,
                "showHours": true,
                "hours": "",
                "minutes": "",
                "seconds": ""
            },
            {
                "event": "Marathon",
                "text": "Marathon (Hour:Min)",
                "distance": 26.2 * 1609,
                "showHours": true,
                "hours": "",
                "minutes": "",
                "seconds": ""
            }
        ];

        this.splitTableHtml = "";
        this.showResults = function () {
            return this.splitTableHtml != "";
        };

        this.resetSplits = function () {
            this.splitTableHtml = "";
        };
        this.calculateSplits = function () {
            console.log("calculateSplits");
            this.splitTableHtml = "";
            this.splitTableHtml += this.generateHtmlBoilerplate();

            for (var i = 0; i < this.prs.length; i++) {
                if (this.prs[i].showHours) {
                    this.prs[i].seconds = 0;
                }

                if (!isNaN(parseInt(this.prs[i].minutes)) && !isNaN(parseInt(this.prs[i].seconds))) {
                    if (isNaN(parseInt(this.prs[i].hours))) {
                        this.prs[i].hours = 0;
                    }
                    this.splitTableHtml += this.dumpPaceTable(this.prs[i].distance, parseInt(this.prs[i].hours), parseInt(this.prs[i].minutes), parseInt(this.prs[i].seconds));
                }
            }

            this.splitTableHtml += "</div>";

            console.log("splitTableHtml" + this.splitTableHtml);
        };
    });
})
();