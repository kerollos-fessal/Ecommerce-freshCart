import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnDestroy{
  showPassword: boolean = false;
  showRepassword: boolean = false;
  apiError: string = '';
  isLoading: boolean = false;
  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,12}$/),
    ]),
  });
  subObject: any = {};

  constructor(private _authService: AuthService, private _router: Router) {}

  reset(form: FormGroup) {
    this.apiError = '';
    if (form.valid && !this.isLoading) {
      this.isLoading = true;
      this.subObject['reset'] =  this._authService.resetPassword(form.value).subscribe({
        next: (data) => {
          this.isLoading = false;
          this._router.navigate(['/login']);
        },
        error: (err) => {
          this.apiError = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
        this.subObject[key].unsubscribe();
    });
  }
}
