import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  invalid = false;

  newUser = this.fb.group({
    email: [''],
    password: [''],
    confirmPassword: [''],
  });

  signUp() {
    let email = this.newUser.controls['email'].value;
    let password = this.newUser.controls['password'].value;
    let confirmPassword = this.newUser.controls['confirmPassword'].value;

    if (
      email &&
      password &&
      confirmPassword &&
      this.checkPassword(password, confirmPassword)
    ) {
      this.authService.createUser(email, password);
    } else this.invalid = true;
  }

  checkPassword(password: string, confirmPassword: string) {
    return password.trim() === confirmPassword.trim();
  }
}
