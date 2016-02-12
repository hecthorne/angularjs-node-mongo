(function () {
    
    'use strict';

    angular.module('cliente.module', [
        'sitehosting.core'
    ]);

    angular.module('cliente.module').config(route);

    function route($routeProvider) {
        $routeProvider
        .when('/cliente', {
            templateUrl: 'app/cliente/cliente.index.html',
            controller: 'ClienteIndexController',
            title: 'Cliente Listar'
        })
        .when('/cliente/cadastrar', {
            templateUrl: 'app/cliente/cliente.cadastrar.html',
            controller: 'ClienteCadastrarController',
            title: 'Cliente Cadastrar'
        })
        .when('/cliente/editar/:id', {
            templateUrl: 'app/cliente/cliente.editar.html',
            controller: 'ClienteEditarController',
            title: 'Cliente Editar'
        })
        .otherwise({
            redirectTo: '/'
        });
    }

})();