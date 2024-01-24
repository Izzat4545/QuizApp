import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRipple } from '@angular/material/core';
import { FirebaseMethodsService } from './firebase-methods.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    RouterLink,
    MatRipple,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private firebase: FirebaseMethodsService,
    private router: Router
  ) {}
  title = 'QuizApp';

  isLoggedIn: boolean = false;

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.firebase.isUserSignedIn();
  }

  logOut() {
    this.firebase.logOutUser();
    location.reload();
  }
}
