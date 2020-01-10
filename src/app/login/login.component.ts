import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthentificationService } from "../Services/authentification.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private authenService: AuthentificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      mot_passe: ["", [Validators.required]]
    });
  }

  onlogin() {
    this.submitted = true;
    const data = {
      username: this.loginForm.value["username"],

      mot_passe: this.loginForm.value["mot_passe"]
    };

    this.authenService.login(data).subscribe(
      res => {
        console.log(res);

        const jwt = res.headers.get("Authorization");
        this.authenService.saveToken(jwt);

        this.router.navigate(["home"]);
      },
      error2 => {
        Swal.fire("OPPs", "Vérifier vos coordonnées:)", "error");
      }
    );

    if (this.loginForm.invalid) {
      return;
    }
  }
}
