import { Pipe, PipeTransform } from '@angular/core';
import i18next from 'i18next';

@Pipe({
  name: 'i18nextNamespace',
  standalone: true,
})
export class I18NextNamespacePipe implements PipeTransform {
  transform(key: string, namespace: string = 'translation'): string {
    return i18next.t(key, { ns: namespace });
  }
}
