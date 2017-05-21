webpackJsonp([0],{

/***/ 32:
/***/ (function(module, exports) {

/**
 * Created by anupm on 5/20/2017.
 */

angular
    .module('AMST')
    .service('authService',authService);

authService.$inject = ['$state','angularAuth0','$timeout'];

function authService($state, angularAuth0, $timeout) {

    var userProfile;

    function login() {
        angularAuth0.authorize();
    }

    function handleAuthentication() {
        angularAuth0.parseHash(function(err, authResult) {
            if (authResult && authResult.idToken) {
                setSession(authResult);
                $state.go('index');
            } else if (err) {
                $timeout(function() {
                    $state.go('index');
                });
                console.log(err);
                alert('Error: ' + err.error + '. Check the console for further details.');
            }
        });
    }

    function getProfile(cb) {
        var accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('Access token must exist to fetch profile');
        }
        angularAuth0.client.userInfo(accessToken, function(err, profile) {
            if (profile) {
                setUserProfile(profile);
            }
            cb(err, profile);
        });
    }

    function setUserProfile(profile) {
        userProfile = profile;
    }

    function getCachedProfile() {
        return userProfile;
    }

    function setSession(authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    function logout() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        $state.go('index');
    }

    function isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    return {
        login: login,
        getProfile: getProfile,
        getCachedProfile: getCachedProfile,
        handleAuthentication: handleAuthentication,
        logout: logout,
        isAuthenticated: isAuthenticated
    }
}

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by anupm on 5/20/2017.
 */


__webpack_require__(32);
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

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

/**
 * Created by anupm on 5/20/2017.
 */
angular
    .module('AMST')
    .controller('CallbackController', callbackController);

function callbackController() {}

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

/**
 * Created by anupm on 5/20/2017.
 */
function minimizeSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};

angular
    .module('AMST')
    .directive('minimizeSidebar',minimizeSidebar);

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

/**
 * Created by anupm on 5/20/2017.
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();

            });

            // Colapse menu in mobile mode after click on element
            var menuElement = $('#side-menu a:not([href$="\\#"])');
            menuElement.click(function(){
                if ($(window).width() < 769) {
                    $("body").toggleClass("mini-navbar");
                }
            });

            // Enable initial fixed sidebar
            if ($("body").hasClass('fixed-sidebar')) {
                var sidebar = element.parent();
                sidebar.slimScroll({
                    height: '100%',
                    railOpacity: 0.9,
                });
            }
        }
    };
};
angular
    .module('AMST')
    .directive('sideNavigation',sideNavigation);

/***/ }),

/***/ 75:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Created by anupm on 5/20/2017.
 */

angular
    .module('AMST' , [
        'ui.router',
        'oc.lazyLoad',
        'ui.bootstrap',
        'ngIdle',
        'ngSanitize',
        'auth0.auth0',
        'angular-jwt'
    ]);

global.jQuery = __webpack_require__(5);
global.$ = __webpack_require__(5);

__webpack_require__(75);
//Requiring the Config File
__webpack_require__(61);
//Requiring the Directives
__webpack_require__(64);
__webpack_require__(66);
__webpack_require__(65);
//Requiring the Controllers
__webpack_require__(63);
__webpack_require__(62);

//Requiring the Services
__webpack_require__(32);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ })

},[81]);