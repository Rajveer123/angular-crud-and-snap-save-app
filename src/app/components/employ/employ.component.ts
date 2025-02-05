import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Employee, Skills } from '../../models/employ.model';
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
import { EmployService } from '../../services/employ.service';
import { HeaderTitleServiceService } from '../../services/header.title.service.service';
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
  skills: Skills[] = [];
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
  constructor(private route: Router, private services: EmployService, private headerTitleService : HeaderTitleServiceService) { }
  ngOnInit(): void {
    //Update Header Title
    this.headerTitleService.setTitle('Add Employee');
    this.skills.push({ name: 'Java', id: 0, checked: false });
    this.skills.push({ name: 'C#', id: 1, checked: false });
    this.skills.push({ name: 'Cotlin', id: 3, checked: false });
    this.skills.push({ name: 'SwiftUI', id: 2, checked: false });
  }
  saveEmployee(type: NgForm) {
    //Perform validation before save employee data
    if(this.isValid()){
      this.services.addEmployee(this.employee);
      //Open Confirm DialogPopup after Save Employee and Navigate user to Home page
      this.showConfirmationMessage("Congratulations!!", "Employee data saved successfully!!", false, true);
    }
  }
  openConfirmDialogPopup(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message: string, showBothButtons: boolean = false, isAfterAddEmploye : boolean = false): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: title, message: message, showBothButtons, isAfterAddEmploye }
    });
    // Handling the dialog result
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Navigate user back to List page on Cancel action
        this.navigateUserToHomePage(); 
      }
    });
  }
  handleCancel() {
    //Open Confirm DialogPopup on cancel
    this.showConfirmationMessage("Please Confirm", "Would you like to cancel process ?", true);
  }
  onCheckBoxChange(event: Skills) {
    this.selectedSkills = this.selectedSkills.some(skill => skill.id === event.id)
      ? this.selectedSkills.filter(skill => skill.id !== event.id)
      : [...this.selectedSkills, { ...event, checked: true }];
    this.employee.employeeSkills = this.selectedSkills.map(skill => skill.name).join(', ');
  }
  isValid() : boolean {
    let valid = true;
    if(this.employee.employeeName.trim() == null || this.employee.employeeName.trim() == undefined || this.employee.employeeName.trim() == ''){
      this.showConfirmationMessage("Alert", "Please  enter employee name.");
      return false;
    }
    if(this.employee.employeeEmailAdress.trim() == null || this.employee.employeeEmailAdress.trim() == undefined || this.employee.employeeEmailAdress.trim() == ''){
      this.showConfirmationMessage("Alert", "Please  enter employee email address.");
      return false;
    }
    if(this.employee.employeeContactNumber.trim() == null || this.employee.employeeContactNumber.trim() == undefined || this.employee.employeeContactNumber.trim() == ''){
      this.showConfirmationMessage("Alert", "Please  enter employee phone number.");
      return false;
    }
    if(this.employee.employeeDepartment.trim() == this.departmentTypes[0]){
      this.showConfirmationMessage("Alert", "Please  select employee department.");
      return false;
    }
    if(this.employee.employeeGender.trim() == null || this.employee.employeeGender.trim() == undefined || this.employee.employeeGender.trim() == ''){
      this.showConfirmationMessage("Alert", "Please  select employee gender.", undefined);
      return false;
    }
    if(this.employee.employeeSkills.trim() == null || this.employee.employeeSkills.trim() == undefined || this.employee.employeeSkills.trim() == ''){
      this.showConfirmationMessage("Alert", "Please  select employee skills.");
      return false;
    }
    return valid;
  }
  showConfirmationMessage(title: string, message: string, showBothButtons: boolean = false, isAfterAddEmploye : boolean = false){
    //Open Confirm DialogPopup
    this.openConfirmDialogPopup('0ms', '0ms', title, message, showBothButtons, isAfterAddEmploye);
  }
  navigateUserToHomePage(){
    //Navigate user to Home page
    this.route.navigate(['/']);
  }
}
