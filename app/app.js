/**
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

global.jQuery = require('jquery');
global.$ = require('jquery');

require('./css/animate.css');
//Requiring the Config File
require('./app.config');
//Requiring the Directives
require('./directives/LandingScrollspy.directive');
require('./directives/sideNavigation.directive');
require('./directives/minimizeSidebar.directive');
//Requiring the Controllers
require('./controllers/index.controller');
require('./controllers/callback.controller');
require('./controllers/dashboard.controller');
require('./controllers/home.controller');

//Requiring the Services
require('./services/auth0.service');
require('./services/userAuth.service');
require('./services/data.service');