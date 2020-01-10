import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { ContainerComponent } from './home/container/container.component';
import { RegisterComponent } from './register/register.component';
import { ListProduitComponent } from './produit/list-produit/list-produit.component';
import { AddProduitComponent } from './produit/add-produit/add-produit.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, SideBarComponent, HeaderComponent, FooterComponent, ContainerComponent, RegisterComponent, ListProduitComponent, AddProduitComponent, DetailProduitComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
