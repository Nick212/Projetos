/*----------------------------------
    Generator QR Code
----------------------------------*/

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

/*--------------------------------
    Listener Change Autentication
--------------------------------*/

var listenerAutentication = function () {
    //Request Ajax
}


//Trigger 
var triggerListener = function () {
    console.log("Trigger Listennert ACTIVE");
}

var timer = 0;
console.log("setTrigger ACTIVE = " + timer);
    
    
    
    
    
    