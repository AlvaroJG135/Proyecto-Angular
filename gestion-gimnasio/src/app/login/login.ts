import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';

@Component({
  selector: 'app-componente-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(GestionarUsuarios);
  private router = inject(Router);
  error: string="";
  codigo = '';
  clave = '';

  onSubmit() {
    this.auth.login(this.codigo, this.clave).subscribe({
      next: () => {
        this.error = "";
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.error('Login fallido', err);
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
