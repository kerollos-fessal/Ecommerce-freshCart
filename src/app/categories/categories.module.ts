import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { CategorySearchPipe } from './category-search.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesComponent,
    SingleCategoryComponent,
    CategorySearchPipe
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule
  ]
})
export class CategoriesModule { }
