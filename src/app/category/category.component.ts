import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { Category } from '../../types/response';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatListModule,
    MatRippleModule,
    CommonModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  isLoading: boolean = true;

  async ngOnInit() {
    await this.getCategory();
    this.isLoading = false;
  }

  async getCategory() {
    const dataService = new FirebaseMethodsService();
    const data = await dataService.readData('Categories');
    this.categories = data;
  }
}
