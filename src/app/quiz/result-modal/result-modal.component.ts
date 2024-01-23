import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { statistics } from '../../../types/response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-modal.component.html',
})
export class ResultModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ResultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: statistics[]
  ) {}

  correctAnswers: boolean[] = [];

  ngOnInit(): void {
    this.storeCorrectAnswers();
  }

  storeCorrectAnswers() {
    this.data.map((value) => {
      if (value.answer === value.selectedAnswer) {
        this.correctAnswers.push(true);
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
