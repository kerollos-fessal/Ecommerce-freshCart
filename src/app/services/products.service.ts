import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._http.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  getSingleProduct(id: string | null): Observable<any> {
    return this._http.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
}
