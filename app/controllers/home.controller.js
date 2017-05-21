/**
 * Created by anupm on 5/20/2017.
 */
angular
    .module('AMST')
    .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [
    '$scope',
    'dataService'
];
function HomeCtrl($scope,dataService) {
    $scope.pingPublic = function(){
        dataService.public(function(data){
            console.log(data);
        })
    };

    $scope.pingPrivate = function(){
        dataService.private(function(data){
            console.log(data);
        })
    };

}