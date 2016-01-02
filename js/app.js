(function () {
    var app = angular.module('nbr-utils', ['ag-module','splits-module', 'weather-module', 'nbr-filters']);

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

    app.directive('weatherPage', function () {
        return {
            // element 'E' (behaviors) or
            // attribute 'A' (mixins to html like tooltip)
            restrict: 'E',

            // template URL (similar to an ng-include)
            templateUrl: 'weather.html'
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
})
();