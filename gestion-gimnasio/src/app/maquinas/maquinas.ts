import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
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
// RouterLink removed from imports because template may not use it here

@Component({
    selector: 'app-maquinas',
    standalone: true,
    imports: [FormsModule, MaquinaDetalle, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
    templateUrl: './maquinas.html',
    styleUrls: ['./maquinas.css'],
    encapsulation: ViewEncapsulation.None
})
export class Maquinas implements AfterViewInit {
    guardarMaquina(): void {
        const maquina = {
            modelo: this.nuevaMaquina.modelo?.trim() || '',
            marca: this.nuevaMaquina.marca || '',
            grupoMuscular: this.nuevaMaquina.grupoMuscular || '',
            resistencia: this.nuevaMaquina.resistencia || '',
            precio: this.nuevaMaquina.precio || 0
        } as Maquina;
        if (!maquina.modelo) { return; }
        this.gestionarMaquinas.addMaquina(maquina)
            .subscribe(m => {
                if (m && m._id) {
                    this.maquinas.push(m);
                    this.dataSource.data = this.maquinas;
                }
                this.mostrarFormulario = false;
                this.nuevaMaquina = {};
            },
            err => {
                console.error('Error al añadir máquina:', err);
            });
    }

    maquinas: Maquina[] = [];
    selectedMaquina?: Maquina;
    mostrarFormulario: boolean = false;
    nuevaMaquina: Partial<Maquina> = {};

    displayedColumns: string[] = ['_id', 'modelo', 'marca', 'grupoMuscular', 'resistencia', 'precio', 'acciones'];
    dataSource: MatTableDataSource<Maquina> = new MatTableDataSource<Maquina>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private gestionarMaquinas: GestionarMaquinas, private router: Router) { }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }


    onSelect(maquina: Maquina): void {
        this.selectedMaquina = maquina;
    }

    verDetalle(maquina: Maquina): void {
        this.router.navigate(['/detalle', maquina._id]);
    }

    getMaquinas(): void {
        this.gestionarMaquinas.getMaquinas().subscribe(maquinas => {
            this.maquinas = maquinas;
            this.dataSource.data = maquinas;
            if (this.paginator) { this.dataSource.paginator = this.paginator; }
            if (this.sort) { this.dataSource.sort = this.sort; }
        });
    }

    ngOnInit() {
        this.getMaquinas();
    }

    abrirFormulario(): void {
        this.mostrarFormulario = true;
        this.nuevaMaquina = {};
    }

    cancelarFormulario(): void {
        this.mostrarFormulario = false;
        this.nuevaMaquina = {};
    }

    add(modelo: string): void {
        modelo = modelo.trim();
        if (!modelo) { return; }
        this.gestionarMaquinas.addMaquina({ modelo } as Maquina)
            .subscribe(maquina => {
                this.maquinas.push(maquina);
                this.dataSource.data = this.maquinas;
            });
    }

    delete(maquina: Maquina): void {
        this.maquinas = this.maquinas.filter(h => h !== maquina);
        this.dataSource.data = this.maquinas;
        this.gestionarMaquinas.deleteMaquina(maquina._id!).subscribe();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}