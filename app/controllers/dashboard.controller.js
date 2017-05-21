/**
 * Created by anupm on 5/20/2017.
 */
angular
    .module('AMST')
    .controller('DashboardCtrl', dashboardCtrl);

dashboardCtrl.$inject = [
    '$scope',
    'userAuthService',
    '$state'
];
function dashboardCtrl($scope,userAuthService,$state) {
    $scope.userAuth = userAuthService;

    if(!userAuthService.userExist()){
        $state.go('index');
    }
}