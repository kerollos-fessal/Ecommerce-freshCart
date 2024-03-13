import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/cart/interface/cart';
import { Product } from 'src/app/interfaces/product';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  searchKey: string = '';
  btnText: string = '+ Add to Cart';
  cartProducts: Cart[] = [];
  cartStatus: { [id: string]: boolean } = {};
  subObject: any = {};

  constructor(
    private _wishlistService: WishlistService,
    private _router: Router,
    private _cartService: CartService,
    private _alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.getWishlist();
    this.getCartProducts();
  }

  getWishlist() {
    this.subObject['getWishlist'] =  this._wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
    });
  }

  toSingleProduct(productId: string) {
    this._router.navigate(['/products', productId]);
  }

  addToCart(id: string) {
    this.subObject['addToCart'] =  this._cartService.addProductToCart(id).subscribe({
      next: (data) => {
        this._cartService.numOfCartItems.next(data.numOfCartItems);
        this.cartStatus[id] = true;
        this._alertService.showAlert(data.message);
      },
      error: (err) => {
      },
    });
  }

  removeFromCart(id: string) {
    this._cartService.removeProduct(id).subscribe({
      next: (res) => {
        this.cartStatus[id] = false;
        this._cartService.numOfCartItems.next(res.numOfCartItems);
        this._alertService.showAlert('Product removed from Cart successfully');
      },
    });
  }

  toggleCart(id: string) {
    if (this.cartStatus[id] == true) {
      this.removeFromCart(id);
    } else {
      this.addToCart(id);
    }
  }

  getCartProducts() {
    this.subObject['getCartProducts'] =  this._cartService.getCart().subscribe({
      next: (res) => {
        this.cartProducts = res.data.products;
        this.cartProducts.forEach((cartProduct) => {
          if (
            this.allProducts.some(
              (product) => cartProduct.product.id === product.id
            )
          ) {
            this.cartStatus[cartProduct.product.id] = true;
          } else {
            this.cartStatus[cartProduct.product.id] = false;
          }
        });
      },
    });
  }

  deleteProductFromWishlist(id: string) {
    this.subObject['deleteFromWishlist'] =  this._wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this._wishlistService.numOfWishlistItems.next(res.data.length);
        this.getWishlist();
        this._alertService.showAlert(res.message);
      },
    });
  }


  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
        this.subObject[key].unsubscribe();
    });
  }

}
