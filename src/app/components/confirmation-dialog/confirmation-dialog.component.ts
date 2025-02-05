import { Component,Inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

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
  
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string , showBothButtons : boolean, isAfterAddEmploye: boolean},
  ) {}
  handleButtonClick(actionType: string){
    //Close the dialog and send action to parent component
    this.dialogRef.close((this.data.showBothButtons ? (actionType === 'confirm' ? true : false) :(this.data.isAfterAddEmploye ? true : false)));
  }
}
