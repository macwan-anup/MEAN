/**
 * Created by anupm on 5/20/2017.
 */


angular
    .module('AMST')
    .controller('IndexCtrl', indexCtrl);

indexCtrl.$inject = [
    '$scope',
    'authService'
];

function indexCtrl($scope,authService){
    $scope.auth = authService;
}