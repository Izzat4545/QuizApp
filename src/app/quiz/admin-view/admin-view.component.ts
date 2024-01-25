import { Component, Input } from '@angular/core';
import { categoryId } from '../../../types/response';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-view.component.html',
})
export class AdminViewComponent {
  @Input({ required: true }) quiz: categoryId = [];
}
