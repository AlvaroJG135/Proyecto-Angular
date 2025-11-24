import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private router = inject(Router);
  private auth = inject(GestionarUsuarios);
  estaAutenticado = this.auth.estaAutenticado;

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        // Redirigir al login
        this.router.navigate(['/login']);
      },
    });
  }
}
