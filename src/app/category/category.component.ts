import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { Category } from '../../types/response';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientViewComponent } from './client-view/client-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ClientViewComponent,
    AdminViewComponent,
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
    this.categories = data || [];
  }
}
