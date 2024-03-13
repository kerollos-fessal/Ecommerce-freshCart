import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/cart/interface/cart';
import { Product } from 'src/app/interfaces/product';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  wishlistProducts: Product[] = [];
  wishlistStatus: { [productId: string]: boolean } = {};
  cartProducts: Cart[] = [];
  cartStatus: { [id: string]: boolean } = {};
  searchKey: string = '';
  subObject: any = {};

  constructor(
    private _productsService: ProductsService,
    private _router: Router,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getProductsFromWishlist();
    this.getCartProducts();
  }

  getAllProducts() {
    return (this.subObject['getWishlist'] = this._productsService
      .getAllProducts()
      .subscribe({
        next: (data) => {
          this.allProducts = data.data;
        },
        error: (err) => {},
      }));
  }

  getCartProducts() {
    this.subObject['getCart'] = this._cartService.getCart().subscribe({
      next: (res) => {
        this.cartProducts = res.data.products;

        this.allProducts.forEach((product) => {
          if (
            this.cartProducts.some(
              (cartProduct) => cartProduct.product.id === product.id
            )
          ) {
            this.cartStatus[product.id] = true;
          } else {
            this.cartStatus[product.id] = false;
          }
        });
      },
    });
  }

  addToCart(id: string) {
    this.subObject['addToCart'] = this._cartService
      .addProductToCart(id)
      .subscribe({
        next: (data) => {
          this._cartService.numOfCartItems.next(data.numOfCartItems);
          this.cartStatus[id] = true;
          this._alertService.showAlert(data.message);
        },
        error: (err) => {},
      });
  }

  removeFromCart(id: string) {
    this.subObject['removeFromCart'] = this._cartService
      .removeProduct(id)
      .subscribe({
        next: (res) => {
          this.cartStatus[id] = false;
          this._cartService.numOfCartItems.next(res.numOfCartItems);
          this._alertService.showAlert(
            'Product removed from Cart successfully'
          );
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

  getProductsFromWishlist() {
    this.subObject['getWishlist'] = this._wishlistService
      .getWishlist()
      .subscribe({
        next: (data) => {
          this.wishlistProducts = data.data;

          this.allProducts.forEach((product) => {
            if (
              this.wishlistProducts.some(
                (wishlistProduct) => wishlistProduct.id === product.id
              )
            ) {
              this.wishlistStatus[product.id] = true;
            } else {
              this.wishlistStatus[product.id] = false;
            }
          });
        },
      });
  }

  addToWishlist(id: string) {
    this.subObject['addToWishlist'] = this._wishlistService
      .addProductToWishlist(id)
      .subscribe({
        next: (data) => {
          this.wishlistStatus[id] = true;
          this._wishlistService.numOfWishlistItems.next(data.data.length);
          this._alertService.showAlert(data.message);
        },
        error: (err) => {},
      });
  }

  removeFromWishlist(id: string) {
    this.subObject['removeFromWishlist'] = this._wishlistService
      .removeProductFromWishlist(id)
      .subscribe({
        next: (res) => {
          this.wishlistStatus[id] = false;
          this._wishlistService.numOfWishlistItems.next(res.data.length);
          this._alertService.showAlert(res.message);
        },
      });
  }

  toggleWishlist(id: string) {
    if (this.wishlistStatus[id] == true) {
      this.removeFromWishlist(id);
    } else {
      this.addToWishlist(id);
    }
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
