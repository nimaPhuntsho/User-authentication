import { AuthService } from "./auth.service";
import { Component } from "@angular/core";
import { createUserWithEmailAndPassword, getAuth } from "@angular/fire/auth";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {}
