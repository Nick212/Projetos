
el.confirm.on('click', function () {
            //  debugger;
            if (el.confirm.hasClass('out-of-action'))
                return;

            var appValue = util.getParameterByName('app') != "" ? util.getParameterByName('app') : $('#hdd-app').val();

var authentication = "{ \"authReq\":"
               + "{ \"App\": \"" + appValue + "\","
               + "\"Identifier\": \"" + wizard.account.identifier + "\","
               + "\"Password\": \"" + wizard.account.password + "\","
               + "\"QuestionAnswer\": \"" + $('#data-answer-date').val() + "\""
               + "}}";

               //var authentication = "{ "authReq":{ "App": "3F09DF22-33A6-421B-B5A8-EFDF77F2A475/","Identifier": "39234412826","Password": "102110","QuestionAnswer": "05"}}"
               //var authentication = "{ "authReq":{ "App": "3F09DF22-33A6-421B-B5A8-EFDF77F2A475/","Identifier": "39234412826","Password": "100110","QuestionAnswer": "94"}}"

               $.redirect(
                 "https://www.dotz.com.br/Authenticate.aspx",
                 data = {
                   app: "3F09DF22-33A6-421B-B5A8-EFDF77F2A475"
                   identifier: "39234412826"
                   token: "af1744a6-fec8-478c-9c8d-6c880b09e7fb"},
                 method: "POST"
//---------------------------------------------------------------------------------------------
$.ajax({
                type: 'POST',
                url: util.base + 'Login/Authenticate',      //var util.base   = https://sso.dotz.com.br/
                headers: { 'VerificationToken': forgeryId },
                contentType: 'application/json; charset=utf-8',
                data: authentication,
                success: function (result) {
                    // clean
                    el.errorSpan.text('');
                    if (result.url) {
                        $('.load-message').fader();
                        var dic;
                        if ($("[name='data-post']")[0].value != "") {
                            dic = util.formStrings($("[name='data-post']")[0].value);
                        } else {
                            dic = util.queryStrings();
                        }
                        var data = $.extend({ token: result.token }, dic);
                        if (result.url.indexOf('.html') >= 0) {
                            window.location = result.url + '?token=' + result.token;
                        } else {
                            $.redirect(result.url, data, result.method);
                        }
                    } else if (result.res.redirectUrl) {
                        el.vKeyboard.fadeOut(function () {
                            $('#boxLogin').show();
                            steps.redirectFlow(result.res, result.updatePass);
                        });
                    } else if (result.res === "Erro") {
                        el.errorSpan.text("Ocorreu um erro na sua solicitação. Por favor, tente novamente.");
                        el.cleanBtn.trigger('click');
                    }
                    else {
                        el.errorSpan.text(result.res.message);
                        el.cleanBtn.trigger('click');
                    }
                },
                error: function () {
                    el.errorSpan.text("Ocorreu um erro na sua solicitação. Por favor, tente novamente. Erro 10000");
                    el.cleanBtn.trigger('click');
                }
            });
