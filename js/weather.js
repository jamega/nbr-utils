(function () {
    var app = angular.module('weather-module', []);

    //injector passes these services at load time by dependency injection into the controller as arguments
    app.controller('WeatherController', ['$http', function ($http) {
        var weatherUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22brooklyn%2C%20ny%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

        var weatherCtrl = this;
        this.prettyWeather = [];
        this.weather = [];
        this.outfit = [];

        this.toCelsius = function (text) {
            var f = parseFloat(text);
            var c = ((f - 32) * 5 ) / 9;
            c = c.toFixed(0);
            return c.toString();
        };

        this.toInchesOfMercury = function (text) {
            var mb = parseFloat(text);
            var inches =  mb / 33.8637526;
            inches = inches.toFixed(2);
            return inches;
        };

        this.toKnots = function (mph) {
            var mph = parseFloat(mph);
            return (mph / 1.151).toFixed(0);
        }

        this.toKph = function (mph) {
            var mph = parseFloat(mph);
            return (mph * 1.609).toFixed(0);
        }

        this.makeWeatherPretty = function (data) {
            var x = data;
            var str = "<h4>" + x.query.results.channel.item.title + "</h4>";
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
            str += this.toInchesOfMercury(x.query.results.channel.atmosphere.pressure) + "\"";
            str += "</td><td>" + x.query.results.channel.atmosphere.pressure + " MB";
            str += "</td>";
            str += "</tr>";
            str += "<tr>";
            str += "<td>Humidity</td><td>";
            str += x.query.results.channel.atmosphere.humidity + "%";
            str += "</td><td>";
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

        this.getOutfit = function (data) {
            var x = data;
            var o = [];
            var temperature = x.query.results.channel.item.condition.temp;

            if (temperature >= 100)
            {
                o.push("No shirt");
                o.push("Short shorts");
            }
            if (temperature >= 60 && temperature < 100)
            {
                o.push("Singlet/Sports Bra");
                o.push("Short Shorts");
                o.push("Ankle Socks");
            }
            else if (temperature >= 52 && temperature < 60)
            {
                o.push("Light long sleeve");
                o.push("Short Shorts");
                o.push("Ankle Socks");
            }
            else if (temperature >= 44 && temperature < 52)
            {
                o.push("Thin gloves");
                o.push("Nike Combat Turtleneck");
                o.push("Light long sleeve");
                o.push("Shorts (or tights)");
                o.push("Ankle or 1/4 length socks");
            }
            else if (temperature >= 38 && temperature < 44)
            {
                o.push("Hat");
                o.push("Thin gloves");
                o.push("Nike Combat Turtleneck");
                o.push("Light long sleeve");
                o.push("Tights");
                o.push("1/4 length socks");
            }
            else if (temperature >= 32 && temperature < 38)
            {
                o.push("Hat");
                o.push("Medium gloves");
                o.push("Nike Combat Turtleneck");
                o.push("Quarter-zip long sleeve");
                o.push("Tights");
                o.push("1/4 length socks");
            }
            else if (temperature >= 26 && temperature < 32)
            {
                o.push("hat");
                o.push("Medium gloves");
                o.push("Light jacket");
                o.push("Nike Combat Turtleneck");
                o.push("Quarter-zip long sleeve");
                o.push("Tights");
                o.push("1/4 length socks");

            }
            else if (temperature >= 0 && temperature < 26)
            {
                o.push("Hat");
                o.push("Mittens/gloves");
                o.push("Light jacket");
                o.push("Nike Combat Turtleneck");
                o.push("Quarter-zip long sleeve");
                o.push("Tights");
                o.push("Under-tights");
                o.push("1/4 length socks");
            }
            else {
                o.push("you're on your own today");
            }

            return o;
        };

        weatherCtrl.errors = null;
        $http({method: 'GET', url: weatherUrl})
            .success(function (data) {
                weatherCtrl.errors = null;
                weatherCtrl.weather = data;
                weatherCtrl.prettyWeather = weatherCtrl.makeWeatherPretty(weatherCtrl.weather);
                weatherCtrl.outfit = weatherCtrl.getOutfit(weatherCtrl.weather);
            })
            .catch(function(data) {
                weatherCtrl.errors = "Error retrieving data from yahoo weather API";
            });
    }]);
})();



