//É dentro do Controller que fica todo JAVASCRIPT da tela
//Toda programação da tela fica aqui dentro, tudo que vc digitava la no JQUERY é aqui que vc vai inserir

aplicacao.controller('amigoController', function ($scope) {

    //O objeto SCOPE equivale a uma VIEW MODEL
    //Ele transfere dados da VIEW pro CONTROLLER e VICE VERSA
    //View BINDING
    $scope.listaAmigos = [{ nome:"Nicolas Alexandre"},
                          { nome:"Correa Dentada"}];
});