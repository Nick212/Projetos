/*----------------------------------------------
                Generator QrCode
----------------------------------------------*/


var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 350,
    height: 350
});

function makeCode() {
    var elText = document.getElementById("text");

    if (!elText.value) {
        console.log("Input a text");
        elText.focus();
        return;
    }

    qrcode.makeCode(elText.value);
}

//makeCode();

$("#text").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
        }
    });

/*----------------------------------------------
                Creator Code QRCode
----------------------------------------------*/

var token = "Teste";
var authenticated = false;

$(window).ready(function () {
    generatorCode();
    /*----------------------------------------------
                    Listener Authentication
    ----------------------------------------------*/
        setInterval(verifyAutentication, 3000);
});

$("#btnGerarToken").click(function () {
    generatorCode();

});

var generatorCode = function (data) {
    $.get(
        "http://localhost/SwLoginAPI/api/generatorToken",
        function (data) {
            if (data.object != null && data.object != undefined && data.hasError !== true) {
                console.log(data);
                token = data.object.token;
                $("#text").val(token);
                $("#response1").html("Token: " + data.object.token);
                $("#response2").html("Tipo: " + data.object.tipo);
                $("#response3").html("Extra: " + data.object.extra);
                $("#response4").html("Data Inclusão: " + data.object.dataInclusao);
                $("#response5").html("Usuario Id: " + data.object.usuarioId);
                $("#response6").html("Valido Ate: " + data.object.validoAte);
                $("#response7").html("Data Utilizacao: " + data.object.dataUtilizacao);
                $("#response8").html("Aplicacao ID: " + data.object.aplicacaoId);
                $("#response9").html("Documento: " + data.object.documento);
                $("#response10").html("ID Autor Requisicao: " + data.object.idAutorRequisicao);

                makeCode();
            }
            else {
                console.log("ERROR: " + data.message);
            }
        }, "json");
}



/*----------------------------------------------
<<<<<<< HEAD
                Listener Login
----------------------------------------------*/
setInterval( function(){
    var resultAuth = verifyAutentication();
    console.log("Em Here")
 }, 3000);

/*----------------------------------------------
                Authentication Login
----------------------------------------------*/
var verifyAutentication = function () {
    if(!authenticated){
    var token = $("#text").val();
    
    $.get("http://localhost/SwLoginAPI/api/verifytoken?token=" + token,
        function (data) {
            if (data.object != null && data.object != undefined && data.hasError !== true) {
              if(data.object.token === token && data.object.dataUtilizacao !== null && data.object.documento !== undefined){
                console.log("SUCESSO: "+ data.object.documento + "\n" + data.object);
                var info = {
                  app:data.object.aplicacaoId,
                  identifier:data.object.documento,
                  token: data.object.token
                };
                //window.location = "http://www.google.com";
                authenticated = true
                $.redirect("http://sitecore.dotz.dev.website/Authenticate.aspx", info, "POST");
              }else{
                console.log("ERRO TOKEN NÃO VALIDADO : "+ data.object);
              }
            }else {
                console.log("ERROR: " + data.message);
            }
        }, "json");
    }
};

var setTrigger = function () {
    var statusAuth = verifyAutentication();
};

$("#btnAutenticar").click(function () {
    setTrigger();
});
