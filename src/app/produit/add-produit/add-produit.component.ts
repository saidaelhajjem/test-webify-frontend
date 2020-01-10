import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ProduitsService } from "src/app/Services/produits.service";
import { ImageService } from "src/app/Services/image.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-produit",
  templateUrl: "./add-produit.component.html",
  styleUrls: ["./add-produit.component.css"]
})
export class AddProduitComponent implements OnInit {
  listproduit;
  produitForm: FormGroup;
  submitted = false;

  urls = [];
  filesToUpload: Array<File> = [];

  uploadedFiles = [];

  constructor(
    private router: Router,

    private formBuilder: FormBuilder,
    private img: ImageService,
    private produit: ProduitsService
  ) {}

  ngOnInit() {
    this.produitForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", Validators.required],
      price: ["", Validators.required],

      quantity: ["", Validators.required],
      image: ["", Validators.required]
    });
  }

  get f() {
    return this.produitForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.img.pushFileToStorage(this.filesToUpload[i]).subscribe(res => {});

      this.uploadedFiles.push(this.filesToUpload[i].name);
    }

    console.log("filename", this.uploadedFiles);

    const data = {
      name: this.produitForm.value.name,
      description: this.produitForm.value.description,
      price: this.produitForm.value.price,

      quantity: this.produitForm.value.quantity,
      image: this.uploadedFiles
    };

    // stop here if form is invalid
    if (this.produitForm.invalid) {
      return;
    }

    this.produit.addproduit(data).subscribe(res => {
      console.log(res);
      this.getall();
      this.router.navigate(["/home/listproduit"]);
    });

    this.produitForm.reset();
    this.uploadedFiles = [];

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: "success",
      title: "Produit Ajouter"
    });
  }

  recuperFile(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.filesToUpload.push(event.target.files[i]);
      const reader = new FileReader();

      reader.onload = (event: any) => {
        console.log(this.filesToUpload);
        this.urls.push(event.target.result);
      };

      reader.readAsDataURL(event.target.files[i]);
    }
  }

  getall() {
    this.produit.getproduit().subscribe(res => {
      console.log(res);
      this.listproduit = res;
    });
  }
}
