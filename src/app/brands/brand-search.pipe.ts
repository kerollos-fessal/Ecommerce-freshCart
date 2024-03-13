import { Pipe, PipeTransform } from '@angular/core';
import { Brands } from '../interfaces/brands';

@Pipe({
  name: 'brandSearch'
})
export class BrandSearchPipe implements PipeTransform {

  transform(products: Brands[], searchKey: string): Brands[] {
    return products.filter((ele) => ele.name.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
