import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Employee, Skills} from '../../models/employ.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DepartmentType, DepartmentTypeToNameMapping, Gender } from '../../enums/employee.enums'
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployService } from '../../sevices/employ.service';
@Component({
  selector: 'app-employ',
  imports: [
    MatFormFieldModule, MatButtonModule,
    MatIconModule, MatInputModule, MatDividerModule,
    MatSelectModule, CommonModule,
    FormsModule, MatCheckboxModule, MatRadioModule],
  templateUrl: './employ.component.html',
  styleUrl: './employ.component.css'
})
export class EmployComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  public departmentTypeToNameMapping = DepartmentTypeToNameMapping;
  public departmentTypes = Object.values(DepartmentType);
  public genderTypes = Object.values(Gender);
  selectedSkills: Skills[] = [];
  skills:Skills[] = [];
  employee: Employee = {
    //Passing random ID to employee
    employeeId: Math.floor(Math.random() * 100000),
    employeeName: '',
    employeeEmailAdress: '',
    employeeGender: '',
    employeeContactNumber: '',
    employeeDepartment: this.departmentTypes[0],
    employeeSkills: ''
  }
  constructor(private route: Router, private services : EmployService) { }
  ngOnInit(): void {
    this.skills.push({name : 'Java', id:0, checked : false});
    this.skills.push({name : 'C#', id:1, checked : false});
    this.skills.push({name : 'Cotlin', id:3, checked : false});
    this.skills.push({name : 'SwiftUI', id:2, checked : false});
  }
  saveEmployee(type : NgForm) {
    this.services.addEmployee(this.employee);
    //Open Confirm DialogPopup after Save Employee and Navigate user to Home page
    this.openConfirmDialogPopup('0ms', '0ms', 'Congratulations!!', 'Employee data saved successfully!!','/');
   }
  openConfirmDialogPopup(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message:string, navigationPath:string, showBothButtons : boolean = false): void {
    this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
     data: { title: title, message: message, navigationPath: navigationPath, showBothButtons}
    });
  }
  handleCancel() {
    //Open Confirm DialogPopup on cancel
    this.openConfirmDialogPopup('0ms', '0ms', 'Please Confirm', 'Would you like to cancel process ?','/', true)
  }
  onCheckBoxChange(event : Skills){
    this.selectedSkills = this.selectedSkills.some(skill => skill.id === event.id)
    ? this.selectedSkills.filter(skill => skill.id !== event.id)
    : [...this.selectedSkills, { ...event, checked: true }];
    this.employee.employeeSkills = this.selectedSkills.map(skill => skill.name).join(', ');
}
}
