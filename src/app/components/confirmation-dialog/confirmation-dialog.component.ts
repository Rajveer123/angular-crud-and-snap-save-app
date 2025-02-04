import { Component, Inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  constructor(private router : Router,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string, navigationPath : string | undefined , showBothButtons : boolean},
  ) {}
  handleButtonClick(actionType: string){
    if(actionType === 'confirm' && this.data.navigationPath != undefined){
      //Navigate to Home Page On Cancel Action
      this.router.navigate([this.data.navigationPath]);
    }
    //Close the dialog
    this.dialogRef.close(actionType);
  }
}
