import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CheckCountPipe } from './check-count.pipe';


@NgModule({
  declarations: [
    CartComponent,
    CheckCountPipe
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
