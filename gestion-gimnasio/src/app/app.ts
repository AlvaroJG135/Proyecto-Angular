import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  titulo = 'Gestion Gimnasio';
}
