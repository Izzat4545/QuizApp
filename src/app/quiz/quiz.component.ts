import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { categoryId, statistics } from '../../types/response';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientViewComponent } from './client-view/client-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    ClientViewComponent,
    AdminViewComponent,
  ],
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  constructor(
    private router: Router,
    private firebase: FirebaseMethodsService
  ) {}
  id: string = '';
  quiz: categoryId = [];
  statistics: statistics[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;
  async getQuiz() {
    this.quiz = await this.firebase.readData('Quiz/' + this.id);
    this.isAdmin = await this.firebase.isUserSignedIn();
  }

  async ngOnInit(): Promise<void> {
    const currentPath = this.router.url;
    this.id = parseInt(currentPath.match(/\d+/)?.[0] || '0', 10).toString();
    await this.getQuiz();
    this.isLoading = false;
  }
}
