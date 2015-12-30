(function () {
    var app = angular.module('splits', []);

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

})();