"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var Jugador = /** @class */ (function () {
    function Jugador() {
        this.nombre = readlineSync.question('\nIngresa tu nombre: ');
        this.puntos_salud = 20;
        this.puntos_ataque = 0;
        this.dinero = 2;
    }
    Jugador.prototype.getNombre = function () {
        return this.nombre;
    };
    Jugador.prototype.setNombre = function (value) {
        this.nombre = value;
    };
    Jugador.prototype.getPuntosSalud = function () {
        return this.puntos_salud;
    };
    Jugador.prototype.setPuntosSalud = function (value) {
        this.puntos_salud = value;
    };
    Jugador.prototype.getPuntosAtaque = function () {
        return this.puntos_ataque;
    };
    Jugador.prototype.setPuntosAtaque = function (value) {
        this.puntos_ataque = value;
    };
    Jugador.prototype.getDinero = function () {
        return this.dinero;
    };
    Jugador.prototype.setDinero = function (value) {
        this.dinero = value;
    };
    Jugador.prototype.imprimirAtributos = function () {
        console.log("\nNombre: ".concat(this.nombre));
        console.log("Puntos de Salud: ".concat(this.puntos_salud));
        console.log("Puntos de Ataque: ".concat(this.puntos_ataque));
        console.log("Dinero: ".concat(this.dinero));
    };
    Jugador.prototype.calcularFuerzaInicial = function () {
        this.puntos_ataque = Math.floor(Math.random() * 3) + 1;
    };
    return Jugador;
}());
var Enemigo = /** @class */ (function () {
    function Enemigo(nombre) {
        this.nombre = nombre;
        this.puntos_salud = 20;
        this.puntos_ataque = 0;
        this.dinero = 7;
    }
    Enemigo.prototype.getNombre = function () {
        return this.nombre;
    };
    Enemigo.prototype.setNombre = function (value) {
        this.nombre = value;
    };
    Enemigo.prototype.getPuntosSalud = function () {
        return this.puntos_salud;
    };
    Enemigo.prototype.setPuntosSalud = function (value) {
        this.puntos_salud = value;
    };
    Enemigo.prototype.getPuntosAtaque = function () {
        return this.puntos_ataque;
    };
    Enemigo.prototype.setPuntosAtaque = function (value) {
        this.puntos_ataque = value;
    };
    Enemigo.prototype.getDinero = function () {
        return this.dinero;
    };
    Enemigo.prototype.setDinero = function (value) {
        this.dinero = value;
    };
    Enemigo.prototype.calcularFuerzaEnemigo = function () {
        this.puntos_ataque = Math.floor(Math.random() * 5) + 1;
    };
    return Enemigo;
}());
var Main = /** @class */ (function () {
    // Agrega a los enemigos a la lista de enemigos vivos al inicio del juego
    function Main() {
        var _this = this;
        this.jugador = new Jugador();
        this.nombresEnemigos = ["Javi", "Evelyn", "Mar", "Isaac", "Jose"];
        this.enemigosVivos = [];
        this.nombresEnemigos.forEach(function (nombre) {
            _this.enemigosVivos.push(new Enemigo(nombre));
        });
    }
    Main.prototype.introduccion = function () {
        console.log("\n¡Bienvenido al emocionante mundo de Medac RPG!");
        console.log("En este juego, te convertirás en un valiente estudiante que se aventura a enfrentarse a sus profesores en un desafío épico.");
        console.log("Tu misión es mejorar tus habilidades, aumentar tus puntos de ataque y salud, y probar tu valentía enfrentándote a diferentes enemigos.");
        console.log("En el campus de Medac, cada rincón esconde desafíos y tesoros. Tu viaje comenzará con modestos puntos de ataque y salud, pero a medida que derrotes enemigos, ganarás oro para mejorar tus habilidades.");
        console.log("Sin embargo, ten cuidado, ya que cada enfrentamiento puede poner en peligro tu salud.");
        console.log("¿Tienes lo necesario para superar a tus profesores en este juego de rol?");
        console.log("¡Adelante, aventurero, el destino de Medac está en tus manos!");
    };
    Main.prototype.cambiarFuerzaJugador = function () {
        while (this.jugador.getDinero() >= 1) {
            var decision = readlineSync.question('\n¿Deseas cambiar tu fuerza a cambio de 1 oro? (y/n)').toLowerCase();
            if (decision === "y") {
                this.jugador.setDinero(this.jugador.getDinero() - 1);
                this.jugador.calcularFuerzaInicial();
                console.log('\nHas cambiado tu fuerza. Nueva fuerza:', this.jugador.getPuntosAtaque());
            }
            else if (decision === "n") {
                console.log('\nHas decidido no cambiar más tu fuerza.');
                break;
            }
            else {
                console.log('\nRespuesta no válida. Por favor, ingresa "y" o "n".');
            }
        }
        if (this.jugador.getDinero() == 0) {
            console.log('\nTe has quedado sin oro para cambiar más tu fuerza.');
        }
    };
    Main.prototype.lucharContraEnemigo = function () {
        if (this.enemigosVivos.length === 0) {
            console.log('¡Has derrotado a todos los enemigos! Has ganado el juego.');
            process.exit();
        }
        var enemigoIndex = Math.floor(Math.random() * this.enemigosVivos.length);
        var enemigo = this.enemigosVivos[enemigoIndex];
        console.log("\n\u00A1Te encuentras en una batalla contra ".concat(enemigo.getNombre(), "!"));
        enemigo.calcularFuerzaEnemigo();
        console.log("Fuerza del enemigo: ".concat(enemigo.getPuntosAtaque()));
        if (this.jugador.getPuntosAtaque() > enemigo.getPuntosAtaque()) {
            var diferenciaAtaque = this.jugador.getPuntosAtaque() - enemigo.getPuntosAtaque();
            // Reducción de dinero del enemigo
            if (enemigo.getDinero() > 0) {
                var oroPerdido = Math.min(enemigo.getDinero(), diferenciaAtaque);
                console.log("".concat(enemigo.getNombre(), " perdi\u00F3 ").concat(oroPerdido, " de oro."));
                enemigo.setDinero(enemigo.getDinero() - oroPerdido);
                var oroGanado = oroPerdido;
                console.log("\u00A1Ganaste la batalla y ganaste ".concat(oroGanado, " de oro!"));
                this.jugador.setDinero(this.jugador.getDinero() + oroGanado);
            }
            else {
                console.log("".concat(enemigo.getNombre(), " no tiene oro para perder."));
            }
            // Reducción de salud del enemigo
            enemigo.setPuntosSalud(enemigo.getPuntosSalud() - diferenciaAtaque);
            console.log("".concat(enemigo.getNombre(), " perdi\u00F3 ").concat(diferenciaAtaque, " puntos de salud."));
            if (enemigo.getPuntosSalud() <= 0) {
                console.log("".concat(enemigo.getNombre(), " ha sido derrotado. Est\u00E1 muerto."));
                this.enemigosVivos.splice(enemigoIndex, 1); // Elimina al enemigo derrotado de la lista
            }
        }
        else if (this.jugador.getPuntosAtaque() < enemigo.getPuntosAtaque()) {
            var diferenciaAtaque = enemigo.getPuntosAtaque() - this.jugador.getPuntosAtaque();
            this.jugador.setPuntosSalud(this.jugador.getPuntosSalud() - diferenciaAtaque);
            console.log("Perdiste la batalla y perdiste ".concat(diferenciaAtaque, " puntos de salud."));
            console.log("".concat(enemigo.getNombre(), " te ha infligido ").concat(diferenciaAtaque, " puntos de da\u00F1o."));
            if (this.jugador.getPuntosSalud() <= 0) {
                console.log('¡Tu vida ha llegado a 0! Has perdido el juego.');
                process.exit();
            }
        }
        else {
            console.log('¡Es un empate! Ninguno gana ni pierde oro.');
        }
        console.log("".concat(enemigo.getNombre(), " tiene ").concat(enemigo.getDinero(), " de oro y ").concat(enemigo.getPuntosSalud(), " puntos de vida restantes."));
    };
    Main.prototype.mostrarMenu = function () {
        console.log('\n--- Menu Principal ---');
        console.log('1. Luchar contra el enemigo');
        console.log('2. Comprar items');
        console.log('3. Consultar tus estadisticas');
        console.log('4. Salir del juego');
        var opcion = readlineSync.questionInt('\nIngresa el numero de la opcion que deseas: ');
        return opcion;
    };
    Main.prototype.mostrarOpcionesCompra = function () {
        console.log('\n--- Opciones de Compra ---');
        console.log('1. Espada - + 3 puntos de ataque - 15 de oro');
        console.log('2. Arco - + 2 puntos de ataque - 10 de oro');
        console.log('3. Poción de curación - + 3 puntos de salud - 8 de oro');
        console.log('4. Salir de la tienda');
        var opcionCompra = readlineSync.questionInt('\nIngresa el numero de la opcion que deseas: ');
        return opcionCompra;
    };
    Main.prototype.iniciarJuego = function () {
        this.introduccion();
        console.log("\n\u00A1Bienvenido, ".concat(this.jugador.getNombre(), "!"));
        this.jugador.calcularFuerzaInicial();
        console.log('\nTu fuerza inicial es:', this.jugador.getPuntosAtaque());
        this.cambiarFuerzaJugador();
        while (true) {
            var opcion = this.mostrarMenu();
            switch (opcion) {
                case 1:
                    this.lucharContraEnemigo();
                    break;
                case 2:
                    var opcionCompra = this.mostrarOpcionesCompra();
                    switch (opcionCompra) {
                        case 1:
                            if (this.jugador.getDinero() >= 15) {
                                this.jugador.setDinero(this.jugador.getDinero() - 15);
                                this.jugador.setPuntosAtaque(this.jugador.getPuntosAtaque() + 3);
                                console.log('\nHas comprado una espada. + 3 puntos de ataque.');
                            }
                            else {
                                console.log('\nNo tienes suficiente oro para comprar la espada.');
                            }
                            break;
                        case 2:
                            if (this.jugador.getDinero() >= 10) {
                                this.jugador.setDinero(this.jugador.getDinero() - 10);
                                this.jugador.setPuntosAtaque(this.jugador.getPuntosAtaque() + 2);
                                console.log('\nHas comprado un arco. + 2 puntos de ataque.');
                            }
                            else {
                                console.log('\nNo tienes suficiente oro para comprar el arco.');
                            }
                            break;
                        case 3:
                            if (this.jugador.getDinero() >= 8) {
                                this.jugador.setDinero(this.jugador.getDinero() - 8);
                                this.jugador.setPuntosSalud(this.jugador.getPuntosSalud() + 3);
                                console.log('\nHas comprado una poción de curación. + 3 puntos de salud.');
                            }
                            else {
                                console.log('\nNo tienes suficiente oro para comprar la poción de curación.');
                            }
                            break;
                        case 4:
                            break;
                        default:
                            console.log('\nOpción de compra no válida.');
                    }
                    break;
                case 3:
                    this.jugador.imprimirAtributos();
                    break;
                case 4:
                    console.log('¡Hasta luego! Gracias por jugar.');
                    process.exit();
                default:
                    console.log('Opción no válida. Por favor, selecciona una opción del menú.');
            }
        }
    };
    return Main;
}());
var juego = new Main();
juego.iniciarJuego();
