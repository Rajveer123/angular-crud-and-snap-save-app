import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Food } from '../../models/employ.model';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-employ',
  imports: [
    MatFormFieldModule, MatButtonModule,
    MatIconModule, MatInputModule,MatDividerModule, 
    MatSelectModule, CommonModule, 
    FormsModule,MatCheckboxModule,MatRadioModule],
  templateUrl: './employ.component.html',
  styleUrl: './employ.component.css'
})
export class EmployComponent {
  selectedOption = 'select'; 
  foods: Food[] = [
    {value: 'select', viewValue: '-- Select Option --'},
    {value: 'selection1', viewValue: 'Select Option1'},
    {value: 'selection2', viewValue: 'Select Option2'},
    {value: 'selection3', viewValue: 'Select Option3'},
  ];
  saveEmployee(){

  }
  handleCancel(){

  }
}
