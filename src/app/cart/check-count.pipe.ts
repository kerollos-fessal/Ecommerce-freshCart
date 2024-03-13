import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkCount'
})
export class CheckCountPipe implements PipeTransform {

  transform(products: any[] | undefined): any[] {
    if (!products) return [];
    return products.filter((product) => product.count > 0);
  }

}
