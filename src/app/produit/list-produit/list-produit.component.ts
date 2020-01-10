import { Component, OnInit } from "@angular/core";
import { ProduitsService } from "src/app/Services/produits.service";
import { Produit } from "src/app/models/produit";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-produit",
  templateUrl: "./list-produit.component.html",
  styleUrls: ["./list-produit.component.css"]
})
export class ListProduitComponent implements OnInit {
  listproduit;

  produitmo = new Produit();

  submitted = true;

  constructor(private produit: ProduitsService) {}

  ngOnInit() {
    this.getall();
  }
  getall() {
    this.produit.getproduit().subscribe(res => {
      console.log(res);
      this.listproduit = res;
    });
  }
}
