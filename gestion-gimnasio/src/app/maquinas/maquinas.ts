import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Maquina } from '../maquina';
import { MaquinaDetalle } from "../maquina-detalle/maquina-detalle";
import { GestionarMaquinas } from '../servicios/gestionar-maquinas';
// RouterLink removed from imports because template may not use it here

@Component({
    selector: 'app-maquinas',
    standalone: true,
    imports: [
        FormsModule, MaquinaDetalle, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
    templateUrl: './maquinas.html',
    styleUrls: ['./maquinas.css'],
    encapsulation: ViewEncapsulation.None
})
export class Maquinas implements AfterViewInit {

    maquinas: Maquina[] = [];
    selectedMaquina?: Maquina;

    displayedColumns: string[] = ['id', 'modelo', 'marca', 'grupoMuscular', 'resistencia', 'precio', 'acciones'];
    dataSource: MatTableDataSource<Maquina> = new MatTableDataSource<Maquina>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private gestionarMaquinas: GestionarMaquinas) {}

    ngAfterViewInit() {
        // if data already loaded, assign paginator/sort; otherwise they'll be set when data arrives
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onSelect(maquina: Maquina): void {
        this.selectedMaquina = maquina;
    }

    getMaquinas(): void {
        this.gestionarMaquinas.getMaquinas().subscribe(maquinas => {
            this.maquinas = maquinas;
            this.dataSource.data = maquinas;
            // Re-assign paginator and sort in case they were not ready earlier
            if (this.paginator) { this.dataSource.paginator = this.paginator; }
            if (this.sort) { this.dataSource.sort = this.sort; }
        });
    }

    ngOnInit() {
        this.getMaquinas();
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
        this.gestionarMaquinas.deleteMaquina(maquina).subscribe();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}