import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsComponent } from './brands.component';
import { FormsModule } from '@angular/forms';
import { BrandSearchPipe } from './brand-search.pipe';


@NgModule({
  declarations: [
    BrandsComponent,
    BrandSearchPipe,
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    FormsModule
  ]
})
export class BrandsModule { }
