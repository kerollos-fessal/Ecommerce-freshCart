import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnDestroy {
  apiError: string = '';
  isLoading: boolean = false;
  cartId: string = '';
  subObject: any = {};

  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl('', [Validators.required]),
  });

  constructor(
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute,
    private _router:Router
  ) {
    this._activatedRoute.paramMap.subscribe((res: any) => {
      this.cartId = res.params.cartId;
    });
  }

  handleOnlinePayment() {
    this.apiError = '';
    this.isLoading = true;
    this.subObject['onlinePayment'] = this.subObject['handlePayment'] =
      this._cartService
        .onlinePayment(this.cartId, this.shippingAddress.value)
        .subscribe({
          next: (data) => {
            this.isLoading = false;
            if (data.status == 'success') {
              // window.location.href = data.session.url;
              //if you restored this line dont forget to remove cartid from  url in app routing module
              this._router.navigate(['/allorders']);
            }
          },
          error: (errorMessage) => {
            this.isLoading = false;
            this.apiError = errorMessage.error.message;
          },
        });
  }

  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
      this.subObject[key].unsubscribe();
    });
  }
}
