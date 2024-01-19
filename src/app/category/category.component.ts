import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  categories = [
    { name: 'Category1' },
    { name: 'Category2' },
    { name: 'Category3' },
  ];
}
