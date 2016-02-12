(function () {
    
    'use strict';

    angular.module('login.module', [
        'sitehosting.core'
    ]);

    angular.module('login.module').config(route);

    function route($routeProvider) {
        $routeProvider
        .when('/login', {
            templateUrl: 'app/login/login.index.html',
            controller: 'LoginIndexController',
            title: 'Realizar login'
        })
        .otherwise({
            redirectTo: '/'
        });
    }

})();