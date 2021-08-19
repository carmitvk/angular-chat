import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'diy-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, message:string},
  public dialogRef: MatDialogRef<QuestionComponent, {res: boolean}>) { }

  public yesClicked() {
    this.dialogRef.close({
      res: true,
    });
  }
}
