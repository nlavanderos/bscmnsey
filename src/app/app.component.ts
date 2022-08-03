import { Component } from '@angular/core';
import { Tablero } from './contenido/tablero';
import { Celda } from './contenido/celda';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'buscaminas';
  tablero: Tablero;
  estadoFinal: boolean;

  constructor() {
    //Restricciones del desafio
    const rndInt = Math.floor(Math.random() * 10) + 10;
    this.tablero = new Tablero(10, rndInt);
    this.estadoFinal = false;
  }

  chequeoCelda(celda: Celda) {
    const resultado = this.tablero.chequeoCelda(celda);
    if (resultado === 'findeljuego' && !this.estadoFinal) {
      this.estadoFinal = true;
      alert('Perdiste');
      this.tablero.mostrarTodo();
    } else if (resultado === 'ganaste' && !this.estadoFinal) {
      this.estadoFinal = true;
      alert('Has ganado !!!!');
      this.tablero.mostrarTodo();
    }
  }

  bandera(celda: Celda) {
    if (celda.estado == 'bandera') {
      celda.estado = 'abierto';
    } else {
      celda.estado = 'bandera';
    }
  }

  reinicio() {
    const rndInt = Math.floor(Math.random() * 10) + 10;
    this.tablero = new Tablero(10, rndInt);
    this.estadoFinal = false;
  }
}
