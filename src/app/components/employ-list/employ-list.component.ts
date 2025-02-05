import { Component, OnInit, signal } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../models/employ.model';
import { Router } from '@angular/router';
import { EmployService } from '../../sevices/employ.service';

@Component({
  selector: 'app-employ-list',
  templateUrl: './employ-list.component.html',
  styleUrl: './employ-list.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
})
export class EmployListComponent {
  EMPLOYEE_LIST : Employee[]= [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeEmailAdress', 'employeeDepartment','employeeSkills','actions'];
  dataSource = new MatTableDataSource(this.EMPLOYEE_LIST);
  constructor(private route: Router, private services: EmployService) {
  }
  ngOnInit(): void {
    //Reset the employ list and load employ data from local storage
    this.EMPLOYEE_LIST = [];
    //Reset db data for debuging purpos
    //this.services.resetEmployeDB();
    let employees: Employee[] = this.services.getEmployesses();
    employees.forEach(employees => {
      let employee: Employee = {
        employeeId: employees.employeeId,
        employeeName: employees.employeeName,
        employeeEmailAdress: employees.employeeEmailAdress,
        employeeGender: employees.employeeGender,
        employeeContactNumber: employees.employeeContactNumber,
        employeeDepartment: employees.employeeDepartment,
        employeeSkills: employees.employeeSkills
      }
      this.EMPLOYEE_LIST.push(employee);
    });
    //update data source after setting final value of this.EMPLOYEE_LIST array
    this.dataSource = new MatTableDataSource(this.EMPLOYEE_LIST);
  } 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handleButtonClick(isUpdateAction: boolean, employeeId : string): void {
    if(isUpdateAction){

    }else{
      this.deleteEmployee(parseInt(employeeId));
    }
  }
  deleteEmployee(employeeId: number): void {
    this.services.deleteEmployee(employeeId);
    this.EMPLOYEE_LIST = this.EMPLOYEE_LIST.filter(employee => employee.employeeId!== employeeId);
    this.dataSource = new MatTableDataSource(this.EMPLOYEE_LIST);
  }
}
