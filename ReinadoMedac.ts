import * as readlineSync from 'readline-sync';

class Jugador {
    
    nombre: string;
    puntos_salud: number;
    puntos_ataque: number;
    dinero: number;

    constructor() {
        this.nombre = readlineSync.question('\nIngresa tu nombre: ');
        this.puntos_salud = 20;
        this.puntos_ataque = 0;
        this.dinero = 2;
    }

    getNombre(): string {
        return this.nombre;
    }

    setNombre(value: string) {
        this.nombre = value;
    }

    getPuntosSalud(): number {
        return this.puntos_salud;
    }

    setPuntosSalud(value: number) {
        this.puntos_salud = value;
    }

    getPuntosAtaque(): number {
        return this.puntos_ataque;
    }

    setPuntosAtaque(value: number) {
        this.puntos_ataque = value;
    }

    getDinero(): number {
        return this.dinero;
    }

    setDinero(value: number) {
        this.dinero = value;
    }

    imprimirAtributos() {
        console.log(`\nNombre: ${this.nombre}`);
        console.log(`Puntos de Salud: ${this.puntos_salud}`);
        console.log(`Puntos de Ataque: ${this.puntos_ataque}`);
        console.log(`Dinero: ${this.dinero}`);
    }

    calcularFuerzaInicial() {
        this.puntos_ataque = Math.floor(Math.random() * 3) + 1 ;
    }
}

class Enemigo {
    
    nombre: string;
    puntos_salud: number;
    puntos_ataque: number;
    dinero: number;

    constructor(nombre: string) {
        this.nombre = nombre;
        this.puntos_salud = 20;
        this.puntos_ataque = 0;
        this.dinero = 7;
    }

    getNombre(): string {
        return this.nombre;
    }

    setNombre(value: string) {
        this.nombre = value;
    }

    getPuntosSalud(): number {
        return this.puntos_salud;
    }

    setPuntosSalud(value: number) {
        this.puntos_salud = value;
    }

    getPuntosAtaque(): number {
        return this.puntos_ataque;
    }

    setPuntosAtaque(value: number) {
        this.puntos_ataque = value;
    }

    getDinero(): number {
        return this.dinero;
    }

    setDinero(value: number) {
        this.dinero = value;
    }

    calcularFuerzaEnemigo() {
        this.puntos_ataque = Math.floor(Math.random() * 5) + 1 ;
    }
}

class Main {
    jugador: Jugador = new Jugador();
    nombresEnemigos: string[] = ["Javi", "Evelyn", "Mar", "Isaac", "Jose"];
    enemigosVivos: Enemigo[] = [];

    // Agrega a los enemigos a la lista de enemigos vivos al inicio del juego
    constructor() {
        this.nombresEnemigos.forEach((nombre) => {
            this.enemigosVivos.push(new Enemigo(nombre));
        });
    }

    introduccion() {
        console.log("\n¡Bienvenido al emocionante mundo de Medac RPG!");
        console.log("En este juego, te convertirás en un valiente estudiante que se aventura a enfrentarse a sus profesores en un desafío épico.");
        console.log("Tu misión es mejorar tus habilidades, aumentar tus puntos de ataque y salud, y probar tu valentía enfrentándote a diferentes enemigos.");
        console.log("En el campus de Medac, cada rincón esconde desafíos y tesoros. Tu viaje comenzará con modestos puntos de ataque y salud, pero a medida que derrotes enemigos, ganarás oro para mejorar tus habilidades.");
        console.log("Sin embargo, ten cuidado, ya que cada enfrentamiento puede poner en peligro tu salud.");
        console.log("¿Tienes lo necesario para superar a tus profesores en este juego de rol?");
        console.log("¡Adelante, aventurero, el destino de Medac está en tus manos!");
    }

    cambiarFuerzaJugador() {
        while (this.jugador.getDinero() >= 1) {
            const decision = readlineSync.question('\n¿Deseas cambiar tu fuerza a cambio de 1 oro? (y/n)').toLowerCase();
            if (decision === "y") {
                this.jugador.setDinero(this.jugador.getDinero() - 1);
    
                this.jugador.calcularFuerzaInicial();
    
                console.log('\nHas cambiado tu fuerza. Nueva fuerza:', this.jugador.getPuntosAtaque());
            } else if (decision === "n") {
                console.log('\nHas decidido no cambiar más tu fuerza.');
                break; 
            } else {
                console.log('\nRespuesta no válida. Por favor, ingresa "y" o "n".');
            }
        }
    
        if (this.jugador.getDinero() == 0) {
            console.log('\nTe has quedado sin oro para cambiar más tu fuerza.');
        }
    }

    lucharContraEnemigo() {
        if (this.enemigosVivos.length === 0) {
            console.log('¡Has derrotado a todos los enemigos! Has ganado el juego.');
            process.exit();
        }
    
        const enemigoIndex = Math.floor(Math.random() * this.enemigosVivos.length);
        const enemigo = this.enemigosVivos[enemigoIndex];
    
        console.log(`\n¡Te encuentras en una batalla contra ${enemigo.getNombre()}!`);
        
        enemigo.calcularFuerzaEnemigo();
    
        console.log(`Fuerza del enemigo: ${enemigo.getPuntosAtaque()}`);
        
        if (this.jugador.getPuntosAtaque() > enemigo.getPuntosAtaque()) {
            const diferenciaAtaque = this.jugador.getPuntosAtaque() - enemigo.getPuntosAtaque();
    
            // Reducción de dinero del enemigo
            if (enemigo.getDinero() > 0) {
                const oroPerdido = Math.min(enemigo.getDinero(), diferenciaAtaque);
                console.log(`${enemigo.getNombre()} perdió ${oroPerdido} de oro.`);
                enemigo.setDinero(enemigo.getDinero() - oroPerdido);
    
                const oroGanado = oroPerdido; 
                console.log(`¡Ganaste la batalla y ganaste ${oroGanado} de oro!`);
                this.jugador.setDinero(this.jugador.getDinero() + oroGanado);
            } else {
                console.log(`${enemigo.getNombre()} no tiene oro para perder.`);
            }
    
            // Reducción de salud del enemigo
            enemigo.setPuntosSalud(enemigo.getPuntosSalud() - diferenciaAtaque);
            console.log(`${enemigo.getNombre()} perdió ${diferenciaAtaque} puntos de salud.`);
    
            if (enemigo.getPuntosSalud() <= 0) {
                console.log(`${enemigo.getNombre()} ha sido derrotado. Está muerto.`);
                this.enemigosVivos.splice(enemigoIndex, 1); // Elimina al enemigo derrotado de la lista
            }
        } else if (this.jugador.getPuntosAtaque() < enemigo.getPuntosAtaque()) {
            const diferenciaAtaque = enemigo.getPuntosAtaque() - this.jugador.getPuntosAtaque();
            this.jugador.setPuntosSalud(this.jugador.getPuntosSalud() - diferenciaAtaque);
    
            console.log(`Perdiste la batalla y perdiste ${diferenciaAtaque} puntos de salud.`);
            console.log(`${enemigo.getNombre()} te ha infligido ${diferenciaAtaque} puntos de daño.`);
    
            if (this.jugador.getPuntosSalud() <= 0) {
                console.log('¡Tu vida ha llegado a 0! Has perdido el juego.');
                process.exit(); 
            }
        } else {
            console.log('¡Es un empate! Ninguno gana ni pierde oro.');
        }
        console.log(`${enemigo.getNombre()} tiene ${enemigo.getDinero()} de oro y ${enemigo.getPuntosSalud()} puntos de vida restantes.`);
    }
       
    
    mostrarMenu(): number {
        console.log('\n--- Menu Principal ---');
        console.log('1. Luchar contra el enemigo');
        console.log('2. Comprar items');
        console.log('3. Consultar tus estadisticas');
        console.log('4. Salir del juego');

        const opcion = readlineSync.questionInt('\nIngresa el numero de la opcion que deseas: ');

        return opcion;
    }

    mostrarOpcionesCompra() {
        console.log('\n--- Opciones de Compra ---');
        console.log('1. Espada - + 3 puntos de ataque - 15 de oro');
        console.log('2. Arco - + 2 puntos de ataque - 10 de oro');
        console.log('3. Poción de curación - + 3 puntos de salud - 8 de oro');
        console.log('4. Salir de la tienda');

        const opcionCompra = readlineSync.questionInt('\nIngresa el numero de la opcion que deseas: ');

        return opcionCompra;
    }

    iniciarJuego() {
        this.introduccion();
        
        console.log(`\n¡Bienvenido, ${this.jugador.getNombre()}!`);

        this.jugador.calcularFuerzaInicial();
        console.log('\nTu fuerza inicial es:', this.jugador.getPuntosAtaque());
        this.cambiarFuerzaJugador();

        while (true) {
            const opcion = this.mostrarMenu();

            switch (opcion) {
                case 1:
                    this.lucharContraEnemigo();
                    break;
                case 2:
                    const opcionCompra = this.mostrarOpcionesCompra();
                    switch (opcionCompra) {
                        case 1:
                            if (this.jugador.getDinero() >= 15) {
                                this.jugador.setDinero(this.jugador.getDinero() - 15);
                                this.jugador.setPuntosAtaque(this.jugador.getPuntosAtaque() + 3);
                                console.log('\nHas comprado una espada. + 3 puntos de ataque.');
                            } else {
                                console.log('\nNo tienes suficiente oro para comprar la espada.');
                            }
                            break;
                        case 2:
                            if (this.jugador.getDinero() >= 10) {
                                this.jugador.setDinero(this.jugador.getDinero() - 10);
                                this.jugador.setPuntosAtaque(this.jugador.getPuntosAtaque() + 2);
                                console.log('\nHas comprado un arco. + 2 puntos de ataque.');
                            } else {
                                console.log('\nNo tienes suficiente oro para comprar el arco.');
                            }
                            break;
                        case 3:
                            if (this.jugador.getDinero() >= 8) {
                                this.jugador.setDinero(this.jugador.getDinero() - 8);
                                this.jugador.setPuntosSalud(this.jugador.getPuntosSalud() + 3);
                                console.log('\nHas comprado una poción de curación. + 3 puntos de salud.');
                            } else {
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
    }
}

const juego = new Main();
juego.iniciarJuego();
