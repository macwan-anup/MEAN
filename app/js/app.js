/**
 * Created by anupm on 5/11/2017.
 */

angular
    .module('amst',[
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'ngIdle',                       // Idle timer
        'ngSanitize',                   // ngSanitize
        'rzModule',
        'xeditable',
        'ngAutocomplete'
    ])
    .run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });
