import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn : boolean = false;
numOfCartItems: number = 0;
numOfWishlistItems: number = 0;


  constructor(private _auth : AuthService, private _cartService: CartService, private _wishlistService: WishlistService){
   _auth.userToken.subscribe({
    next: (data)=> {
      if(_auth.userToken.getValue()){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    }
   })
     this._cartService.numOfCartItems.subscribe(res=>{
       this.numOfCartItems = res

      });
      
      this._wishlistService.numOfWishlistItems.subscribe(res=>{
        this.numOfWishlistItems = res
      });
  }

signOut(){
  this._auth.signOut();
}
}
