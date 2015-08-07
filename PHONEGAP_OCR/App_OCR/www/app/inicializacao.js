/// <reference path="../node_modules/angular/angular.js" />
/// <reference path="../node_modules/angular-route/angular-route.js" />




//Baixamos o ANGULAR via NPM
//Angular é um FRAMEWORK MVC e MVVM (Nome Carinhoso MVW (Whatever))
//Da pra trabalhar tanto com CONTROLLERS quanto BINDING
//É O ANGULAR que utilizamos para trabalhar com o ESTILO SPA
//JQUERY é um Lixo(Biblioteca)
//ANGULAR é um FRAMEWORK (Controllers, Views, Página Pai e filha
//Scope, RootScope, Services, Dependency Injectioin)


//Inicializamos a aplicação ANGULAR
//Pra trabalhar com o módulo de rotas injetamos o serviço, objeto
//ngRoute é ele quem habilita os comandos de definição e interpretação
//de rotas (url amigáveis)
//GOOGLE, NPM ou olha o arquivo e pega o NAME
var aplicacao = angular.module("Madrugada", ["ngRoute","ngMaterial", "ngMdIcons" ,]);

//Quando trabalhamos com SPA, nós não navegamos diretamente nas
//páginas, pra cada página que quisermos abrir, navegar temos que
//dar 1 apelido
//É o conceito de URLS AMIGAVEIS o usuario navega no apelido
//e o apelido redireciona pra página(Tela Física)
//Pra trabalhar com as URL's AMIGAVEIS (ROTAS, RDIRECIONAMENTOS)
//Baixamos o módulo (pacote) angular-route
//NPM INSTALL ANGULAR-ROUTE
//O Angular por padrão trabalha com INJEÇÃO DE DEPENDENCIA
//Ele é todo desacoplado, sempre que baixamos algum modulo
//Temos que injetar dentro da aplicação
aplicacao.config(function ($routeProvider) {

    //O Obejto $routeProvider desceu do modulo NGROUTE
    //Definimos 1 URL AMIGAVEL pra cada página
    $routeProvider
        .when('/home', {
            templateUrl: 'app/views/home.html',
            controller: 'homeController'

        })
        .when('/amigo/listar', {
            templateUrl: 'app/views/amigos/listar.html',
            controller: 'amigoController'
        })
        .when('/amigo/cadastrar', {
            templateUrl: 'app/views/amigos/cadastrar.html',
            controller: 'amigoController'
        });
    //Definimos a rota padrão, se o usuário não especificar
    //nenhuma URL amigável vai pra HOME, vai pra tela de entrada
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
});
