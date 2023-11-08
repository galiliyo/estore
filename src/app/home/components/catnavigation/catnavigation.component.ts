import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriesStore } from '../../services/category/categories-store.service';
import { Category } from '../../types/category.type';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-catnavigation',
    templateUrl: './catnavigation.component.html',
    styleUrls: ['./catnavigation.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgFor,
        AsyncPipe,
    ],
})
export class CatnavigationComponent {
  @Output()
  categoryClicked: EventEmitter<number> = new EventEmitter<number>();

  displayOptions: boolean = true;

  constructor(
    public categoryStore: CategoriesStore,
    private router: Router,
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.displayOptions =
          (event as NavigationEnd).url === '/home/products' ? true : false;
      });
  }

  onCategoryClick(category: Category): void {
    this.categoryClicked.emit(category.id);
  }
}
