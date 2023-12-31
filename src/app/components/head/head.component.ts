import { Component } from "@angular/core";

@Component({
  selector: "app-head",
  templateUrl: "./head.component.html",
  styleUrls: ["./head.component.scss"],
})
export class HeadComponent {
  show = false;
  clear = true;

  showMenu() {
    this.show = !this.show;
  }

  clearMenu() {
    this.show = false;
  }
}
