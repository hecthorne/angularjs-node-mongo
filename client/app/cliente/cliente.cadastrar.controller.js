
(function() {

    'use strict';

    angular
        .module('cliente.module')
        .controller('ClienteCadastrarController', ClienteCadastrarController);

    ClienteCadastrarController.$inject = ['$scope','$location' , '$http'];

    /* @ngInject */
    function ClienteCadastrarController($scope, $location, $http) {
    	
        $scope.perfils = ['Super Admin', 'Admin', 'Usuário Normal'];

    	var cadastrarCliente = function(objeto) {
	      return $http({
	        method: 'POST',
	        url: '/cliente/cadastrar',
	        data: {
	          cliente: objeto
	        }
	      });
    	};

    	$scope.cadastrar = function(){
    		cadastrarCliente($scope.cliente).success(function(resposta){
                $location.path('cliente');
            });
    	};
    }

})();

