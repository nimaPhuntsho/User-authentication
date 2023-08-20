import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}
  invalid = false;
  success = false;

  newUser = this.fb.group({
    email: ["", Validators.required],
    password: [""],
    confirmPassword: [""],
  });

  signUp() {
    let email = this.newUser.controls["email"].value;
    let password = this.newUser.controls["password"].value;
    let confirmPassword = this.newUser.controls["confirmPassword"].value;
    if (
      email &&
      password &&
      confirmPassword &&
      this.checkPassword(password, confirmPassword)
    ) {
      this.authService.createUser(email, password);
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
    } else {
      this.invalid = true;
      setTimeout(() => {
        this.invalid = false;
      }, 2000);
    }
    this.newUser.reset();
  }

  checkPassword(password: string, confirmPassword: string) {
    return password.trim() === confirmPassword.trim();
  }

  removeMessage(isActive: boolean) {
    setTimeout(() => {
      isActive = false;
    }, 2000);
  }
}
