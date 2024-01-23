import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { categoryId } from '../../types/response';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatRadioModule, MatRippleModule],
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  constructor(
    private router: Router,
    private firebase: FirebaseMethodsService
  ) {}
  id: string = '';
  quiz: categoryId = [];
  async getQuiz() {
    this.quiz = await this.firebase.readData('Quiz/' + this.id);
  }
  ngOnInit(): void {
    const currentPath = this.router.url;
    this.id = parseInt(currentPath.match(/\d+/)?.[0] || '0', 10).toString();

    this.getQuiz();
  }
}
