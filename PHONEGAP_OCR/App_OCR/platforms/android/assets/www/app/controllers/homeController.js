//É dentro do Controller que fica todo JAVASCRIPT da tela
//Toda programação da tela fica aqui dentro, tudo que vc digitava la no JQUERY é aqui que vc vai inserir

aplicacao.controller('homeController', function ($rootScope, $mdSidenav, $mdUtil) {

    //  $rootScope -> Local de armazenamento Global (SCOPO GLOBAL) você consegue utilizar qualquer recurso que não esteja no scope
    $rootScope.menuEsquerdo = $mdUtil.debounce(function () {
        $mdSidenav('left').toggle()
    }, 300);;
});
