import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy{
  showPassword: boolean = false;
  showRepassword: boolean = false;
  apiError: string = '';
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,12}$/),
    ]),
  });
  subObject: any = {};

  constructor(private _authService: AuthService, private _router: Router) {}

  login(form: FormGroup) {
    this.apiError = '';
    if (form.valid && !this.isLoading) {
      this.isLoading = true;
      this.subObject['login'] =  this._authService.signIn(form.value).subscribe({
        next: (data) => {
          if (data.message == 'success') {
            localStorage.setItem('token', data.token);
            this.isLoading = false;
            this._authService.setUserToken();
            this._router.navigate(['/home']);
          }
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
