/**
 * Created by anupm on 5/11/2017.
 */

angular
    .module('amst')
    .config(configurationFunction)
    .run(function($rootScope,$state) {
        $rootScope.$state = $state;
    });

function configurationFunction($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, $locationProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise('/login');


    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('login',{
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        .state('sign-up',{
            url: "/sign-up",
            templateUrl: "views/sign-up.html",
            data: { pageTitle: 'Sign Up', specialClass: 'gray-bg' }
        })
        .state('forgot',{
            url: "/forgot-password",
            templateUrl: "views/forgot-password.html",
            data: { pageTitle: 'Forgot Password', specialClass: 'gray-bg' }
        })
        .state('home',{
            abstract: true,
            url: "",
            templateUrl: "views/common/layout.html"
        })
        .state('home.index',{
            url: "/home",
            templateUrl: "views/login.html"
        })

    ;

    $locationProvider.html5Mode(true);
}