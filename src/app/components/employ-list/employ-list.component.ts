import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../models/employ.model';
import { Router } from '@angular/router';
import { EmployService } from '../../sevices/employ.service';

const EMPLOYEE_LIST: Employee[] = [
  {
    employeeId: 1,
    employeeName: 'John Doe',
    employeeEmailAdress: 'johndoe@example.com',
    employeeGender: 'Male',
    employeeContactNumber: '+1 123-456-7890',
    employeeDepartment: 'IT',
    employeeSkills: 'Java, C#,.NET'
  }
];
@Component({
  selector: 'app-employ-list',
  templateUrl: './employ-list.component.html',
  styleUrl: './employ-list.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
})
export class EmployListComponent {
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeEmailAdress', 'employeeDepartment','employeeSkills'];
  dataSource = new MatTableDataSource(EMPLOYEE_LIST);
  // constructor(private route: Router, private services: EmployService) {
  // }
  // ngOnInit(): void {
  //   this.EMPLOYEE_LIST = this.services.getEmployesses();
  //   console.log('Employees: ', this.EMPLOYEE_LIST);
  // } 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
