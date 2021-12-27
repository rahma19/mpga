import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface FormMessage {
  message: string;
  color: string;
}
export enum TYPE_MESSAGE {
  MIN,
  MAX,
  IP,
  PASSWORD,
  CUSTOM_CAR,
  NUMBER,
  LETTER,
  LETTER_NUMBER,
}
@Injectable({
  providedIn: 'root',
})
export class FormUtils {
  constructor(private translate: TranslateService) {}
  public _getFormControlMessage(type: TYPE_MESSAGE[], required: boolean, num?: number): FormMessage[] {
    const str: FormMessage[] = [];
    required && str.push(this._required());
    type.includes(TYPE_MESSAGE.MAX) && str.push(this._maxLength());
    type.includes(TYPE_MESSAGE.MIN) && str.push(this._minLength());
    type.includes(TYPE_MESSAGE.IP) && str.push(this._Ip());
    type.includes(TYPE_MESSAGE.CUSTOM_CAR) && str.push(this._custom(num));
    type.includes(TYPE_MESSAGE.NUMBER) && str.push(this._onlyNumber());
    type.includes(TYPE_MESSAGE.LETTER) && str.push(this._onlyCharacter());
    type.includes(TYPE_MESSAGE.LETTER_NUMBER) && str.push(this._letterAndNumber());
    
    return str;
  }
  private _maxLength(): FormMessage {
    return {
      message: this.translate.instant('requirements.maxlength'),
      color: '#9e9e9e',
    };
  }
  private _minLength(): FormMessage {
    return {
      message: this.translate.instant('requirements.minlength'),
      color: '#9e9e9e',
    };
  }
  private _letterAndNumber(): FormMessage {
    return {
      message: this.translate.instant('requirements.lettreChiffre'),
      color: '#9e9e9e',
    };
  }
  //   private  _password(): FormMessage {
  //       return {
  //             message: this.translate.instant('requirements.required'),
  //             color: '#9e9e9e'
  //         };
  //   }
  private _Ip(): FormMessage {
    return {
      message: this.translate.instant('requirements.ip'),
      color: '#9e9e9e',
    };
  }
  private _required(): FormMessage {
    return {
      message: this.translate.instant('requirements.required'),
      color: '#ff0000',
    };
  }
  private _onlyNumber(): FormMessage {
    return {
      message: this.translate.instant('requirements.chiffre'),
      color: '#9e9e9e',
    };
  }
  private _onlyCharacter(): FormMessage {
    return {
      message: this.translate.instant('requirements.lettre'),
      color: '#9e9e9e',
    };
  }
  private _custom(num: number): FormMessage {
      console.log(num);

    return {
      message: `${this.translate.instant(
        'requirements.custom'
      )} ${num} ${this.translate.instant('requirements.custom1')}`,
      color: '#9e9e9e',
    };
  }
  public _error(): FormMessage {
    return {
      message: this.translate.instant('requirements.error'),
      color: '#ff0000',
    };
  }
}
  //   private static _getColor(required): string {
  //     return required ? '' : '';
  //   }

