import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './filtro.html',
  styleUrls: ['./filtro.css']
})
export class Filtro {
  @Input() placeholder: string = 'Filtrar...';
  @Output() filterChange = new EventEmitter<string>();

  texto: string = '';

  onTextoChange(value: string) {
    this.texto = value;
    this.filterChange.emit(this.texto);
  }
}