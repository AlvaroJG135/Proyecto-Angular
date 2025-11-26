import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  //selector para usar el componente en HTML
  selector: 'app-filtro',
  standalone: true, // No necesita módulo, es independiente
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './filtro.html',
  styleUrls: ['./filtro.css']
})

// Este componente filtro que permite buscar
export class Filtro {
  
  @Input() placeholder: string = 'Filtrar...'; // Texto que se muestra en el input

  // @Output permite que el hijo comunique cambios al padre mediante event binding
  @Output() filterChange = new EventEmitter<string>();


  texto: string = ''; // Almacena el texto que escribe el usuario


  onTextoChange(value: string) {
    this.texto = value; // Actualiza la propiedad local
    this.filterChange.emit(this.texto); // EMITE el evento al padre con el texto actual
  }
}
