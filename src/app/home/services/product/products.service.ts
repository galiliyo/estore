import { Injectable } from '@angular/core';
import { Product } from '../../types/products.type';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { demoProducts } from '../category/demo.data';

@Injectable()
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(query?: string): Observable<Product[]> {
    // let url: string = 'http://localhost:5001/products';
    // if (query) {
    //   url += '?' + query;
    // }
    // return this.httpClient.get<Product[]>(url);
    return of(demoProducts);
  }

  getProduct(id: number): Observable<Product[]> {
    const url: string = 'http://localhost:5001/products/' + id;
    // return this.httpClient.get<Product[]>(url);
    console.log(id);
    return of(demoProducts.filter((p) => p.id === id));
  }
}
