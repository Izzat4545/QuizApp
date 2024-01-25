import { Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { categoryId, statistics } from '../../../types/response';
import { ResultModalComponent } from '../result-modal/result-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [MatRadioModule, FormsModule, CommonModule],
  templateUrl: './client-view.component.html',
})
export class ClientViewComponent {
  constructor(private dialog: MatDialog) {}
  @Input({ required: true }) quiz: categoryId = [];
  statistics: statistics[] = [];
  selectedAnswer: string = '';
  openDialog(): void {
    const dialogRef = this.dialog.open(ResultModalComponent, {
      width: '600px', // Set the width of the dialog
      data: this.statistics,
    });
  }

  collectTheAnswers(question: string, selectedAnswer: string, answer: string) {
    this.statistics = this.statistics.filter(
      (stat) => stat.question !== question
    );
    this.statistics.push({ question, selectedAnswer, answer });
  }
}
