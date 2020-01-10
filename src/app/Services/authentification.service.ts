import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { Client } from "../models/client";

@Injectable({
  providedIn: "root"
})
export class AuthentificationService {
  basurl = "http://localhost:8080";
  jwt: string;
  username: string;
  roles: Array<String>;
  constructor(private http: HttpClient) {}
  login(data) {
    return this.http.post(this.basurl + "/login", data, {
      observe: "response"
    });
  }
  register(data) {
    return this.http.post(this.basurl + "/admin/add", data);
  }
  getprofile(): Observable<Client> {
    let headers = new HttpHeaders({ authorization: "Bearer " + this.jwt });

    return this.http.get<Client>(this.basurl + "/user/byiduser", {
      headers: headers
    });
  }

  parseJWT() {
    const jwtHelper = new JwtHelperService();
    const objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
  }
  saveToken(jwt: string) {
    sessionStorage.setItem("token", jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  private var;

  isAdmin() {
    return this.roles.indexOf("ADMIN") >= 0;
  }
  isClient() {
    return this.roles.indexOf("Client") >= 0;
  }

  isAuthenticated() {
    return this.roles && (this.isAdmin() || this.isClient());
  }

  loadToken() {
    this.jwt = sessionStorage.getItem("token");
    this.parseJWT();
  }

  logout() {
    sessionStorage.removeItem("token");
    this.initParams();
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
}
