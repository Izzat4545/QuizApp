import { Component, Input } from '@angular/core';
import { categoryId } from '../../../types/response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { FirebaseMethodsService } from '../../firebase-methods.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatRipple,
  ],
  templateUrl: './admin-view.component.html',
})
export class AdminViewComponent {
  constructor(
    private firebase: FirebaseMethodsService,
    private snackBar: MatSnackBar
  ) {}
  error = '';
  @Input({ required: true }) quiz: categoryId = [];
  @Input({ required: true }) id: string = '';

  addQuiz() {
    this.quiz.push({
      question: '',
      answer: ' ',
      firstOption: '',
      secondOption: '',
      thirdOption: '',
    });
  }

  makeItAnswer(index: number, answer: string) {
    this.quiz[index].answer = answer;
  }
  async deleteQuiz(index: number) {
    this.quiz = [...this.quiz.slice(0, index), ...this.quiz.slice(index + 1)];
    await this.firebase.postData(this.quiz, 'Quiz');
    this.snackBar.open('Quiz deleted', 'ok', { duration: 3000 });
  }

  async submit() {
    const hasEmptyAnswer = this.quiz.some(
      (category) => category.answer.trim() === ''
    );
    const hasEmptyQuestion = this.quiz.some(
      (category) => category.question.trim() === ''
    );
    const hasEmptyFirstOption = this.quiz.some(
      (category) => category.firstOption.trim() === ''
    );
    const hasEmptySecondOption = this.quiz.some(
      (category) => category.secondOption.trim() === ''
    );
    const hasEmptyThirdOption = this.quiz.some(
      (category) => category.thirdOption.trim() === ''
    );
    if (
      hasEmptyQuestion ||
      hasEmptyFirstOption ||
      hasEmptySecondOption ||
      hasEmptyThirdOption
    ) {
      return;
    }
    if (hasEmptyAnswer) {
      this.error = 'Please choose correct answer';
      return;
    }

    this.error = '';

    await this.firebase.postData(this.quiz, 'Quiz/' + this.id);
    this.snackBar.open('Quiz updated', 'ok', { duration: 3000 });
  }
}
