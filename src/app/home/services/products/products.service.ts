import { Injectable } from '@angular/core';
import { Product } from '../../types/products.type';
import { HttpClient } from '@angular/common/http';
import { demoProducts } from '../category/demo.data';
import { of } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(query: string | null) {
    // let url = 'http://localhost:5001/products' + (query || '');

    // return this.httpClient.get<Product[]>(url);
    return of(demoProducts);
  }

  getProduct(id: number) {
    let url = `http://localhost:5001/products/${id}`;
    return this.httpClient.get<Product[]>(url);
  }
}
