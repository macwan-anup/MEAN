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
            templateUrl: "views/home.html",
            data: { pageTitle: 'Home' }
        })
        .state('home.search',{
            url:"/search",
            templateUrl: "views/search/quick-search.html",
            data: {pageTitle: 'Quick Search', anup: "hi"},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            files:['css/plugins/angular-slider/rzslider.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.advanced-search',{
            url:"/advanced-search",
            templateUrl: "views/search/advanced-search.html",
            data: {pageTitle: 'Advanced Search', anup: "hi"},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            files:['css/plugins/angular-slider/rzslider.min.css']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.profile',{
            url: "/profile",
            templateUrl: "views/profile.html",
            data: {pageTitle: 'Profile'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/sparkline/jquery.sparkline.min.js']
                        },
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        },
                        {
                            files: ['js/plugins/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angles',
                            files: ['js/plugins/chartJs/angles.js']
                        },
                        {
                            files: ['css/plugins/xeditable/xeditable.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.details',{
            url: "/info",
            abstract: true,
            templateUrl: "views/info.html",
            controller: wizardCtrl,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['css/plugins/steps/jquery.steps.css']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css','js/plugins/iCheck/icheck.min.js']
                        }
                    ]);
                }
            }
        })
        .state('home.details.step_one', {
            url: '/step_one',
            templateUrl: 'views/wizard/step_one.html',
            data: { pageTitle: 'Wizard form' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([

                        {
                            files: ['https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDQTpXj82d8UpCi97wzo_nKXL7nYrd4G70','js/plugins/ngautocomplete/ngAutocomplete.js']
                        },
                        {
                            files: ['js/plugins/moment/moment.min.js']
                        },
                        {
                            name: 'datePicker',
                            files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/angular-datepicker.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.details.step_two', {
            url: '/step_two',
            templateUrl: 'views/wizard/step_two.html',
            data: { pageTitle: 'Wizard form' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([

                        {
                            files: ['https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDQTpXj82d8UpCi97wzo_nKXL7nYrd4G70','js/plugins/ngautocomplete/ngAutocomplete.js']
                        },
                        {
                            files: ['js/plugins/moment/moment.min.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.details.step_three', {
            url: '/step_three',
            templateUrl: 'views/wizard/step_three.html',
            data: { pageTitle: 'Wizard form' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.details.step_four', {
            url: '/step_four',
            templateUrl: 'views/wizard/step_four.html',
            data: { pageTitle: 'Wizard form' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.details.step_five', {
            url: '/step_five',
            templateUrl: 'views/wizard/step_five.html',
            data: { pageTitle: 'Wizard form' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.details.step_six', {
            url: '/step_six',
            templateUrl: 'views/wizard/step_six.html',
            data: { pageTitle: 'Wizard form' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.details.step_seven', {
            url: '/step_seven',
            templateUrl: 'views/wizard/step_seven.html',
            data: { pageTitle: 'Wizard form' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        }
                    ]);
                }
            }
        })
        .state('home.mobile-req',{
            url:'/mobile-request',
            templateUrl:'views/mobile-request.html',
            data: {pageTitle:'Mobile Request'}
        })

    ;

    $locationProvider.html5Mode(true);
}