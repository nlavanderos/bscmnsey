import { Celda } from './celda';

//Sirve para verificar los adyacentes de las celdas
const vecinos = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export class Tablero {
  celdas: Celda[][] = [];
  private celdasRestantes = 0;
  private contadorMinas = 0;

  constructor(dimension: number, minas: number) {
    //Crea el tablero del buscaminas
    for (let x = 0; x < dimension; x++) {
      this.celdas[x] = [];
      for (let y = 0; y < dimension; y++) {
        this.celdas[x][y] = new Celda(x, y);
      }
    }

    // Añade minas a las celdas de manera aleatoria
    for (let i = 0; i < minas; i++) {
      this.obtenerCeldaAleatoria().mina = true;
    }

    /* Una vez creado el tablero y las minas.Se procede a revisar la proximidad de las minas para agregarlo al campo celda
	de esta manera podremos mostrar un numero,bomba o un vacio segun corresponda*/
    for (let x = 0; x < dimension; x++) {
      for (let y = 0; y < dimension; y++) {
        let minasAdyacentes = 0;
        for (const posicion of vecinos) {
          if (
            this.celdas[x + posicion[0]] &&
            this.celdas[x + posicion[0]][y + posicion[1]] &&
            this.celdas[x + posicion[0]][y + posicion[1]].mina
          ) {
            minasAdyacentes++;
          }
        }
        this.celdas[x][y].minasCercanas = minasAdyacentes;

        if (this.celdas[x][y].mina) {
          this.contadorMinas++;
        }
      }
    }
    this.celdasRestantes = dimension * dimension - this.contadorMinas;
  }

  obtenerCeldaAleatoria(): Celda {
    const x = Math.floor(Math.random() * this.celdas.length);
    const y = Math.floor(Math.random() * this.celdas[x].length);
    return this.celdas[x][y];
  }

  chequeoCelda(celda: Celda): 'findeljuego' | 'ganaste' | null {
    if (celda.estado !== 'abierto') {
      return null;
    } else if (celda.mina) {
      this.mostrarTodo();
      return 'findeljuego';
    } else {
      celda.estado = 'limpio';

      // Empty cell, let's clear the whole block.
      if (celda.minasCercanas === 0) {
        for (const posicion of vecinos) {
          if (
            this.celdas[celda.fila + posicion[0]] &&
            this.celdas[celda.fila + posicion[0]][celda.columna + posicion[1]]
          ) {
            this.chequeoCelda(
              this.celdas[celda.fila + posicion[0]][celda.columna + posicion[1]]
            );
          }
        }
      }

      if (this.celdasRestantes-- <= 1) {
        return 'ganaste';
      }
      return null;
    }
  }

  mostrarTodo() {
    for (const fila of this.celdas) {
      for (const celda of fila) {
        if (celda.estado === 'abierto') {
          celda.estado = 'limpio';
        }
      }
    }
  }
}
