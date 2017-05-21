/**
 * Created by anupm on 5/20/2017.
 */


angular
    .module('AMST')
    .service('dataService', dataService);

dataService.$inject = [
    '$http'
];

function dataService($http){
    this.public = function (callbackFunc) {
        $http.get('http://localhost:3001/api/public').then(function(result) {
            callbackFunc(result.data.message);
        }, function(error) {
            console.log(error);
        });
    };

    this.private = function (callbackFunc) {
        $http.get('http://localhost:3001/api/private').then(function(result) {
            callbackFunc(result.data.message);
        }, function(error) {
            console.log(error);
        });
    };
}