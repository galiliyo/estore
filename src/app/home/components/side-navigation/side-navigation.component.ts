import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Category } from '../../types/category';
import { CategoriesStore } from '../../services/category/categories-store.service';
import { Subscription } from 'rxjs';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit, OnDestroy {
  @Output()
  subCategorySelected = new EventEmitter<number>();

  categories: Category[] = [];
  mainCategories = [] as Category[];

  private subs: Subscription | null = null;

  constructor(private categoryStore: CategoriesStore) {}

  ngOnInit() {
    this.subs = this.categoryStore.categories$.subscribe((categories) => {
      this.categories = categories;
      this.mainCategories = this.getCategories();
    });
  }

  getCategories(parentCategoryId?: number) {
    return this.categories.filter((category) =>
      parentCategoryId
        ? category.parent_category_id === parentCategoryId
        : !category.parent_category_id,
    );
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  selectSubCategory(id: number) {
    this.subCategorySelected.emit(id);
  }
}
