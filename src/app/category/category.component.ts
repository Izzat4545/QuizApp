import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { Category } from '../../types/response';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import generateSlug from '../../utils/slugGenerator';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatListModule,
    MatRippleModule,
    CommonModule,
    RouterLink,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  constructor(
    private firebase: FirebaseMethodsService,
    private snackBar: MatSnackBar
  ) {}
  categories: Category[] = [];
  isLoading: boolean = true;
  isAdmin: boolean = false;

  async ngOnInit() {
    await this.getCategory();
    this.isLoading = false;
    this.isAdmin = await this.firebase.isUserSignedIn();
  }

  async getCategory() {
    const data = await this.firebase.readData('Categories');
    this.categories = data;
  }
  async deleteCategory(index: number) {
    // Create a new array with the elements before and after the deleted index
    this.categories = [
      ...this.categories.slice(0, index),
      ...this.categories.slice(index + 1),
    ];
  }

  async submit() {
    const hasEmptyName = this.categories.some(
      (category) => category.name.trim() === ''
    );
    if (hasEmptyName) {
      return;
    }
    await this.firebase.postData(this.categories, 'Categories');
    this.snackBar.open('New category added', 'ok', { duration: 3000 });
  }

  async addCategory() {
    this.categories.push({ name: '', categoryId: this.categories.length + 1 });
  }

  generateUrl(url: string, id: number) {
    return generateSlug(url, id);
  }
}
