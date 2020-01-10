import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from './MustMatch';
import { AuthentificationService } from '../Services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private authenService: AuthentificationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group(
      {
        email: ["", [Validators.required]],
        username: ["", [Validators.required]],
        mot_passe: ["", [Validators.required]],
        valide_mot_passe: ["", [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: MustMatch("mot_passe", "valide_mot_passe")
      }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.RegisterForm.controls;
  }

  onregister() {
    this.submitted = true;
    const data = {
      email: this.RegisterForm.value["email"],
      username: this.RegisterForm.value["username"],

      mot_passe: this.RegisterForm.value["mot_passe"],
      valide_mot_passe: this.RegisterForm.value["valide_mot_passe"]
    };
    console.log(data);
    this.authenService.register(data).subscribe(res => {
      console.log(res);

      this.router.navigate([""]);
    });

    if (this.RegisterForm.invalid) {
      return;
    }
  }

}
