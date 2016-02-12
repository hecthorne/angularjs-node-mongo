
(function() {

    'use strict';

    angular
        .module('cliente.module')
        .controller('ClienteIndexController', ClienteIndexController);

    ClienteIndexController.$inject = ['$scope', '$http', 'ngTableParams'];

    /* @ngInject */
    function ClienteIndexController($scope, $http, ngTableParams) {

        $scope.excluir = function(id){
            $http.get('/cliente/remover/'+ id).success(function(resposta) {
                $scope.registros.reload();           
            });
        };

    	$scope.registros = new ngTableParams( {page: 1, count: 10},
		  {
		    total: 0,
		    getData: function ($defer, params) {
                $http.get('/cliente/listar').success(function(resposta) {
                    params.total(resposta.dados.count);
                    $defer.resolve(resposta.dados);
                });
		    }
		  });
    }

})();