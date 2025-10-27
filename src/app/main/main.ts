import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
  ],
  templateUrl: './main.html',
  standalone: true,
  styleUrl: './main.scss'
})
export class Main {

}
