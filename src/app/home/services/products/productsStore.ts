import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { BehaviorSubject, map, subscribeOn } from 'rxjs';
import { Product } from '../../types/products.type';
import { StoreItem } from '../../../shared/storeItem';

@Injectable()
export class ProductsStore extends StoreItem<Product[]> {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private productService: ProductsService) {
    super([]);
  }

  get products$() {
    return this.value$;
  }

  get products() {
    return this.value;
  }

  getProductById$(id: number) {
    return this.value$.pipe(
      map((products) => products.find((product) => product.id === id)),
    );
  }

  async loadProducts(query?: string) {
    this.loadingSubject.next(true);
    this.productService.getAllProducts(query || null).subscribe({
      next: (products) => {
        this.setValue(
          products.map((product) => ({
            ...product,
            price: parseFloat(String(product.price)),
          })),
        );
        this.loadingSubject.next(false);
      },
      error: (error) => {
        // Handle API error here
        console.error('API error:', error);
        this.loadingSubject.next(false); // Ensure that loading is set to false in case of an error
      },
    });
  }
}
