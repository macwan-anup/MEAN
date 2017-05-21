/**
 * Created by anupm on 5/20/2017.
 */


require('./services/auth0.service');
angular
    .module('AMST')
    .config(config)
    .run(function($rootScope, $state){
        $rootScope.$state = $state;
    })
    .run(run);
//CONFIG
config.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    '$httpProvider',
    'angularAuth0Provider',
    'jwtOptionsProvider',
    '$ocLazyLoadProvider',
    'IdleProvider',
    'KeepaliveProvider'
];

function config(
    $stateProvider,
    $locationProvider,
    $urlRouterProvider,
    $httpProvider,
    angularAuth0Provider,
    jwtOptionsProvider,
    $ocLazyLoadProvider,
    IdleProvider,
    KeepaliveProvider
) {

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
        clientID: AUTH0_CLIENT_ID,
        domain: AUTH0_DOMAIN,
        responseType: 'token id_token',
        audience: 'http://localhost:3001',//change the audience
        redirectUri: AUTH0_CALLBACK_URL,
        scope: 'openid profile read:messages'
    });

    jwtOptionsProvider.config({
        tokenGetter: function() {
            return localStorage.getItem('access_token');
        },
        whiteListedDomains: ['localhost']
    });

    $httpProvider.interceptors.push('jwtInterceptor');

    $urlRouterProvider.otherwise('/login');

    // Comment out the line below to run the app
    // without HTML5 mode (will use hashes in routes)
    $locationProvider.html5Mode(true);

    $ocLazyLoadProvider.config({
        //Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('index', {
            url: '/login',
            controller: 'IndexCtrl',
            templateUrl: 'views/index.html',
            data: {
                pageTitle:'Login',
                specialClass:'gray-bg'
            }
        })
        .state('callback', {
            url: '/callback',
            controller: 'CallbackController',
            templateUrl: 'views/callback.html',
            data:{pageTitle:'Loading..'}
        })
        .state('dashboard',{
            abstract: true,
            url: "",
            templateUrl: "views/common/layout.html"
        })
        .state('dashboard.home',{
            url: "/home",
            templateUrl: "views/home.html",
            data: { pageTitle: 'Home' }
        })
    ;

}

//RUN
run.$inject = ['authService'];

function run(authService) {
    // Handle the authentication
    // result in the hash
    authService.handleAuthentication();
}