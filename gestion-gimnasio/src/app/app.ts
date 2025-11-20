import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';
import { Menu } from './menu/menu';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Menu],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  titulo = 'Gestion Gimnasio';
}
