import { Component} from '@angular/core';
import { Monitor } from '../monitor';
import { FormsModule } from '@angular/forms';
import { MonitorDetalle } from "../monitor-detalle/monitor-detalle";
import { GestionarMonitores } from '../servicios/gestionar-monitores';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-monitores',
  standalone : true,
  imports: [FormsModule, MonitorDetalle, RouterLink],
  templateUrl: './monitores.html',
  styleUrls: ['./monitores.css']
})
export class Monitores {

  monitores?: Monitor[];
  selectedMonitor? : Monitor;
  
  constructor(private monitorServicio: GestionarMonitores) { 
    this.monitores = [];
  }

  onSelect(monitor: Monitor): void{
    this.selectedMonitor = monitor
  }

  getMonitores(): void {
    this.monitorServicio.getMonitores()
        .subscribe(monitores => this.monitores = monitores);
  }
  ngOnInit() {
    this.getMonitores();
  }
}

