import { Component, OnInit, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Employee, DepartMent } from '../../models/employ.model';
import { CommonModule } from '@angular/common';
import {FormGroup, FormGroupName, FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { DepartmentType , DepartmentTypeToNameMapping} from '../../enums/employee.enums'
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
  readonly dialog = inject(MatDialog);
  selectedDepartment : string = '';
  employee: Employee = {
    employeeId: 0,
    employeeName: '',
    employeeEmailAdress: '',
    employeeGender: '',
    employeeContactNumber: '',
    employeeDepartment: '',
    employeeSkills: ''
  }
  constructor(private route : Router) { }
  ngOnInit(): void {
    this.selectedDepartment = this.departmentTypes[0];
  }
  public departmentTypeToNameMapping = DepartmentTypeToNameMapping;
  public departmentTypes = Object.values(DepartmentType);
   
 
  
  saveEmployee(){

  }
  openConfirmDialogPopup(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title : 'Please Confirm', message : 'Would you like to cancel process ?', navigationPath : '/'}
    });
    this.dialog.afterAllClosed.subscribe((result) => {
      console.log('result is : '+this.dialog);
    });
    
  }
  handleCancel(){
    //Open Confirm DialogPopup on cancel
    this.openConfirmDialogPopup('0ms', '0ms')
  }
}
