import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
