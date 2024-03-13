import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../interfaces/category';

@Pipe({
  name: 'categorySearch',
})
export class CategorySearchPipe implements PipeTransform {
  transform(products: Category[], searchKey: string): Category[] {
    return products.filter((ele) =>
      ele.name.toLowerCase().includes(searchKey.toLowerCase())
    );
  }
}
