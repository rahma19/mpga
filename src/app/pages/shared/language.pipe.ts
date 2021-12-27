import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from 'app/theme/language/language.service';
//import { LanguageService } from '../language/language.service';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {
  language: any
  constructor(private lan: LanguageService) {

  }
  transform(value: any): string {
    console.log()
    return this.lan.getlang(value);
  }

}
