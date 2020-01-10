import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProduitsService {
  constructor(private http: HttpClient) {}

  addproduit(p) {
    return this.http.post(environment.url + "/produit/add", p);
  }

  getproduit() {
    return this.http.get(environment.url + "/produit/getall");
  }
  getone(id) {
    return this.http.get(environment.url + "/produit/getone/" + id);
  }

  deleteproduit(id) {
    return this.http.delete(environment.url + "/produit/delete/" + id);
  }
}
