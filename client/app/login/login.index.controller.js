
(function() {

    'use strict';

    angular
        .module('login.module')
        .controller('LoginIndexController', LoginIndexController);

    LoginIndexController.$inject = ['$scope', '$location', '$http', '$window'];

    /* @ngInject */
    function LoginIndexController($scope, $location, $http, $window) {
        
        $scope.logar = function(){
            $http.post('/user/autenticar', $scope.usuario).success(function(resposta){
                if(resposta.status == 'n'){
                    alert(resposta.mensagem);
                }
                else if(resposta.status == 200){
                    //$location.path("cliente");
                    $window.location.href = '#/cliente';

                }
            });
        };
    }

})();