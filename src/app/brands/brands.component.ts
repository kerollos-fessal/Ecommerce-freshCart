import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../services/brands.service';
import { Brands } from '../interfaces/brands';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit, OnDestroy {

  allBrands: Brands[] = [];
  searchKey: string = '';
  subObject: any = {};
  constructor(private _brandsService: BrandsService){}
  ngOnInit(): void {
    this.getAllBrands()    
    }
  
  
    getAllBrands(){
      this.subObject['getAllBrands'] =  this._brandsService.getBrands().subscribe({
        next:(res)=>{
          this.allBrands = res.data;
        }
      })
    }


    
ngOnDestroy(): void {
  Object.keys(this.subObject).forEach((key) => {
      this.subObject[key].unsubscribe();
  });
}
}
