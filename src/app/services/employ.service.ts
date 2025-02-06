import { Injectable } from '@angular/core';
import { Employee } from '../models/employ.model';


@Injectable({
  providedIn: 'root'
})
export class EmployService {
  private storageKey = 'employeesDataBase';
  constructor() { }

  //Get All Employees
  getEmployesses(): Employee[]{
    const employees = localStorage.getItem(this.storageKey);
    return employees ? JSON.parse(employees) : [];
  }
  // Add new Employee
  addEmployee(employee: Employee): void{
    const employees = this.getEmployesses();
    employees.push(employee);
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  // Update Employee
  updateEmployee(newEmployee: Employee): void{
    let employees = this.getEmployesses();
    employees = employees.map(employee => employee.employeeId === newEmployee.employeeId ? newEmployee : employee);
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  // Delete Employee
  deleteEmployee(employeeId: number): void{
    let employees = this.getEmployesses();
    employees = employees.filter(employee => employee.employeeId != employeeId);
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  getEmployeeById(employeeId: number) : Employee | undefined {
    const employees = this.getEmployesses();
    return employees.find(employee => employee.employeeId == employeeId);
  }
}

