import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit, OnDestroy {
  categoryId: string | null = '';
  categoryDetails: Category = {} as Category;
  subObject: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(): void {
    this.categoryId = this._route.snapshot.paramMap.get('id');
    this.subObject['getProduct'] =  this._categoriesService.getSingleCategory(this.categoryId).subscribe({
      next: (data) => {
        this.categoryDetails = data.data;
      },
      error: (err) => {
      },
    });
  }


  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
        this.subObject[key].unsubscribe();
    });
  }
}
