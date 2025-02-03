import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLink} from '@angular/router';
import { HoverClassDirective } from '../../custom-directives/hover-class.directive';
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, RouterLink, HoverClassDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
