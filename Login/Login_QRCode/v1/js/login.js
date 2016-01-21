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

$(window).ready(function () {
    generatorCode();
});

$("#btnGerarToken").click(function () {
    generatorCode();
});

var generatorCode = function (data) {
    $.get(
        "http://localhost/SwLoginAPI/api/generatorToken",
        function (data) {
            if (data.object != null && data.object != undefined && data.hasError === true) {
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
                alert("ERROR: " + data.message);
            }
        }, "json");
}

/*----------------------------------------------
                Listener Login
----------------------------------------------*/
setInterval( function(){
    var resultAuth = verifyStatusToken();
    console.log("Em Here")
 }, 3000);

/*----------------------------------------------
                Authentication Login
----------------------------------------------*/

var verifyStatusToken = function () {
  var token = $("#text").val();
    $.get("http://localhost/SwLoginAPI/api/verifytoken?token=" + token,//http://localhost/SwLoginAPI/api/verifytoken?token=f58c27c3-8dee-4690-ba03-7698c6b6cba1
        function (data) {
            if (data.object != null && data.object != undefined && data.hasError === true) {
                console.log(data);
            }
            else {
                alert("ERROR: " + data.message);
            }
        }, "json");
};

var setTrigger = function () {
    var statusAuth = verifyStatusToken();
};

$("#btnAutenticar").click(function () {
    setTrigger();
});
