import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Employee, DepartMent } from '../../models/employ.model';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DepartmentType , DepartmentTypeToNameMapping} from '../../enums/employee.enums'
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
export class EmployComponent implements OnInit {
  selectedDepartment : string = '';
  employee: Employee = {
    employeeId: 0,
    employeeName: '',
    employeeAdress: '',
    employeeGender: '',
    employeeContactNumber: '',
    employeeDepartment: '',
    employeeSkills: ''
  }
  constructor() { }
  ngOnInit(): void {
    this.selectedDepartment = this.departmentTypes[0];
  }
  public departmentTypeToNameMapping = DepartmentTypeToNameMapping;
  public departmentTypes = Object.values(DepartmentType);
   
 
  
  saveEmployee(){

  }
  handleCancel(){

  }
}
