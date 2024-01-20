import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirebaseMethodsService } from '../firebase-methods.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatListModule, MatRippleModule, CommonModule, RouterLink],
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  ngOnInit() {
    // You can call the readData method here or in any other lifecycle hook or method
    this.apiTest();
  }
  categories = [
    { name: 'Category1' },
    { name: 'Category2' },
    { name: 'Category3' },
  ];

  async apiTest() {
    const dataService = new FirebaseMethodsService();
    const data = await dataService.readData();

    console.log(data);
  }
}
