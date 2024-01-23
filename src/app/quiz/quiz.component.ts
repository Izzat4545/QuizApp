import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { categoryId, statistics } from '../../types/response';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ResultModalComponent } from './result-modal/result-modal.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatRippleModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  constructor(
    private router: Router,
    private firebase: FirebaseMethodsService,
    private dialog: MatDialog
  ) {}
  id: string = '';
  quiz: categoryId = [];
  selectedAnswer: string = '';
  statistics: statistics[] = [];
  isLoading: boolean = true;
  async getQuiz() {
    this.quiz = await this.firebase.readData('Quiz/' + this.id);
    console.log(this.quiz);
  }

  async ngOnInit(): Promise<void> {
    const currentPath = this.router.url;
    this.id = parseInt(currentPath.match(/\d+/)?.[0] || '0', 10).toString();

    await this.getQuiz();
    this.isLoading = false;
  }

  collectTheAnswers(question: string, selectedAnswer: string, answer: string) {
    this.statistics = this.statistics.filter(
      (stat) => stat.question !== question
    );
    this.statistics.push({ question, selectedAnswer, answer });
    console.log(this.statistics);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultModalComponent, {
      width: '400px', // Set the width of the dialog
      data: this.statistics,
    });
  }
}
