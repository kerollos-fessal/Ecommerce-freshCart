import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from './interface/cart';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartDetails: Cart = {} as Cart;
  apiError: string = '';
  subObject: any = {};
  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.subObject['getCart'] = this._cartService.getCart().subscribe({
      next: (data) => {
        this.cartDetails = data;
      },
      error: (err) => {
        this.apiError = 'No Products In the cart for now ,Please add some';
      },
    });
  }

  updateCount(count: number, id: string) {
    this.subObject['updateCount'] = this._cartService
      .updateProductCount(count, id)
      .subscribe({
        next: (data) => {
          this.cartDetails = data;
        },
        error: (err) => {
        },
      });
  }

  deleteProductFromCart(id: string) {
    this.subObject['deleteFromCart'] = this._cartService
      .removeProduct(id)
      .subscribe({
        next: (res) => {
          this.cartDetails = res;
          this._cartService.numOfCartItems.next(res.numOfCartItems);
          this._alertService.showAlert(
            'Product removed from Cart successfully'
          );
        },
        error: (err) => {
        },
      });
  }

  toSingleProduct(productId: string) {
    this._router.navigate(['/products', productId]);
  }

  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
      this.subObject[key].unsubscribe();
    });
  }
}
