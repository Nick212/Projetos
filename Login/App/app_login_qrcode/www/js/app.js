/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.
var token;


function myEventHandler() {
    "use strict";

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    console.log(str);
}


// ...additional event handlers here...

function thirdPartyEmulator() {
    alert("This feature uses a third party barcode scanner plugin. Third party plugins are not supported on emulator or app preview. Please build app to test.");
}

function scan() {
    "use strict";
    var fName = "scan():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            thirdPartyEmulator();
            console.log(fName, "emulator alert");
        } else {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    console.log(fName, "Scanned result found!");
                    token = result.text;
                    sendToken();
                    alert("QRcode!\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled + "\n\n" );
                    
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}

function sendToken(){
    
    //TESTE
    //token = "b5ecd1b3-de8a-4727-b4e0-4e411a08ccc5";
    
    var $txtCpf = $('#txtCpf').val();
    if($txtCpf !== undefined && $txtCpf !== null && $txtCpf !== ""){
        getUser($txtCpf);    
    }
    else{
        alert("Digite o CPF"); 
        return;
    }
    
}

function getUser ($txtCpf){
    $.get("http://10.11.4.138/SwLoginAPI/api/user?document=" + $txtCpf, function(data, status){
        if(data.hasError !== true){
            alert('SUCESSO : Ao obter Id do Usuario' + data.object.usuarioId);
            authenticToken(token,data.object.usuarioId);
        }else{
            alert('ERRO : Ao obter Id do Usuario');
            return;
        }

    });
}

function authenticToken(token, userId){
    if(token !== null && token !== undefined && token !== ""){    
        $.get("http://10.11.4.138/SwLoginAPI/api/auth?token=" + token + "&idAutorRequest=" + userId , function(data, status){
            alert("Sucesso ao validar o Token: " + token);
            console.log(data);
        });
    }
    else{
        alert("Erro ao validar o Token : " + token);
        return;
    }
}

































