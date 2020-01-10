import { Component, OnInit } from "@angular/core";
import { ProduitsService } from "../Services/produits.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detail-produit",
  templateUrl: "./detail-produit.component.html",
  styleUrls: ["./detail-produit.component.css"]
})
export class DetailProduitComponent implements OnInit {
  detail_prod;
  listimage;

  constructor(
    private detailprod: ProduitsService,
    private activaterout: ActivatedRoute
  ) {
    this.activaterout.paramMap.subscribe(params => {
      this.getone(params["params"]["id"]);
    });
  }

  ngOnInit() {}
  getone(id) {
    this.detailprod.getone(id).subscribe(res => {
      console.log(res);
      this.detail_prod = res;
      this.listimage = res["image"];
      console.log(this.listimage);
    });
  }
}
