import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { statistics } from '../../../types/response';

@Component({
  selector: 'app-result-modal',
  standalone: true,
  imports: [],
  templateUrl: './result-modal.component.html',
})
export class ResultModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ResultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: statistics[]
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
