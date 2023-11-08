import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/components/header/header.component';
import { CatnavigationComponent } from './home/components/catnavigation/catnavigation.component';
import { AllProductsComponent } from './home/components/products/all-products.component';
import { ProductdetailsComponent } from './home/components/productdetails/productdetails.component';
import { CategoryService } from './home/services/category/category.service';
import { CategoriesStore } from './home/services/category/categories-store.service';
import { ProductsService } from './home/services/product/products.service';
import { ProductsStoreItem } from './home/services/product/products.storeItem';
import { CartStore } from './home/services/cart/cartStore';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotFoundComponent,
    HttpClientModule,
    HomeComponent,
    HeaderComponent,
    CatnavigationComponent,
    AllProductsComponent,
    HeaderComponent,
    ProductdetailsComponent,
  ],
  providers: [
    CategoryService,
    CategoriesStore,
    ProductsService,
    ProductsStoreItem,
    CartStore,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
