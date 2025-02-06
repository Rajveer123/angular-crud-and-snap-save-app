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
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedEmployeID = 0;
  skills: Skills[] = [];
  selectedAction: string = 'Cancel';
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
  buttonTitle: string = '';
  disPlayDeleteButton: boolean = false;
  constructor(private route: Router, private services: EmployService, private headerTitleService: HeaderTitleServiceService, private router: ActivatedRoute) { }
  ngOnInit(): void {
    //Get the ID of the selected employee from routes
    this.selectedEmployeID = this.router.snapshot.params["id"];
    this.skills.push({ name: 'Java', id: 0, checked: false });
    this.skills.push({ name: 'C#', id: 1, checked: false });
    this.skills.push({ name: 'SwiftUI', id: 2, checked: false });
    this.skills.push({ name: 'Cotlin', id: 3, checked: false });

    //Update Header and Button Title
    this.headerTitleService.setTitle(this.selectedEmployeID > 0 ? 'Update Employee' : 'Add Employee');
    this.buttonTitle = this.selectedEmployeID > 0 ? 'Update' : 'Save';
    this.disPlayDeleteButton = this.selectedEmployeID > 0;
    if (this.selectedEmployeID > 0) {
      this.updateEmployeeData()
    }
  }
  handleDelete() {
    this.selectedAction = 'Delete';
    //Open Confirm DialogPopup before Delete Employee
    this.showConfirmationMessage("Delete", "Do you really wants to delete this employe ?", true, true);
  }
  saveEmployee(type: NgForm) {
    //Perform validation before save / update employee data
    if (this.isValid()) {
      if (this.selectedEmployeID > 0) {
        this.services.updateEmployee(this.employee);
        //Open Confirm DialogPopup after Update Employee and Navigate user to Home page
        this.showConfirmationMessage("Congratulations!!", "Employee data updated successfully!!", false, true);
      } else {
        this.services.addEmployee(this.employee);
        //Open Confirm DialogPopup after Save Employee and Navigate user to Home page
        this.showConfirmationMessage("Congratulations!!", "Employee data saved successfully!!", false, true);
      }
    }
  }
  openConfirmDialogPopup(enterAnimationDuration: string, exitAnimationDuration: string, title: string, message: string, showBothButtons: boolean = false, isAfterAddEmploye: boolean = false): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: title, message: message, showBothButtons, isAfterAddEmploye }
    });
    // Handling the dialog result
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedAction == 'Delete') {
          //Delete Employee from local storage 
          this.services.deleteEmployee(this.selectedEmployeID);
        }
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
    //Reset the selected skills
    this.employee.employeeSkills = '';
    this.skills.filter((skill) => skill.id === event.id).map(skill => skill.checked = !skill.checked);
    setTimeout(() => {
      this.skills.forEach(skill => {
        if (skill.checked) {
          this.employee.employeeSkills += skill.name + ',';
        }
      });
    }, 100);
  }
  isValid(): boolean {
    let valid = true;
    if (this.employee.employeeName.trim() == null || this.employee.employeeName.trim() == undefined || this.employee.employeeName.trim() == '') {
      this.showConfirmationMessage("Alert", "Please  enter employee name.");
      return false;
    }
    if (this.employee.employeeEmailAdress.trim() == null || this.employee.employeeEmailAdress.trim() == undefined || this.employee.employeeEmailAdress.trim() == '') {
      this.showConfirmationMessage("Alert", "Please  enter employee email address.");
      return false;
    }
    if (this.employee.employeeContactNumber.trim() == null || this.employee.employeeContactNumber.trim() == undefined || this.employee.employeeContactNumber.trim() == '') {
      this.showConfirmationMessage("Alert", "Please  enter employee phone number.");
      return false;
    }
    if (this.employee.employeeDepartment.trim() == this.departmentTypes[0]) {
      this.showConfirmationMessage("Alert", "Please  select employee department.");
      return false;
    }
    if (this.employee.employeeGender.trim() == null || this.employee.employeeGender.trim() == undefined || this.employee.employeeGender.trim() == '') {
      this.showConfirmationMessage("Alert", "Please  select employee gender.", undefined);
      return false;
    }
    if (this.employee.employeeSkills.trim() == null || this.employee.employeeSkills.trim() == undefined || this.employee.employeeSkills.trim() == '') {
      this.showConfirmationMessage("Alert", "Please  select employee skills.");
      return false;
    }
    return valid;
  }
  showConfirmationMessage(title: string, message: string, showBothButtons: boolean = false, isAfterAddEmploye: boolean = false) {
    //Open Confirm DialogPopup
    this.openConfirmDialogPopup('0ms', '0ms', title, message, showBothButtons, isAfterAddEmploye);
  }
  navigateUserToHomePage() {
    //Navigate user to Home page
    this.route.navigate(['/']);
  }
  updateEmployeeData() {
    const selectedEmployee = this.services.getEmployeeById(this.selectedEmployeID);
    if (selectedEmployee != undefined) {
      this.employee = selectedEmployee;
      const selectedSkills = this.employee.employeeSkills.split(',').map((emp) => emp.trim());
      //Updating the current skills array's checked property based on selected skills
      this.skills = this.skills.map(skill => ({
        ...skill,
        checked: selectedSkills.includes(skill.name) // Update checked if name exists in selectedSkills
      }));
    } else {
      this.showConfirmationMessage("Error", "Failed to update employee data.");
    }
  }
}
