import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { categoryId } from '../../types/response';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private firebase: FirebaseMethodsService
  ) {}
  id: string = '';
  quiz: categoryId = [];
  async getQuiz() {
    this.quiz = await this.firebase.readData('Quiz/' + this.id);
    console.log(this.quiz);
  }
  ngOnInit(): void {
    this.router.url.subscribe((segments) => {
      // Get the last segment of the URL
      const lastSegment = segments[segments.length - 1].path;

      // Extract the ID using a regular expression
      const match = lastSegment.match(/-(\d+)$/);

      // Check if there is a match and extract the ID
      if (match) {
        this.id = match[1];
      }
      this.getQuiz();
    });
  }
}
