import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainSliderComponent } from './pages/home/components/main-slider/main-slider.component';
import { CategoriesSliderComponent } from './pages/home/components/categories-slider/categories-slider.component';
import { FeatureProductsComponent } from './pages/home/components/feature-products/feature-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FirstTwoWordsPipe } from './pages/home/components/feature-products/first-two-words.pipe';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchPipe } from './pages/home/components/feature-products/search.pipe';
import { CheckoutComponent } from './pages/checkout/CheckoutComponent';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    OrdersComponent,
    ProductsComponent,
    RegisterComponent,
    FooterComponent,
    NavbarComponent,
    MainSliderComponent,
    CategoriesSliderComponent,
    FeatureProductsComponent,
    FirstTwoWordsPipe,
    ProductDetailsComponent,
    SearchPipe,
    CheckoutComponent,
    AllOrdersComponent,
    LoaderComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:HttpInterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
