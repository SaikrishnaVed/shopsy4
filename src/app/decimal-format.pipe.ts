import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalFormat'
})
export class DecimalFormatPipe implements PipeTransform {
  transform(value: number, decimalPlaces: number = 2): string {
    if (value === null || value === undefined) return '';
    return value.toFixed(decimalPlaces);
  }
}
