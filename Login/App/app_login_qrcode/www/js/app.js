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
                    alert("QRcode!\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled + "\n\n" );
                    //sendAutentication();
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

//function sendAutentication(url, callback,postData){
//    var req = createXMLHTTPObject();
//    if(!req)
//        alert("Erro ao Criar o request");return;
//    
//    var method = (postData) ? "POST" : "GET";
//    req.open(method, url, true);
//    req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
//    req.onreadystatechange = funtion(){
//        if(req.readyState != 4) return;
//        if(req.status != 200 && req.status != 304){
//            alert('HTTP Error ' + req.status);
//        return;
//    }
//    callback(req);
//    }
//    if(req.readyState == 4){
//        alert("readystate = " req.readyState)
//        return;
//    }
//    req.send(postData);
//}
//
//var XMLHttpFactories = [
//    function () {return new XMLHttpRequest()},
//    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
//    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
//    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
//];
//
//function createXMLHTTPObject(){
//    var xmlhttp = false;
//    for(var i = 0; i<XMLHttpFactories.length;i++){
//        try{
//            xmlhttp = XMLHTTPFactories[i]();
//        }
//        catch(e){
//            alert("Error: " + e)
//            continue;
//            }
//        break;
//    }
//}

function sendToken(){
    token = "asdliasld";
    var $txtCep = $('#txtCep').val();
    if(token !== null && token !== undefined){    
        alert("Token: " + token + "\n Sending...");
        $.get("http://cep.correiocontrol.com.br/" + $txtCep +".json", function(data, status){
            console.log(data.cep);
        alert("End: " + data.logradouro);
        });
    }
    //alert("Token está  Nulo");
    
}
































