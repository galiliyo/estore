import { Category } from '../../types/category';
import { StoreItem } from '../../../shared/storeItem';
import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { filter, map } from 'rxjs';

@Injectable()
export class CategoriesStore extends StoreItem<Category[]> {
  constructor(private categoryService: CategoryService) {
    super([]);
  }

  get categories$() {
    return this.value$;
  }

  get topLevelCategories$() {
    return this.value$.pipe(
      map((category) =>
        category.filter((category) => category.parent_category_id === null),
      ),
    );
  }

  async loadCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.setValue(categories);
    });
  }
}
