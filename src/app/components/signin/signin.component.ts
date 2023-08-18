import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  invalid = false;
  signedIn = false;

  user = this.fb.group({
    email: [''],
    password: [''],
  });

  async signIn() {
    this.invalid = false;
    let email = this.user.controls['email'].value;
    let password = this.user.controls['password'].value;
    if (email && password) {
      await this.auth
        .signIn(email, password)
        .then((user) => {
          this.signedIn = true;
        })
        .catch((error) => {
          this.invalid = true;
        });
    }
    this.user.reset();
  }

  signOut() {
    this.signedIn = false;
    this.auth.signOut();
  }
}
