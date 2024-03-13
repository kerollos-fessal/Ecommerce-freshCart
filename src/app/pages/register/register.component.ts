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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  showPassword: boolean = false;
  showRepassword: boolean = false;
  apiError: string = '';
  isLoading: boolean = false;
  subObject: any = {};

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,12}$/),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      this.matchPasswords.bind(this),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const passwordControl = this.registerForm?.get('password')?.value;
    if (!passwordControl) {
      return null;
    }
    const password = passwordControl;
    const rePassword = control?.value;

    return password === rePassword ? null : { mismatch: true };
  }

  constructor(private _authService: AuthService, private _router: Router) {}

  register(form: FormGroup) {
    this.apiError = '';
    if (form.valid && !this.isLoading) {
      this.isLoading = true;
      this.subObject['signUp'] = this._authService
        .signUp(form.value)
        .subscribe({
          next: (data) => {
            if (data.message == 'success') {
              this.isLoading = false;
              this._router.navigate(['/login']);
            }
          },
          error: (err) => {
            this.apiError = err.error.message;
            this.isLoading = false;
          },
        });
    }
  }

  togglePasswordVisibility(inputName: string) {
    if (inputName == 'password') {
      this.showPassword = !this.showPassword;
    } else if (inputName == 'repassword') {
      this.showRepassword = !this.showRepassword;
    }
  }

  ngOnDestroy(): void {
    Object.keys(this.subObject).forEach((key) => {
      this.subObject[key].unsubscribe();
    });
  }
}
