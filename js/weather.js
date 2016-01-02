(function () {
    var app = angular.module('weather-module', []);

    //injector passes these services at load time by dependency injection into the controller as arguments
    app.controller('WeatherController', ['$http', function ($http) {
        var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22brooklyn%2C%20ny%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

        var store = this;
        this.prettyWeather = [];
        this.weather = [];

        this.toCelsius = function(text) {
            var f = parseFloat(text);
            var c = f - 32 * (5 / 9);
            c = c.toFixed(1);
            return c.toString();
        };

        this.toMillibars = function(text) {
            var inches = parseFloat(text);
            var mb = 33.8637526 * inches;
            mb = mb.toFixed(0);
            return mb;
        };

        this.toKnots = function(mph) {
            var mph = parseFloat(mph);
            return (mph/1.151).toFixed(0);
        }

        this.toKph = function(mph) {
            var mph = parseFloat(mph);
            return (mph * 1.609).toFixed(0);
        }

        this.makeWeatherPretty = function (data) {
            var x = data;
            var str = "<h3>" + x.query.results.channel.item.title + "</h3>";
            str += "<table class=\"table table-striped table-condensed table-bordered table-hover \">";
            str += "<tr><th></th><th>Imperial</th><th>Metric</th></tr><tr>";
            str += "<tr>";
            str += "<td>Temp</td><td>";
            str += x.query.results.channel.item.condition.temp + "&deg;F";
            str += "</td><td>" + this.toCelsius(x.query.results.channel.item.condition.temp) + "&deg;C";
            str += "</td>";
            str += "</tr>";
            str += "<tr>";
            str += "<td>Pressure</td><td>";
            str += x.query.results.channel.atmosphere.pressure + " inches";
            str += "</td><td>" + this.toMillibars(x.query.results.channel.atmosphere.pressure) + " MB";
            str += "</td>";
            str += "</tr>";
            str += "<tr>";
            str += "<td>Humidity</td><td>";
            str += x.query.results.channel.atmosphere.humidity + "%";
            str += "</td>";
            str += "</tr>";
            str += "<tr>";
            str += "<td>Wind</td><td>";
            str += this.toKnots(x.query.results.channel.wind.speed) + " knots";
            str += "</td><td>";
            str += this.toKph(x.query.results.channel.wind.speed) + " km/h";
            str += "</td></tr>";
            str += "</table>";
            console.log(typeof x);

            return (str);
        };

        $http({method: 'GET', url: weatherUrl}).success(function (data) {
            store.weather = data;
            store.prettyWeather = store.makeWeatherPretty(store.weather);
        });
    }]);
})();



