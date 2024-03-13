import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.getCart().subscribe({
        next: (res) => {
          this.numOfCartItems.next(res.numOfCartItems);
        },
      });
    }
  }

  addProductToCart(id: string): Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId: id,
    });
  }

  getCart(): Observable<any> {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  updateProductCount(count: number, id: string): Observable<any> {
    return this._http.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count: `${count}`,
    });
  }

  removeProduct(id: string): Observable<any> {
    return this._http.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }

  onlinePayment(cartId: string, shippingAddress: any): Observable<any> {
    return this._http.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shippingAddress }
    );
  }

  getUserOrders(cartId: string): Observable<any> {
    return this._http.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`
    );
  }
}
