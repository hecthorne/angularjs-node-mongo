
(function() {

    'use strict';

    angular.module('sitehosting.app', [
        'sitehosting.core',
        'cliente.module',
        'login.module'
    ]);

    angular.module('sitehosting.core', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngAnimate',
        'ngTable'
    ]);

    angular.module('sitehosting.app').run(Run);

    Run.$inject = ['$rootScope', '$http','$location'];

    function Run($rootScope, $http ,$location) {


        var verificarAutenticacao = function() {
            $http.get('user/autenticado').success(function(resposta){
                if(resposta.status == 200) {
                  $rootScope.autenticado = true;
                  $rootScope.usuariologado = resposta.dados.usuario;
                } else {
                  $rootScope.autenticado = false;
                  $rootScope.usuarioLogado = undefined;
                  $location.path('login');
                }
            }).error(function(){
                $rootScope.autenticado = false;
                $rootScope.usuarioLogado = undefined;
                $location.path('login');
            });
        };

        verificarAutenticacao();

        $rootScope.sair = function(){
            $http.get('user/sair').success(function(resposta){
                $rootScope.autenticado = false;
                $rootScope.usuarioLogado = undefined;
                $location.path('login');
            }).error(function(){
                $rootScope.autenticado = false;
                $rootScope.usuarioLogado = undefined;
                $location.path('login');
            });
        };

        $rootScope.$on('$routeChangeSuccess', function(next, current, previous) {
            if (current.$$route) {
                $rootScope.title = current.$$route.title;
            }
        });
    }

})();