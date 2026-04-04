import { Injectable, computed, signal } from '@angular/core';
import { Clase } from '../clase';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private _carrito = signal<Clase[]>([]);
  carrito = this._carrito.asReadonly();
  private _reservadas = signal<Clase[]>([]);
  reservadas = this._reservadas.asReadonly();
  cantidad = computed(() => this._carrito().length);
  cantidadReservadas = computed(() => this._reservadas().length);

  addClase(clase: Clase) {
    if (!this.enCarrito(clase) && !this.enReservada(clase)) {
      this._carrito.set([...this._carrito(), clase]);
    }
  }

  removeClase(clase: Clase) {
    this._carrito.set(this._carrito().filter(c => c.id !== clase.id));
  }

  clearCarrito() {
    this._carrito.set([]);
  }

  reservarClases() {
    const nuevas = this._carrito().filter(clase => !this.enReservada(clase));
    this._reservadas.set([...this._reservadas(), ...nuevas]);
    this.clearCarrito();
  }

  enReservada(clase: Clase): boolean {
    return this._reservadas().some(c => c.id === clase.id);
  }

  enCarrito(clase: Clase): boolean {
    return this._carrito().some(c => c.id === clase.id);
  }
}
