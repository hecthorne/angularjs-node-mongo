
(function() {

    'use strict';

    angular
        .module('cliente.module')
        .controller('ClienteEditarController', ClienteEditarController);

    ClienteEditarController.$inject = ['$scope', '$http', '$location', '$routeParams'];

    /* @ngInject */
    function ClienteEditarController($scope, $http, $location, $routeParams) {
    	
        $scope.cliente = {};

        $scope.perfils = ['Super Admin', 'Admin', 'Usuário Normal'];

    	var editarCliente = function(objeto) {
	      return $http({
	        method: 'POST',
	        url: '/cliente/editar',
	        data: {
	          cliente: objeto
	        }
	      });
    	};

    	$scope.editar = function(){
    		editarCliente($scope.cliente).success(function(resposta){
                $location.path('cliente');
            });
    	};

        var init = function(){
            $http.get('cliente/consultar/' + $routeParams.id).success(function(resposta){
                $scope.cliente = resposta.dados;
            });
        };

        init()
    }

})();

