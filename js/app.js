(function () {
    var app = angular.module('nbr-utils', []);

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

        this.showAbout = function () {
            return this.selection == 2;
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

            var pace_distance_km = (pace_distance / 1000);//.toFixed(2);
            var pace_distance_miles = (pace_distance / 1609);//.toFixed(2);
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
                "text": "800m (Min: Sec)",
                "distance": 800.0,
                "showHours": false,
                "hours": "",
                "minutes": "",
                "seconds": ""
            },
            {
                "event": "Mile",
                "text": "Mile (Min: Sec)",
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
        this.showResults = function() {
            return this.splitTableHtml != "";
        };

        this.resetSplits = function() {
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

    app.controller('AgeGradeController', function () {
        this.ag = {}; // empty object for form
        this.ag.age = 28;
        this.ag.sex = 0;
        this.table = "";

        this.setSex = function (sex) {
            this.ag.sex = sex;
        };

        this.initRow = function (event_id) {
            newRow = {};
            newRow.event_id = event_id;
            newRow.age_std = arguments[1];
            newRow.agenums = new Array();
            for (var i = 2; i < arguments.length; i++) {
                newRow.agenums[i - 2] = arguments[i];
            }
            return (newRow);
        };

        this.estimateAgeGradeTime = function () {
            this.table = "";

            var AG_ages = new Array(8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 49, 50, 55, 59, 60, 65, 69, 70, 75, 79, 80, 85, 90, 95, 100);

            var AGfactors = new Array();
            var i = -0;
            AGfactors[i++] = new this.initRow("Mile", 224.39, 0.7433, 0.7813, 0.8152, 0.8456, 0.8727, 0.8969, 0.9185, 0.9376, 0.9546, 0.9694, 0.9824, 0.9936, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9963, 0.9896, 0.9829, 0.9761, 0.9694, 0.9626, 0.9559, 0.9491, 0.9149, 0.8870, 0.8800, 0.8440, 0.8139, 0.8064, 0.7666, 0.7324, 0.7239, 0.6775, 0.6365, 0.6263, 0.5683, 0.4988, 0.4050, 0.2498);
            //AGfactors[i++] = new this.initRow("3K", 448.96, 0.7645, 0.8020, 0.8350, 0.8640, 0.8894, 0.9117, 0.9311, 0.9480, 0.9625, 0.9750, 0.9856, 0.9914, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9979, 0.9912, 0.9844, 0.9777, 0.9709, 0.9642, 0.9574, 0.9232, 0.8953, 0.8883, 0.8523, 0.8222, 0.8147, 0.7749, 0.7407, 0.7322, 0.6858, 0.6448, 0.6346, 0.5766, 0.5071, 0.4133, 0.2581);
            AGfactors[i++] = new this.initRow("5K", 778.4, 0.7809, 0.8177, 0.8496, 0.8772, 0.9011, 0.9216, 0.9393, 0.9543, 0.9671, 0.9779, 0.9868, 0.9925, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9963, 0.9895, 0.9827, 0.9760, 0.9692, 0.9624, 0.9281, 0.9001, 0.8931, 0.8570, 0.8268, 0.8193, 0.7794, 0.7452, 0.7366, 0.6901, 0.6491, 0.6388, 0.5807, 0.5111, 0.4172, 0.2619);
            AGfactors[i++] = new this.initRow("5M/8K", 1278.9, 0.7902, 0.8264, 0.8574, 0.8841, 0.9069, 0.9264, 0.9429, 0.9569, 0.9686, 0.9784, 0.9864, 0.9929, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9934, 0.9866, 0.9797, 0.9729, 0.9661, 0.9316, 0.9034, 0.8964, 0.8601, 0.8298, 0.8222, 0.7821, 0.7477, 0.7391, 0.6924, 0.6512, 0.6409, 0.5826, 0.5128, 0.4187, 0.2632);
            AGfactors[i++] = new this.initRow("10K", 1618.4, 0.7919, 0.8279, 0.8588, 0.8853, 0.9078, 0.9271, 0.9433, 0.9570, 0.9685, 0.9780, 0.9858, 0.9921, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9953, 0.9884, 0.9816, 0.9747, 0.9679, 0.9333, 0.9051, 0.8980, 0.8616, 0.8312, 0.8236, 0.7834, 0.7489, 0.7403, 0.6935, 0.6522, 0.6419, 0.5835, 0.5136, 0.4194, 0.2638);
            //AGfactors[i++] = new this.initRow("12K", 1962, 0.7922, 0.8284, 0.8593, 0.8858, 0.9084, 0.9275, 0.9438, 0.9574, 0.9689, 0.9783, 0.9860, 0.9923, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9970, 0.9901, 0.9833, 0.9764, 0.9696, 0.9350, 0.9068, 0.8997, 0.8633, 0.8329, 0.8253, 0.7851, 0.7506, 0.7420, 0.6952, 0.6539, 0.6436, 0.5852, 0.5153, 0.4211, 0.2655);
            //AGfactors[i++] = new this.initRow("15K", 2486, 0.7904, 0.8265, 0.8574, 0.8838, 0.9064, 0.9256, 0.9419, 0.9557, 0.9671, 0.9767, 0.9845, 0.9908, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9989, 0.9921, 0.9852, 0.9784, 0.9715, 0.9368, 0.9085, 0.9014, 0.8649, 0.8344, 0.8268, 0.7865, 0.7519, 0.7433, 0.6964, 0.6550, 0.6447, 0.5862, 0.5162, 0.4219, 0.2662);
            //AGfactors[i++] = new this.initRow("10-Mile", 2680, 0.7895, 0.8256, 0.8566, 0.8831, 0.9058, 0.9251, 0.9414, 0.9552, 0.9668, 0.9764, 0.9842, 0.9906, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9996, 0.9928, 0.9859, 0.9791, 0.9722, 0.9375, 0.9092, 0.9021, 0.8656, 0.8351, 0.8275, 0.7872, 0.7526, 0.7440, 0.6971, 0.6557, 0.6454, 0.5869, 0.5169, 0.4226, 0.2669);
            //AGfactors[i++] = new this.initRow("20K", 3380, 0.7858, 0.8222, 0.8534, 0.8802, 0.9032, 0.9228, 0.9395, 0.9536, 0.9654, 0.9753, 0.9834, 0.9900, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9951, 0.9882, 0.9814, 0.9745, 0.9398, 0.9115, 0.9044, 0.8679, 0.8374, 0.8298, 0.7895, 0.7549, 0.7463, 0.6994, 0.6580, 0.6477, 0.5892, 0.5192, 0.4249, 0.2692);
            AGfactors[i++] = new this.initRow("Half", 3579, 0.7847, 0.8211, 0.8524, 0.8793, 0.9024, 0.9221, 0.9389, 0.9531, 0.9650, 0.9750, 0.9832, 0.9899, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9957, 0.9888, 0.9820, 0.9751, 0.9404, 0.9121, 0.9050, 0.8685, 0.8380, 0.8304, 0.7901, 0.7555, 0.7469, 0.7000, 0.6586, 0.6483, 0.5898, 0.5198, 0.4255, 0.2698);
            //AGfactors[i++] = new this.initRow("30K", 5235, 0.7755, 0.8124, 0.8444, 0.8721, 0.8960, 0.9166, 0.9343, 0.9494, 0.9622, 0.9730, 0.9820, 0.9894, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9996, 0.9928, 0.9859, 0.9790, 0.9442, 0.9158, 0.9087, 0.8721, 0.8415, 0.8339, 0.7935, 0.7589, 0.7502, 0.7032, 0.6618, 0.6514, 0.5928, 0.5227, 0.4283, 0.2725);
            AGfactors[i++] = new this.initRow("Mar", 7610, 0.7645, 0.8020, 0.8348, 0.8634, 0.8884, 0.9101, 0.9289, 0.9452, 0.9591, 0.9710, 0.9810, 0.9894, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9973, 0.9904, 0.9835, 0.9486, 0.9201, 0.9130, 0.8763, 0.8457, 0.8380, 0.7975, 0.7628, 0.7541, 0.7070, 0.6655, 0.6551, 0.5964, 0.5262, 0.4317, 0.2758);
            AGfactors[i++] = new this.initRow("Mile F", 248.98, 0.7660, 0.8111, 0.8492, 0.8813, 0.9080, 0.9299, 0.9479, 0.9623, 0.9739, 0.9829, 0.9898, 0.9951, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9934, 0.9857, 0.9780, 0.9703, 0.9625, 0.9548, 0.9470, 0.9393, 0.9002, 0.8684, 0.8604, 0.8195, 0.7855, 0.7770, 0.7323, 0.6942, 0.6847, 0.6334, 0.5885, 0.5773, 0.5144, 0.4400, 0.3413, 0.1812);
            //AGfactors[i++] = new this.initRow("3K F", 498, 0.7753, 0.8198, 0.8572, 0.8883, 0.9140, 0.9350, 0.9521, 0.9657, 0.9764, 0.9848, 0.9912, 0.9960, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9939, 0.9862, 0.9784, 0.9707, 0.9629, 0.9552, 0.9474, 0.9082, 0.8763, 0.8683, 0.8273, 0.7932, 0.7847, 0.7399, 0.7017, 0.6922, 0.6408, 0.5958, 0.5846, 0.5216, 0.4471, 0.3483, 0.1881);
            AGfactors[i++] = new this.initRow("5K F", 863.7, 0.7731, 0.8177, 0.8553, 0.8866, 0.9125, 0.9337, 0.9509, 0.9647, 0.9756, 0.9841, 0.9907, 0.9956, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9990, 0.9913, 0.9835, 0.9758, 0.9680, 0.9603, 0.9525, 0.9133, 0.8814, 0.8734, 0.8324, 0.7983, 0.7898, 0.7450, 0.7068, 0.6973, 0.6459, 0.6009, 0.5897, 0.5267, 0.4522, 0.3534, 0.1932);
            AGfactors[i++] = new this.initRow("5M/8K F", 1419, 0.7646, 0.8099, 0.8481, 0.8802, 0.9069, 0.9289, 0.9469, 0.9614, 0.9729, 0.9820, 0.9890, 0.9943, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9954, 0.9876, 0.9798, 0.9721, 0.9643, 0.9565, 0.9172, 0.8852, 0.8772, 0.8361, 0.8019, 0.7934, 0.7485, 0.7103, 0.7007, 0.6492, 0.6042, 0.5929, 0.5298, 0.4552, 0.3563, 0.1960);
            AGfactors[i++] = new this.initRow("10K F", 1795, 0.7591, 0.8047, 0.8434, 0.8760, 0.9032, 0.9257, 0.9442, 0.9591, 0.9711, 0.9805, 0.9879, 0.9935, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9974, 0.9896, 0.9818, 0.9741, 0.9663, 0.9585, 0.9192, 0.8872, 0.8792, 0.8381, 0.8039, 0.7954, 0.7505, 0.7123, 0.7027, 0.6512, 0.6062, 0.5949, 0.5318, 0.4572, 0.3583, 0.1980);
            //AGfactors[i++] = new this.initRow("12K F", 2175, 0.7463, 0.7926, 0.8322, 0.8659, 0.8943, 0.9180, 0.9375, 0.9535, 0.9665, 0.9768, 0.9849, 0.9911, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9991, 0.9913, 0.9835, 0.9758, 0.9680, 0.9602, 0.9209, 0.8889, 0.8809, 0.8398, 0.8056, 0.7971, 0.7522, 0.7140, 0.7044, 0.6529, 0.6079, 0.5966, 0.5335, 0.4589, 0.3600, 0.1997);
            //AGfactors[i++] = new this.initRow("15K F", 2751, 0.7479, 0.7940, 0.8335, 0.8671, 0.8953, 0.9189, 0.9383, 0.9543, 0.9671, 0.9774, 0.9854, 0.9916, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9934, 0.9856, 0.9779, 0.9701, 0.9623, 0.9230, 0.8910, 0.8830, 0.8419, 0.8077, 0.7992, 0.7543, 0.7161, 0.7065, 0.6550, 0.6100, 0.5987, 0.5356, 0.4610, 0.3621, 0.2018);
            //AGfactors[i++] = new this.initRow("10-Mile F", 2963, 0.7459, 0.7921, 0.8317, 0.8655, 0.8939, 0.9176, 0.9373, 0.9534, 0.9664, 0.9768, 0.9850, 0.9913, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9941, 0.9863, 0.9786, 0.9708, 0.9630, 0.9237, 0.8917, 0.8837, 0.8426, 0.8084, 0.7999, 0.7550, 0.7168, 0.7072, 0.6557, 0.6107, 0.5994, 0.5363, 0.4617, 0.3628, 0.2025);
            //AGfactors[i++] = new this.initRow("20K F", 3730, 0.7398, 0.7863, 0.8264, 0.8606, 0.8895, 0.9138, 0.9340, 0.9506, 0.9641, 0.9749, 0.9835, 0.9902, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9963, 0.9885, 0.9807, 0.9729, 0.9651, 0.9257, 0.8936, 0.8856, 0.8444, 0.8102, 0.8016, 0.7566, 0.7183, 0.7087, 0.6571, 0.6120, 0.6007, 0.5375, 0.4628, 0.3638, 0.2034);
            AGfactors[i++] = new this.initRow("Half F", 3948, 0.7384, 0.7850, 0.8251, 0.8594, 0.8885, 0.9129, 0.9332, 0.9499, 0.9635, 0.9745, 0.9831, 0.9899, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9969, 0.9891, 0.9813, 0.9735, 0.9657, 0.9263, 0.8942, 0.8862, 0.8450, 0.8108, 0.8022, 0.7572, 0.7189, 0.7093, 0.6577, 0.6126, 0.6013, 0.5381, 0.4634, 0.3644, 0.2040);
            //AGfactors[i++] = new this.initRow("30K F", 5752, 0.7304, 0.7771, 0.8177, 0.8526, 0.8823, 0.9074, 0.9284, 0.9459, 0.9601, 0.9717, 0.9809, 0.9882, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9932, 0.9854, 0.9776, 0.9698, 0.9304, 0.8983, 0.8903, 0.8491, 0.8149, 0.8063, 0.7613, 0.7230, 0.7134, 0.6618, 0.6167, 0.6054, 0.5422, 0.4675, 0.3685, 0.2081);
            AGfactors[i++] = new this.initRow("Mar F", 8331, 0.7258, 0.7727, 0.8134, 0.8485, 0.8785, 0.9040, 0.9254, 0.9432, 0.9579, 0.9699, 0.9794, 0.9870, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 1.0000, 0.9979, 0.9901, 0.9823, 0.9745, 0.9351, 0.9030, 0.8950, 0.8538, 0.8196, 0.8110, 0.7660, 0.7277, 0.7181, 0.6665, 0.6214, 0.6101, 0.5469, 0.4722, 0.3732, 0.2128);

            var numages = AG_ages.length;
            var numfacs = i;
            var numdist = AGfactors.length / 2;//number of distances (1 mile thru marathon) in table

            if ((this.ag.age < 8) || (this.ag.age > 100)) {
                alert("\nPlease Enter a Valid Age\n (between 8 and 100).");
                return false;
            }
            var age = this.ag.age;

            var mfstart = 0;
            if (this.ag.sex == 0) {
                mfstart = numdist;
            }
            var o = this;
            var title = String("AG Table for " + age + " year old " + (this.ag.sex > 0 ? "Male" : "Female"));

            this.table = "<h5>" + title + "</h5>";

            // you could use the twitter bootstrap "table-condensed" class
            this.table += "<table class=\"stat\" border=\"1\">";

            //Write table headers
            this.table += "<tr><td/>";
            for (var x = 0; x < numdist; x++) {
                this.table += "<td>";
                this.table += AGfactors[x].event_id;
                this.table += "</td>";
            }

            // fill in each row (percentile) for each event
            for (var ag_percentile = 60; ag_percentile <= 100; ag_percentile++) {
                //for each AG level of this event....
                this.table += "</tr><tr";
                if (ag_percentile === 70 || ag_percentile === 80) {
                    this.table += " class=\"milestone\"";
                }

                this.table += ">";
                this.table += "<td><b>" + ag_percentile + "</b></td>";

                for (var distanceIndex = 0; distanceIndex < numdist; distanceIndex++) {

                    var distance = distanceIndex;
                    var distanceFactor = mfstart + distance;

                    // find age in AG_ages array that is closest to actual age
                    // then calculate interpolation factor if necessary
                    var iage1 = -1;
                    var iage2 = 0;
                    var i = 0;
                    while ((i < numages) && (AG_ages[i] < age)) {
                        i++;
                    }

                    if ((i > 0) && (i < numages - 1)) {
                        iage1 = i - 1;
                        iage2 = i;
                    }
                    var intfac = 0.0;
                    if ((AG_ages[iage1] != age) && (iage1 != iage2)) {
                        intfac = (age - AG_ages[iage1]) / (AG_ages[iage2] - AG_ages[iage1]);

                    }

                    // calculate actual age-graded factor for age, sex, and distance
                    var factor = 1.0;
                    if (iage1 >= 0) {
                        factor = AGfactors[distanceFactor].agenums[iage1];
                        if (intfac > 0) {
                            if (iage1 < numages) {
                                factor = intfac * AGfactors[distanceFactor].agenums[iage2] + (1 - intfac) * factor;
                            }
                        }
                    }

                    // calculate percentile
                    var ostand = AGfactors[distanceFactor].age_std;
                    // var achper = (ostand / totalseconds) * 1000.0;
                    // this.ag_percentile = roundit(achper,100) / 10.0;

                    var achper = ag_percentile * 10.0;
                    var totalseconds = (ostand * 1000.0) / achper / factor;

                    var debug = 0;

                    if (debug)    console.log(totalseconds + "<br>");
                    var totalseconds_temp = totalseconds;
                    // calculate hours by dividing by 3600
                    var ag_hrs = Math.floor(totalseconds_temp / 3600);
                    totalseconds_temp = totalseconds_temp - (ag_hrs * 3600);

                    // calculate minutes by dividing by 60
                    var ag_mns = Math.floor(totalseconds_temp / 60);
                    totalseconds_temp = totalseconds_temp - (ag_mns * 60);

                    // calculate seconds using remainder
                    var ag_scs = Math.floor(totalseconds_temp);
                    this.table += "<td>" + ag_hrs + ":" + (ag_mns < 10 ? "0" + ag_mns : ag_mns) + ":" + (ag_scs < 10 ? "0" + ag_scs : ag_scs) + "</td>";
                }
                this.table += "</tr>";
            }
            this.table += "</table>";
        }
    });

    // case should be camel, will expand to ag-calculator in the html code
    app.directive('splitCalculator', function () {
        return {
            // element 'E' (behaviors) or
            // attribute 'A' (mixins to html like tooltip)
            restrict: 'E',

            // template URL (similar to an ng-include)
            templateUrl: 'split-calculator.html'
        };
    });

    // case should be camel, will expand to ag-calculator in the html code
    app.directive('agCalculator', function () {
        return {
            // element 'E' (behaviors) or
            // attribute 'A' (mixins to html like tooltip)
            restrict: 'E',

            // template URL (similar to an ng-include)
            templateUrl: 'ag.html'
        };
    });

    app.directive('aboutPage', function () {
        return {
            // element 'E' (behaviors) or
            // attribute 'A' (mixins to html like tooltip)
            restrict: 'E',

            // template URL (similar to an ng-include)
            templateUrl: 'about.html'
        };
    });

    app.filter('unsafe', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    });
})
();