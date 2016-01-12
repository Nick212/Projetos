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
        alert("Input a text");
        elText.focus();
        return;
    }

    qrcode.makeCode(elText.value);
}

makeCode();

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

var token = "ashkdgas8d76a8sda1f"; 
    
/*----------------------------------------------
                Consumer Login
----------------------------------------------*/
var obterStatusAutenticacao = function () {
    return;
}

var triggerAutentication = function () {
    $.get("http://localhost:2121/autentication/api/login?id=+" + token, 
    function (data) {
        if (data.object != null && data.object != undefined && data.hasError === true) {
            alert("SUCESSO");
        }
        else{
            alert("ERROR: " + data.message);
        }
    }, "json");
};

var setTrigger = function () {
    var statusAuth = triggerAutentication();
};

$("#btnAutenticar").click(function () {
    setTrigger();
}); 