import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher, MatRipple } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FirebaseMethodsService } from '../firebase-methods.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRipple,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    private firebase: FirebaseMethodsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const isLoggedIn = await this.firebase.isUserSignedIn();
    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  matcher = new MyErrorStateMatcher();

  async submit() {
    if (this.emailFormControl.value && this.passwordFormControl.value) {
      await this.firebase.logInUser(
        this.emailFormControl.value,
        this.passwordFormControl.value
      );
      location.reload();
    }
  }
}
