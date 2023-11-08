import { Component } from '@angular/core';
import { CategoriesStore } from './home/services/category/categories-store.service';
import { ProductsStoreItem } from './home/services/product/products.storeItem';
import { SearchKeyword } from './home/types/searchKeyword.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-store';

  constructor(
    private categoriesStoreItem: CategoriesStore,
    private productsStoreItem: ProductsStoreItem,
  ) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStoreItem.loadProducts(
      'maincategoryid=' +
        searchKeyword.categoryId +
        '&keyword=' +
        searchKeyword.keyword,
    );
  }
}
