import { Component } from '@angular/core';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/products.type';
import { CartStore } from '../../services/cart/cartStore';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, AsyncPipe, CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingsComponent } from '../ratings/ratings.component';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';

@Component({
  selector: 'app-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    NgIf,
    AsyncPipe,
    CurrencyPipe,
    FontAwesomeModule,
    RatingsComponent,
    SideNavigationComponent,
  ],
})
export class AllProductsComponent {
  faShoppingCart = faShoppingCart;

  constructor(
    public productsStore: ProductsStoreItem,
    private cart: CartStore,
  ) {}

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }
  onSelectSubCategory(subCategoryId: number): void {
    this.productsStore.loadProducts();
  }
}
