import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FirebaseMethodsService } from '../../firebase-methods.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../types/response';
import generateSlug from '../../../utils/slugGenerator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import generateFourDigitId from '../../../utils/idGenarator';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    RouterLink,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './admin-view.component.html',
})
export class AdminViewComponent {
  constructor(
    private firebase: FirebaseMethodsService,
    private snackBar: MatSnackBar
  ) {}

  @Input({ required: true }) categories: Category[] = [];
  async deleteCategory(index: number) {
    // Create a new array with the elements before and after the deleted index
    this.categories = [
      ...this.categories.slice(0, index),
      ...this.categories.slice(index + 1),
    ];
    await this.firebase.postData(this.categories, 'Categories');
    this.snackBar.open('Category deleted', 'ok', { duration: 3000 });
  }

  async submit() {
    const hasEmptyName = this.categories.some(
      (category) => category.name.trim() === ''
    );
    const hasIntegerInName = this.categories.some((category) =>
      /\d/.test(category.name)
    );
    if (hasEmptyName || hasIntegerInName) {
      return;
    }
    await this.firebase.postData(this.categories, 'Categories');
    this.snackBar.open('Category updated', 'ok', { duration: 3000 });
  }

  async addCategory() {
    this.categories.push({
      name: '',
      categoryId: generateFourDigitId(),
    });
  }

  generateUrl(url: string, id: number) {
    return generateSlug(url, id);
  }
}
