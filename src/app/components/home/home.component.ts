import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterLink} from '@angular/router';
import { HoverClassDirective } from '../../custom-directives/hover-class.directive';
import { EmployListComponent } from '../employ-list/employ-list.component';
@Component({
  selector: 'app-home',
  imports: [MatGridListModule, RouterLink, HoverClassDirective, EmployListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
