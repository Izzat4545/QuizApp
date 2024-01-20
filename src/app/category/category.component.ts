import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatListModule, MatRippleModule, CommonModule, RouterLink],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  categories = [
    { name: 'Category1' },
    { name: 'Category2' },
    { name: 'Category3' },
  ];
}
