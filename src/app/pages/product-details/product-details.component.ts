import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/cart/interface/cart';
import { Product } from 'src/app/interfaces/product';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productDetails: Product = {} as Product;
  wishlistProducts: Product[] = [];
  wishlistStatus: { [productId: string]: boolean } = {};
  cartProducts: Cart[] = [];
  cartStatus: { [id: string]: boolean } = {};
  productId: string | null = '';
  subObject: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getProductById();
    this.getCartProducts();
    this.getProductsFromWishlist();
  }

  getProductById(): void {
    this.productId = this._route.snapshot.paramMap.get('id');
    this.subObject['getProduct'] = this._productsService
      .getSingleProduct(this.productId)
      .subscribe({
        next: (data) => {
          this.productDetails = data.data;
        },
        error: (err) => {
        },
      });
  }

  getProductsFromWishlist() {
    this.subObject['getProductInWishlist'] = this._wishlistService
      .getWishlist()
      .subscribe({
        next: (data) => {

          this.wishlistProducts = data.data;

          this.wishlistProducts.forEach((product) => {
            if (product.id === this.productId) {
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
        error: (err) => {
        },
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

  getCartProducts() {
    this.subObject['getCartProducts'] = this._cartService.getCart().subscribe({
      next: (res) => {
        this.cartProducts = res.data.products;

        this.cartProducts.forEach((cartProduct) => {
          if (cartProduct.product.id === this.productId) {
            this.cartStatus[cartProduct.product.id] = true;
          } else {
            this.cartStatus[cartProduct.product.id] = false;
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
        error: (err) => {
        },
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

  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
      this.subObject[key].unsubscribe();
    });
  }
}
