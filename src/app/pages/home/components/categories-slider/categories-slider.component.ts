import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.css'],
})
export class CategoriesSliderComponent implements OnInit, OnDestroy {
  allCategories: Category[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    margin: 10,
    animateIn: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  subObject: any = {};

  constructor(private _categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe({
      next: (data) => {
        this.allCategories = data.data;
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
