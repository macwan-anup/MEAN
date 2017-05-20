/**
 * Created by anupm on 5/20/2017.
 */
function landingScrollspy(){
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.scrollspy({
                target: '.navbar-fixed-top',
                offset: 80
            });
        }
    }
}

angular
    .module('AMST')
    .directive('landingScrollspy', landingScrollspy);