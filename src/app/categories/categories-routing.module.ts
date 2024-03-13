import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { SingleCategoryComponent } from './single-category/single-category.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: ':id', component: SingleCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
