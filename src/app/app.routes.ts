import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: ':category', component: QuizComponent },
];
