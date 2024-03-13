import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstTwoWords'
})
export class FirstTwoWordsPipe implements PipeTransform {

  transform(value: string, numOfCharacters: number): string {
    if (!value) return '';
    return value.split(' ', numOfCharacters).join(' ');
  }

}
