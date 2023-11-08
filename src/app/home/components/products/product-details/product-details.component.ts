import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../types/products.type';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../../services/cart/cartStoreItem';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  shoppingCartIcon = faShoppingCart;
  protected product: Product | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    protected cartStore: CartStoreItem,
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.productsService.getProduct(id).subscribe((product) => {
        this.product = {
          ...product[0],
          price: parseFloat(String(product[0].price)),
        };
      }),
    );
  }

  addToCart() {
    if (this.product) {
      this.cartStore.addProductToCart(this.product);
    }
  }

  goBack(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
