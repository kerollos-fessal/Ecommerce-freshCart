import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  numOfWishlistItems: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.getWishlist().subscribe({
        next: (res) => {
          this.numOfWishlistItems.next(res.count);
        },
      });
    }
  }

  addProductToWishlist(id: string): Observable<any> {
    return this._http.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
      productId: id,
    });
  }

  removeProductFromWishlist(id: string): Observable<any> {
    return this._http.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }

  getWishlist(): Observable<any> {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/wishlist');
  }
}
