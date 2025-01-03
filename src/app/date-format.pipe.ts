import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
//   transform(value: string, p0: string) {
//     var datePipe = new DatePipe("en-US");
//      value = datePipe.transform(value, 'dd-mm-yyyy');
//      return value;
//  }
transform(value: string, format: string): string {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(value, format || 'dd-mm-yyyy') || '';
}

}