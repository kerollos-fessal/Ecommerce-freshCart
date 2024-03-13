import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnDestroy {
  isLoading: boolean = false;
  apiError: string = '';
  successMsg: string = '';
  codeSuccess: string = '';
  subObject: any = {};

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private _authService: AuthService, private _router: Router) {}

  sendCode(form: FormGroup): void {
    this.isLoading = true;
    this.apiError = '';
    this.successMsg = '';
    this.subObject['sendCode'] = this._authService
      .forgotPassword(form.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.successMsg = res.message;
          document.querySelector('.forgotPassword')?.classList.add('d-none');
          document.querySelector('.verifyCode')?.classList.remove('d-none');
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message;
        },
      });
  }

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });
  verifyResetCode(form: FormGroup) {
    this.isLoading = true;
    this.apiError = '';
    this.successMsg = '';
    this.codeSuccess = '';
    this.subObject['removeFromWishlist'] = this._authService
      .verifyResetCode(form.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.codeSuccess = res.status;
          if (res.status == 'Success') {
            this._router.navigate(['/resetPassword']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message;
        },
      });
  }

  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
      this.subObject[key].unsubscribe();
    });
  }
}
