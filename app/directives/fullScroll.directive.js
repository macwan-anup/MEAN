/**
 * Created by anupm on 5/20/2017.
 */
function fullScroll($timeout){
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.slimscroll({
                    height: '100%',
                    railOpacity: 0.9
                });

            });
        }
    };
}

angular
    .module('AMST')
    .directive('fullScroll',fullScroll)