
//variables de canvas
var fps = 60,
    ctx,
    canvas,
    ancho = 1000,
    alto = 500,
    x = 100,
    y = 200,
    anchoP = 50,
    altoP = 50,
    suelo = 200,
    suelo2 = 300,
    suelo3 = 400,
    sueloP = 200,
    carril = 0,
    cont = 0,
    dificultad = 0,
    velocA = 1,
    ataque1 = false,
    ataque2 = false,
    ataque3 = false,
    saltoPC = false,
    ataquePC = false,
    Ry = 0,
    Rx = 0,
    sec = 0,
    time = 60,
    muns = 0,
    final = false,
    movil = false;

//variables imágenes
var personaje, agua, obstaculo, enemigo, fondo, tabla, magia, bomba, btnArriba, btnAbajo, btnSalto, btnAtaque, cReinicio;

function imagenes() {
    personaje = new Image();
    agua = new Image();
    obstaculo = new Image();
    enemigo = new Image();
    bomba = new Image();
    magia = new Image();
    tabla = new Image();
    fondo = new Image();
    btnArriba = new Image();
    btnAbajo = new Image();
    btnSalto = new Image();
    btnAtaque = new Image();
    cReinicio = new Image();

    personaje.src = 'img/hero1.png'
    agua.src = 'img/agua.png'
    obstaculo.src = 'img/roca.png'
    enemigo.src = 'img/enemigo.png'
    bomba.src = 'img/bomba.png'
    magia.src = 'img/magia.png'
    tabla.src = 'img/tabla.png'
    fondo.src = 'img/fondo.png'
    btnArriba.src = 'img/Arriba.png'
    btnAbajo.src = 'img/Abajo.png'
    btnSalto.src = 'img/Salto.png'
    btnAtaque.src = 'img/Ataque.png'
    cReinicio.src = 'img/cuadro.png'

}
//ajustes del heroe y objetos
var heroe = { y: sueloP, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false };
var orbe1 = { x: ancho + 1000, y: suelo - 50 };
var orbe2 = { x: ancho + 1000, y: suelo2 - 50 };
var orbe3 = { x: ancho + 1000, y: suelo3 - 50 };
var roca1 = { x: ancho + 700, y: suelo };
var roca2 = { x: ancho + 100, y: suelo2 };
var roca3 = { x: ancho + 500, y: suelo3 };
var mar = { x: 0, y: suelo };
var tablaR = { y: sueloP + 15, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false };
var fondo = { x: 0, y: 0 };
var enemi1 = { x: ancho + 3700, y: suelo - 120 };
var enemi2 = { x: ancho + 1900, y: suelo2 - 120 };
var enemi3 = { x: ancho + 5500, y: suelo3 - 120 };
var bomb1 = { x: ancho + 3000, y: suelo };
var bomb2 = { x: ancho + 7000, y: suelo2 };
var bomb3 = { x: ancho + 5000, y: suelo3 };
//ajustes de la velocidad
var nivel = { velocidad: 9, puntuacion: 0, muerte: false, velocidadEnemi: 8 };

function gravedad() {
    if (heroe.saltando == true && tablaR.saltando == true) {
        if (heroe.y - heroe.vy - heroe.gravedad > sueloP) {
            heroe.saltando = false;
            heroe.vy = 0;
            heroe.y = sueloP;
            tablaR.saltando = false;
            tablaR.vy = 0;
            tablaR.y = sueloP + 15
        } else {
            heroe.vy -= heroe.gravedad;
            heroe.y -= heroe.vy;
            tablaR.vy -= tablaR.gravedad;
            tablaR.y -= tablaR.vy;
        }
    }
}

//Ratón
function posicionRaton(a) {
    Rx = a.pageX;
    Ry = a.pageY;
    //console.log("x: " + Rx + " y: " + Ry);
}

function clicRaton(a) {
    Rx = a.pageX;
    Ry = a.pageY;
    ataque1 = false;
    ataque2 = false;
    ataque3 = false;
    atacar();
    saltar();
    carrilTactil();
    Reinicio();
}

function sueltaRaton(a) {

}

//acciones
function saltar() {
    if (heroe.y == sueloP && nivel.muerte == false && Rx <= 879 && Rx >= 700 && Ry >= 300 && final == false) {
        heroe.saltando = true;
        heroe.vy = heroe.salto;
        tablaR.saltando = true;
        tablaR.vy = tablaR.salto;
    }
    if (heroe.y == sueloP && nivel.muerte == false && saltoPC == true && final == false) {
        heroe.saltando = true;
        heroe.vy = heroe.salto;
        tablaR.saltando = true;
        tablaR.vy = tablaR.salto;
        saltoPC = false;
    }
}

function atacar() {
    var disparo = carril;

    if (nivel.muerte == false && Rx >= 880 && Ry >= 300 && final == false) {
        if (carril == 0 && orbe1.x >= ancho + 100 && disparo == 0) {
            orbe1.x = 150;
        } else if (carril == 1 && orbe2.x >= ancho + 100 && disparo == 1) {
            orbe2.x = 150;
        } else if (carril == 2 && orbe3.x >= ancho + 100 && disparo == 2) {
            orbe3.x = 150;
        }
    }

    if (nivel.muerte == false && ataquePC == true && final == false) {
        if (carril == 0 && orbe1.x >= ancho + 100 && disparo == 0) {
            orbe1.x = 150;
        } else if (carril == 1 && orbe2.x >= ancho + 100 && disparo == 1) {
            orbe2.x = 150;
        } else if (carril == 2 && orbe3.x >= ancho + 100 && disparo == 2) {
            orbe3.x = 150;
        }
        ataquePC = false;
    }
}

function Reinicio() {
    if (nivel.muerte == true || final == true) {
        if (Rx >= 700) {
            nivel.puntuacion = 0;
            nivel.muerte = false;
            final = false;
            roca1.x = ancho + 700;
            roca2.x = ancho + 100;
            roca3.x = ancho + 500;
            enemi1.x = ancho + 3700;
            enemi2.x = ancho + 1900;
            enemi3.x = ancho + 5500;
            bomb1.x = ancho + 3000;
            bomb2.x = ancho + 7000;
            bomb3.x = ancho + 5000;
            orbe1.x = ancho + 1000;
            orbe2.x = ancho + 1000;
            orbe3.x = ancho + 1000;
            nivel.velocidad = 9;
            nivel.velocidadEnemi = 8;
            nivel.puntuacion = 0;
            velocA = 1;
            dificultad = 0;
            sueloP = 200;
            heroe.y = sueloP;
            tablaR.y = sueloP + 15;
            carril = 0;
            sec = 0;
            time = 60;
            muns = 0;
        }
    }
}

function golpe() {
    //Enemigos
    if (orbe1.x >= enemi1.x && orbe1.x <= ancho) {
        enemi1.x = ancho + 1500;
        nivel.puntuacion += 50;
        muns += 1;
        ataque1 = true;
    }
    if (orbe2.x >= enemi2.x && orbe2.x <= ancho) {
        enemi2.x = ancho + 1500;
        nivel.puntuacion += 50;
        muns += 1;
        ataque2 = true;
    }
    if (orbe3.x >= enemi3.x && orbe3.x <= ancho) {
        enemi3.x = ancho + 1500;
        nivel.puntuacion += 50;
        muns += 1;
        ataque3 = true;
    }

    //Bombas
    if (orbe1.x >= bomb1.x && orbe1.x <= ancho) {
        bomb1.x = ancho + 1500;
        nivel.puntuacion += 50;
        muns += 1;
        ataque1 = true;
    }
    if (orbe2.x >= bomb2.x && orbe2.x <= ancho) {
        bomb2.x = ancho + 1500;
        nivel.puntuacion += 50;
        muns += 1;
        ataque2 = true;
    }
    if (orbe3.x >= bomb3.x && orbe3.x <= ancho) {
        bomb3.x = ancho + 1500;
        nivel.puntuacion += 50;
        muns += 1;
        ataque3 = true;
    }
}

//carriles flechas de teclado
function arriba() {
    if (movil == false) {
        if (sueloP == 400 && carril == 2 && nivel.muerte == false && final == false) {
            carril = 1;
            sueloP = 300;
            if (heroe.saltando == false) {
                heroe.y = sueloP;
                tablaR.y = sueloP + 15;
            }
        } else if (sueloP == 300 && carril == 1 && nivel.muerte == false && final == false) {
            carril = 0;
            sueloP = 200;
            if (heroe.saltando == false) {
                heroe.y = sueloP;
                tablaR.y = sueloP + 15;
            }
        }
    }
}
function abajo() {
    if (movil == false) {
        if (sueloP == 200 && carril == 0 && nivel.muerte == false && final == false) {
            carril = 1;
            sueloP = 300;
            if (heroe.saltando == false) {
                heroe.y = sueloP;
                tablaR.y = sueloP + 15;
            }
        } else if (sueloP == 300 && carril == 1 && nivel.muerte == false && final == false) {
            carril = 2;
            sueloP = 400;
            if (heroe.saltando == false) {
                heroe.y = sueloP;
                tablaR.y = sueloP + 15;
            }
        }
    }
}

//Utilizado para jugar en celulares
function carrilTactil() {
    if (movil == true) {
        if (nivel.muerte == false && final == false) {
            //Botón arriba
            if (Ry <= 300 && Ry >= 200 && Rx <= 200) {
                if (carril == 1) {
                    carril = 0;
                    sueloP = 200;
                    if (heroe.saltando == false) {
                        heroe.y = sueloP;
                        tablaR.y = sueloP + 15;
                    }
                } else if (carril == 2) {
                    carril = 1;
                    sueloP = 300;
                    if (heroe.saltando == false) {
                        heroe.y = sueloP;
                        tablaR.y = sueloP + 15;
                    }
                }
            }
            //Botón abajo
            else if (Ry <= 430 && Ry >= 320 && Rx <= 200) {
                if (carril == 0) {
                    carril = 1;
                    sueloP = 300;
                    if (heroe.saltando == false) {
                        heroe.y = sueloP;
                        tablaR.y = sueloP + 15;
                    }
                } else if (carril == 1) {
                    carril = 2;
                    sueloP = 400;
                    if (heroe.saltando == false) {
                        heroe.y = sueloP;
                        tablaR.y = sueloP + 15;
                    }
                }
            }
        }
    }
}

//dibuja elementos
function dibujaPer() {
    //tabla surf
    ctx.drawImage(tabla, 0, 0, 200, 50, 100, tablaR.y, 200, 50);
    //personaje
    ctx.drawImage(personaje, 0, 0, 200, 200, 100, heroe.y - 150, 200, 200);
}

function dibujaBoton() {
    if (movil == true) {
        ctx.drawImage(btnArriba, 0, 0, 100, 100, 30, 250, 100, 100);
        ctx.drawImage(btnAbajo, 0, 0, 100, 100, 30, 380, 100, 100);
        ctx.drawImage(btnSalto, 0, 0, 100, 100, 700, 380, 100, 100);
        ctx.drawImage(btnAtaque, 0, 0, 100, 100, 830, 380, 100, 100);
    }
}

function carril1() {
    ctx.drawImage(enemigo, 0, 0, 268, 225, enemi1.x, enemi1.y, 268, 225);
    ctx.drawImage(obstaculo, 0, 0, 180, 150, roca1.x, roca1.y, 180, 150);
    ctx.drawImage(bomba, 0, 0, 280, 225, bomb1.x, bomb1.y, 100, 100);
    ctx.drawImage(magia, 0, 0, 100, 100, orbe1.x, orbe1.y, 100, 100);
    if (carril == 0) {
        dibujaPer();
    }
}
function carril2() {
    ctx.drawImage(enemigo, 0, 0, 268, 225, enemi2.x, enemi2.y, 268, 225);
    ctx.drawImage(obstaculo, 0, 0, 180, 150, roca2.x, roca2.y, 180, 150);
    ctx.drawImage(bomba, 0, 0, 280, 225, bomb2.x, bomb2.y, 100, 100);
    ctx.drawImage(magia, 0, 0, 100, 100, orbe2.x, orbe2.y, 100, 100);
    if (carril == 1) {
        dibujaPer();
    }
}
function carril3() {
    ctx.drawImage(enemigo, 0, 0, 268, 225, enemi3.x, enemi3.y, 268, 225);
    ctx.drawImage(obstaculo, 0, 0, 180, 150, roca3.x, roca3.y, 180, 150);
    ctx.drawImage(bomba, 0, 0, 280, 225, bomb3.x, bomb3.y, 100, 100);
    ctx.drawImage(magia, 0, 0, 100, 100, orbe3.x, orbe3.y, 100, 100);
    if (carril == 2) {
        dibujaPer();
    }
}

function dibujaFondo() {
    ctx.drawImage(fondo, 0, 0, 1000, 450, fondo.x, fondo.y, 1000, 450);
}

function dibujaMar() {
    ctx.drawImage(agua, mar.x, 0, 3000, 350, 0, mar.y - 50, 3000, 350);
}

//Logicas
function logicaRoca() {
    var random = 0;
    if (roca1.x < -100) {
        random = Math.floor(Math.random() * 10);
        roca1.x = ancho + random * 1000;
    } else {
        roca1.x -= nivel.velocidad;
    }
    if (roca2.x < -100) {
        random = Math.floor(Math.random() * 10);
        roca2.x = ancho + random * 1000;
    } else {
        roca2.x -= nivel.velocidad;
    }
    if (roca3.x < -100) {
        random = Math.floor(Math.random() * 10);
        roca3.x = ancho + random * 1000;
    } else {
        roca3.x -= nivel.velocidad;
    }
}

function logicaEnemi() {
    var random = 0;
    if (enemi1.x < -700) {
        random = Math.floor(Math.random() * 10);
        enemi1.x = ancho + random * 1000;
    } else {
        enemi1.x -= nivel.velocidadEnemi;
    }
    if (enemi2.x < -700) {
        random = Math.floor(Math.random() * 10);
        enemi2.x = ancho + random * 1000;
    } else {
        enemi2.x -= nivel.velocidadEnemi;
    }
    if (enemi3.x < -700) {
        random = Math.floor(Math.random() * 10);
        enemi3.x = ancho + random * 1000;
    } else {
        enemi3.x -= nivel.velocidadEnemi;
    }
    if (bomb1.x < -700) {
        random = Math.floor(Math.random() * 10);
        bomb1.x = ancho + random * 1000;
    } else {
        bomb1.x -= nivel.velocidadEnemi;
    }
    if (bomb2.x < -700) {
        random = Math.floor(Math.random() * 10);
        bomb2.x = ancho + random * 1000;
    } else {
        bomb2.x -= nivel.velocidadEnemi;
    }
    if (bomb3.x < -700) {
        random = Math.floor(Math.random() * 10);
        bomb3.x = ancho + random * 1000;
    } else {
        bomb3.x -= nivel.velocidadEnemi;
    }


}

function logicaMagia() {
    if (carril == 0 && ataque1 == true || orbe1.x >= ancho) {
        orbe1.x = ancho + 1000;
        ataque1 = false;
    } else {
        orbe1.x += nivel.velocidad;
    }
    if (carril == 1 && ataque2 == true || orbe2.x >= ancho) {
        orbe2.x = ancho + 1000;
        ataque2 = false;
    } else {
        orbe2.x += nivel.velocidad;
    }
    if (carril == 2 && ataque3 == true || orbe3.x >= ancho) {
        orbe3.x = ancho + 1000;
        ataque3 = false;
    } else {
        orbe3.x += nivel.velocidad;
    }
}

function logicaMar() {
    if (mar.x > 1500) {
        mar.x = 0;
    } else {
        mar.x += nivel.velocidad;
    }
}

//Colisiones
function colision() {
    if (roca1.x >= 75 && roca1.x <= 200 && carril == 0) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
    if (roca2.x >= 75 && roca2.x <= 200 && carril == 1) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
    if (roca3.x >= 75 && roca3.x <= 200 && carril == 2) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
    if (enemi1.x >= 50 && enemi1.x <= 200 && carril == 0) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
    if (enemi2.x >= 50 && enemi2.x <= 200 && carril == 1) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
    if (enemi3.x >= 50 && enemi3.x <= 200 && carril == 2) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
    if (bomb1.x >= 100 && bomb1.x <= 200 && carril == 0) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
    if (bomb2.x >= 100 && bomb2.x <= 200 && carril == 1) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
    if (bomb3.x >= 100 && bomb3.x <= 200 && carril == 2) {
        if (heroe.y >= sueloP - 25) {
            nivel.muerte = true;
            nivel.velocidad = 0;
            nivel.velocidadEnemi = 0;
        }
    }
}

//Tiempo terminado
function tiempo(){
    if(time == 0){
        nivel.velocidad = 0;
        nivel.velocidadEnemi = 0;
        final = true;
    }
}

//puntuación y texto
function puntuacion() {
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`Puntuación: ${nivel.puntuacion}`, 550, 50);
    ctx.fillText(`muns: ${muns}`, 100, 50);
    if(sec == 60 && time >= 0){
        time -= 1;
        sec = 0;
    }
    if(time == 60){
        ctx.fillText(`1:00`,850, 50);
    }else if(time <= 9){
        ctx.fillText(`0:0${time}`,850, 50);
    }else{
        ctx.fillText(`0:${time}`,850, 50);
    }

    if (cont == 50) {
        nivel.puntuacion += 1;
        dificultad += 1;
        cont = 0;
    }

    if (dificultad == 100) {
        nivel.velocidad += 1;
        nivel.velocidadEnemi += 1;
        dificultad = 0;
    }

    if (final == true) {
        ctx.drawImage(cReinicio, 0, 0, 450, 450, 280, 10, 450, 450);
        ctx.font = "50px impact";
        ctx.fillStyle = '#000000';
        ctx.fillText('¡Tiempo!', 410, 120);
        ctx.fillText('¿Reiniciar?', 380, 200);
        ctx.fillText('NO                    SI', 365, 270);
        ctx.fillText(`Muns: ${muns}` , 430, 320);
        ctx.fillText(`Puntuación: ${nivel.puntuacion}`, 340, 380);
    }

    if (nivel.muerte == true) {
        ctx.drawImage(cReinicio, 0, 0, 450, 450, 280, 10, 450, 450);
        ctx.font = "50px impact";
        ctx.fillStyle = '#000000';
        ctx.fillText('Game Over', 390, 120);
        ctx.fillText('¿Reiniciar?', 380, 200);
        ctx.fillText('NO                    SI', 365, 270);
        ctx.fillText(`Muns: ${muns}` , 430, 320);
        ctx.fillText(`Puntuación: ${nivel.puntuacion}`, 340, 380);
    }
}

//bucle principal
function inicio() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    imagenes();

    document.addEventListener('keydown', function (evento) {
        //Espacio
        if (evento.keyCode == 32) {
            if(movil == false){
            saltoPC = true;
            saltar();
            }
        }
        //tecla Z para atacar
        if (evento.keyCode == 90) {
            if(movil == false){
            ataquePC = true;
            atacar();
            }
        }
        //Flechas arriba y abajo
        if (evento.keyCode == 38) {
            arriba();
        }
        if (evento.keyCode == 40) {
            abajo();
        }
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        console.log('Juego en un dispositivo móvil');
        movil = true;

    } else {
        console.log('Juego en pc');
        movil = false;
    }

    canvas.addEventListener('mousedown', clicRaton, false);
    canvas.addEventListener('mouseup', sueltaRaton, false);
    canvas.addEventListener('mousemove', posicionRaton, false);

    setInterval(function () {
        principal();
    }, 1000 / fps);

}

function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}

function principal() {
    if (nivel.muerte == false && final == false && time > 0) {
        cont += 10;
        sec+=1;
    }
    borraCanvas();
    gravedad();
    logicaRoca();
    logicaEnemi();
    logicaMar();
    logicaMagia();
    dibujaFondo();
    dibujaMar();
    carril1();
    carril2();
    carril3();
    carrilTactil();
    colision();
    puntuacion();
    golpe();
    dibujaBoton();
    tiempo();
}
