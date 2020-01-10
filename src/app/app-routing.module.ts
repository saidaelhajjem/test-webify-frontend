import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ContainerComponent } from "./home/container/container.component";
import { RegisterComponent } from "./register/register.component";
import { ListProduitComponent } from "./produit/list-produit/list-produit.component";
import { AddProduitComponent } from "./produit/add-produit/add-produit.component";
import { DetailProduitComponent } from "./detail-produit/detail-produit.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "", component: ContainerComponent },
      { path: "listproduit", component: ListProduitComponent },
      { path: "addproduit", component: AddProduitComponent },
      {
        path: "listproduit/detailproduit/:id",
        component: DetailProduitComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
