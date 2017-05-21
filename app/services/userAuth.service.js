/**
 * Created by anupm on 5/20/2017.
 */


angular
    .module('AMST')
    .service('userAuthService', userAuthService);

userAuthService.$inject = [

];

function userAuthService(){
    this.userExist = function () {
        return localStorage.getItem('amst_user') !== null ;
    };
}