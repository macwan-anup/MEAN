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
//Requiring the Controllers
require('./controllers/index.controller');
require('./controllers/callback.controller');
//Requiring the Directives
require('./directives/LandingScrollspy.directive');
//Requiring the Services
require('./services/auth0.service');