import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Maquina } from '../maquina';
import { MaquinaDetalle } from "../maquina-detalle/maquina-detalle";
import { Router } from '@angular/router';
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';
import { Filtro } from '../filtro/filtro';

@Component({
    //selector para usar el componente en HTML
    selector: 'app-maquinas',
    standalone: true,
    imports: [FormsModule, CommonModule, MaquinaDetalle, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, Filtro],
    templateUrl: './maquinas.html',
    styleUrls: ['./maquinas.css'],
    encapsulation: ViewEncapsulation.None
})
export class Maquinas implements AfterViewInit {
    // Indica si estamos en modo edición (true) o en modo creación (false)
    modoEdicion: boolean = false;

    // Guarda una nueva máquina leyendo los campos de `nuevaMaquina` y llamando al servicio
    guardarMaquina(): void {
        // Construimos el objeto Maquina a partir de los datos del formulario (nuevaMaquina)
        const maquina = {
            modelo: this.nuevaMaquina.modelo?.trim() || '',      // .trim() elimina espacios
            marca: this.nuevaMaquina.marca || '',
            grupoMuscular: this.nuevaMaquina.grupoMuscular || '',
            resistencia: this.nuevaMaquina.resistencia || '',
            precio: this.nuevaMaquina.precio || 0
        } as Maquina;

        // Si no hay modelo válido, salimos (validación mínima)
        if (!maquina.modelo) { return; }

        // Llamada al servicio para añadir la máquina
        this.gestionarMaquinas.addMaquina(maquina).subscribe(
            m => {
                // Callback de éxito: si el backend devuelve la máquina con _id, la añadimos a la lista local
                if (m && m._id) {
                    this.maquinas.push(m);
                    // Actualizamos el dataSource de la tabla para que refleje el cambio en la UI
                    this.dataSource.data = this.maquinas;
                }
                // Cerramos el formulario y limpiamos los datos temporales
                this.mostrarFormulario = false;
                this.nuevaMaquina = {};
            },
            err => {
                // Callback de error: log para depuración. Aquí podrías mostrar un snackbar al usuario.
                console.error('Error al añadir máquina:', err);
            }
        );
    }

    maquinas: Maquina[] = [];
    selectedMaquina?: Maquina;
    mostrarFormulario: boolean = false;
    nuevaMaquina: Partial<Maquina> = {};

    // Columnas que se mostrarán en la tabla (orden y nombres)
    displayedColumns: string[] = ['_id', 'modelo', 'marca', 'grupoMuscular', 'resistencia', 'precio', 'acciones'];
    // DataSource de Angular Material para la tabla
    dataSource: MatTableDataSource<Maquina> = new MatTableDataSource<Maquina>([]);

    // Referencias a los componentes MatPaginator y MatSort del template mediante ViewChild
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    // Inyección de dependencias: servicio que maneja llamadas HTTP y el router para navegar
    constructor(private gestionarMaquinas: GestionarMaquinas, private router: Router) { }

    ngAfterViewInit() {
        // Conectar paginador y ordenación con el dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // Se llama cuando el usuario selecciona una fila para editar
    onSelect(maquina: Maquina): void {
        this.modoEdicion = true;             // Activamos modo edición
        this.mostrarFormulario = true;       // Mostramos el formulario
        this.nuevaMaquina = { ...maquina };  // Clonamos la máquina seleccionada en el formulario
        this.selectedMaquina = maquina;      // Guardamos referencia a la máquina original
    }

    // Navegar a la página de detalle pasando el _id como parámetro de ruta
    verDetalle(maquina: Maquina): void {
        this.router.navigate(['/detalle', maquina._id]);
    }

    // Recupera las máquinas del backend y actualiza tanto el array local como el dataSource
    getMaquinas(): void {
        this.gestionarMaquinas.getMaquinas().subscribe(maquinas => {
            this.maquinas = maquinas;            // Guardamos las máquinas
            this.dataSource.data = maquinas;     // Actualizamos la tabla
            // Si ya existen paginator y sort (por si se llama después de AfterViewInit), los reasignamos
            if (this.paginator) { this.dataSource.paginator = this.paginator; }
            if (this.sort) { this.dataSource.sort = this.sort; }
        });
    }
    //pedimos la maquinas
    ngOnInit() {
        this.getMaquinas();
    }

    // Abrir formulario
    abrirFormulario(): void {
        this.mostrarFormulario = true;
        this.nuevaMaquina = {};
        this.modoEdicion = false;
        this.selectedMaquina = undefined;
    }

    // Cerrar formulario 
    cancelarFormulario(): void {
        this.mostrarFormulario = false;
        this.nuevaMaquina = {};
        this.selectedMaquina = undefined;
        this.modoEdicion = false;
    }

    // Modificar una maquina existente
    modificarMaquina(): void {
        // Validación minima: debe existir una maquina seleccionada y debe haber modelo en formulario
        if (!this.selectedMaquina || !this.nuevaMaquina.modelo) { return; }

        // Construimos el objeto que enviaremos al backend
        const maquinaEditada = {
            ...this.selectedMaquina,
            modelo: this.nuevaMaquina.modelo?.trim() || '',
            marca: this.nuevaMaquina.marca || '',
            grupoMuscular: this.nuevaMaquina.grupoMuscular || '',
            resistencia: this.nuevaMaquina.resistencia || '',
            precio: this.nuevaMaquina.precio || 0
        } as Maquina;

        // Llamada al servicio para actualizar
        this.gestionarMaquinas.actualizarMaquina(maquinaEditada).subscribe({
                next: m => {
                    //comprueba si la maquina modificada tiene _id y actualiza la lista
                    if (m && m._id) {
                        //busca la maquina en la lista por su _id
                        const id_maquina = this.maquinas.findIndex(ma => ma._id === m._id);
                        //si lo encuentra actualiza sus datos
                        if (id_maquina > -1) this.maquinas[id_maquina] = m;
                        this.dataSource.data = this.maquinas;
                    }
                    this.cancelarFormulario();
                },
                error: err => {
                    console.error('Error al modificar máquina:', err);
                }
            });
    }

    // Eliminar una máquina
    delete(maquina: Maquina): void {
        // Eliminamos del array local
        this.maquinas = this.maquinas.filter(h => h !== maquina);
        // Actualizamos la tabla
        this.dataSource.data = this.maquinas;
        // Llamada al servicio para borrar en backend
        this.gestionarMaquinas.deleteMaquina(maquina._id!).subscribe();
    }

    // Filtro aplicado desde un input: normalizamos el valor (trim + lowerCase) y lo aplicamos al dataSource
    applyFilter(filterValue: string) {
        const value = (filterValue || '').trim().toLowerCase();
        // MatTableDataSource usa la propiedad `filter` para filtrar internamente
        this.dataSource.filter = value;

        // Muestra la primera página para ver los resultados desde el inicio
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
