(function () {
    var app = angular.module('nbr-filters', []);

    app.filter('unsafe', function ($sce) {
        return function (text) {
            if (typeof text == "string") {
                return $sce.trustAsHtml(text);
            }
        }
    });
})
();