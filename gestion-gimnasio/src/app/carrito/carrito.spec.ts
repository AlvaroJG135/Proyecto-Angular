import { Carrito } from './carrito';
import { CarritoService } from '../servicios/carrito.service';

describe('Carrito', () => {
  it('should create', () => {
    const carritoService = new CarritoService();
    const gestionarUsuariosStub = {
      esAdmin: () => false
    } as any;

    const component = new Carrito(carritoService, gestionarUsuariosStub);
    expect(component).toBeTruthy();
  });
});
