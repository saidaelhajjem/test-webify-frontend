import { Component, OnInit } from "@angular/core";
import { AuthentificationService } from "src/app/Services/authentification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private authentification: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit() {}
  loggout() {
    this.authentification.logout();
    this.router.navigate([""]);
  }
}
