import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,  } from '@angular/forms';


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  registroForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')
        ]
      ],
      email: ['', [Validators.required, Validators.email]]
    });
  }
    onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario enviado:', this.registroForm.value);
      alert('Registro completado con éxito 🎉');
      this.registroForm.reset();
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
    get f() {
    return this.registroForm.controls;
  }
}


