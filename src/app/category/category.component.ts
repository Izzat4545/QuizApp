import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { Category } from '../../types/response';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatListModule, MatRippleModule, CommonModule, RouterLink],
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  ngOnInit() {
    this.getCategory();
  }

  async getCategory() {
    const dataService = new FirebaseMethodsService();
    const data = await dataService.readData('Categories');
    this.categories = data;
  }
}
