import { AuthService } from "src/app/auth.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent {
  constructor(private auth: AuthService, private router: Router) {}
  dispplayEmail: Observable<string> | undefined;

  ngOnInit() {
    this.dispplayEmail = this.auth.curentName;
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(["signin"]);
  }
}
