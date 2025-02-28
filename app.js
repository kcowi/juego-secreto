let numeroSecreto = 0;
let intentos = 0;
let intentosMaximos = 10;
let listaDeNumerosSorteados = [];
let intentosPorRonda = 2

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p',`El número secreto es menor, te quedan ${intentosPorRonda} ${(intentosPorRonda === 1) ? "intento" : "intentos"}`);
            if (intentosPorRonda == 0) {
                asignarTextoElemento("p", "se te acabaron los intentos.");
                finDelJuego();
            }
        } else {
            asignarTextoElemento('p',`El número secreto es mayor, te quedan ${intentosPorRonda} ${(intentosPorRonda === 1) ? "intento" : "intentos"}`);
            if (intentosPorRonda == 0) {
                asignarTextoElemento("p", "se te acabaron los intentos.");
                finDelJuego();
            }
        }
        intentos++;
        intentosPorRonda--;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    var numeroAdquirido = parseInt(Math.random()*intentosMaximos)+1;
    //necesito que el codigo me arroje un numero distinto del anterior
    if (listaDeNumerosSorteados.length == intentosMaximos) {
        asignarTextoElemento("p", "lograste acertar todos los numeros.")
    } else {
        if (listaDeNumerosSorteados.includes(numeroAdquirido)) {
            return generarNumeroSecreto();
        } else {
            listaDeNumerosSorteados.push(numeroAdquirido);
            return numeroAdquirido;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${intentosMaximos}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
    document.querySelector('#intentar').removeAttribute('disabled');
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}
condicionesIniciales();


function finDelJuego() {
// mostrar en el parrafo fin del juego.
    document.querySelector('#reiniciar').removeAttribute('disabled');
    document.querySelector('#intentar').setAttribute('disabled', "true");
    intentosPorRonda = 3;
}