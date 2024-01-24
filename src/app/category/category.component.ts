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
  ],
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  constructor(private firebase: FirebaseMethodsService) {}
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

  // async updateCategory(index: number, name: string) {
  //   this.categories[index] = {
  //     categoryId: this.categories[index].categoryId,
  //     name: name,
  //   };
  //   await this.firebase.postData(this.categories, 'Categories');
  // }
  async deleteCategory(index: number) {
    this.categories = this.categories.splice(index, 1);
    await this.firebase.postData(this.categories, 'Categories');
  }

  async submit() {
    await this.firebase.postData(this.categories, 'Categories');
  }

  async addCategory() {
    this.categories.push({ name: '', categoryId: this.categories.length + 1 });
    await this.firebase.postData(this.categories, 'Categories');
  }
}
