import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';

import { ProductsComponent } from './pages/products/products.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CheckoutComponent } from './pages/checkout/CheckoutComponent';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', canActivate: [authGuard], component: HomeComponent },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: 'products', canActivate: [authGuard], component: ProductsComponent },
  { path: 'order', canActivate: [authGuard], component: OrdersComponent },
  {
    path: 'checkout/:cartId',
    canActivate: [authGuard],
    component: CheckoutComponent,
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    component: AllOrdersComponent,
  },
  {
    path: 'localhost:4200/allorders',
    canActivate: [authGuard],
    component: AllOrdersComponent,
  },
  {
    path: 'http://localhost:4200/allorders',
    canActivate: [authGuard],
    component: AllOrdersComponent,
  },
  {
    path: 'wishlist',
    canActivate: [authGuard],
    component: WishlistComponent,
  },
  {
    path: 'products/:id',
    canActivate: [authGuard],
    component: ProductDetailsComponent,
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./settings/settings.module').then((x) => x.SettingsModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./brands/brands.module').then((m) => m.BrandsModule),
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
