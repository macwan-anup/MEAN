/**
 * Created by anupm on 5/12/2017.
 */

angular
    .module('amst')
    .service('dataService',['$http', function($http){
        this.checkUserExist = function (user) {
           // currentUser = angular.copy(user);
            return user;
        }
        this.getCurrentUser = function () {
            return currentUser;
        }
    }]);

currentUser = {
    _id:1,
    amst_id:'am_1',
    name:'Anup Macwan',
    profile_img:'img/profile_small.jpg',
    amst_ranking:'Novice',
    amst_category:null,


}

users = [
    {
        name:"anupmac6",
        pass:"123456"
    }
];