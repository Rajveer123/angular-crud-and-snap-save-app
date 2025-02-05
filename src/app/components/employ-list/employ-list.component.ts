import { Component, OnInit, inject} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../models/employ.model';
import { Router } from '@angular/router';
import { EmployService } from '../../services/employ.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HeaderTitleServiceService } from '../../services/header.title.service.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
@Component({
  selector: 'app-employ-list',
  templateUrl: './employ-list.component.html',
  styleUrl: './employ-list.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule,MatButtonModule,MatIconModule,MatDividerModule],
})
export class EmployListComponent implements OnInit{
  readonly dialog = inject(MatDialog);
  EMPLOYEE_LIST : Employee[]= [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeEmailAdress', 'employeeDepartment','employeeSkills','actions'];
  dataSource = new MatTableDataSource(this.EMPLOYEE_LIST);
  selectedEmployeeId = 0;
  constructor(private route: Router, private services: EmployService, private headerTitleService : HeaderTitleServiceService) {
  }
  ngOnInit(): void {
    
    //Update Header Title
    this.headerTitleService.setTitle('Dashboard');
    //Reset the employ list and load employ data from local storage
    this.EMPLOYEE_LIST = [];
    //Reset db data for debuging purpos
    //this.services.resetEmployeDB();
    //Get the employee data from local storage via Dependancy Injection service object
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
    this.selectedEmployeeId = parseInt(employeeId);
    if(isUpdateAction){
      this.route.navigate(['employ/',employeeId]);
    }else{
      this.openConfirmDialogPopup('0ms', '0ms', "Delete", "Do you really wants to delete this employe ?", true);
    }
  }
  deleteEmployee(employeeId: number): void {
    //Delete Employee from local storage 
    this.services.deleteEmployee(employeeId);
    //Update the employ list after deletion from local storage
    this.EMPLOYEE_LIST = this.EMPLOYEE_LIST.filter(employee => employee.employeeId!== employeeId);
    this.dataSource = new MatTableDataSource(this.EMPLOYEE_LIST);
  }
  openConfirmDialogPopup(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message: string, showBothButtons: boolean = false): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: title, message: message, showBothButtons}
    });
    // Handling the dialog result
    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Call delete employee action once user confirms
      this.deleteEmployee(this.selectedEmployeeId); 
    }
  });
  }
}
