import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Category } from '../../../types/response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterLink],
  templateUrl: './client-view.component.html',
})
export class ClientViewComponent {
  @Input({ required: true }) categories: Category[] = [];
}
