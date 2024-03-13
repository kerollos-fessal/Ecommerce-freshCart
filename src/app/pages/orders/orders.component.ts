import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  subObject: any = {};
  cartId: string = '';
  constructor(
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.paramMap.subscribe((res: any) => {
      this.cartId = res.params.cartId;
    });
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.subObject['getOrders'] = this._cartService
      .getUserOrders(this.cartId)
      .subscribe({
        next: (data) => {
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
