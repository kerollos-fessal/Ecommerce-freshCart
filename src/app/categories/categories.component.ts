import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  allCategories: Category[] = [];
  searchKey: string = '';
  subObject: any = {};
  constructor(
    private _categoriesService: CategoriesService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.subObject['getAllCategories'] = this._categoriesService
      .getCategories()
      .subscribe({
        next: (res) => {
          this.allCategories = res.data;
        },
      });
  }

  toSingleCategory(categoryId: string) {
    this._router.navigate(['/categories', categoryId]);
  }

  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
      this.subObject[key].unsubscribe();
    });
  }
}
