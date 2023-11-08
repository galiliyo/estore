import { Injectable } from '@angular/core';
import { Category } from '../../types/category.type';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { demoCategories } from './demo.data';

@Injectable()
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    // return this.httpClient.get<Category[]>('http://localhost:5001/categories');
    return of(demoCategories);
  }
}
