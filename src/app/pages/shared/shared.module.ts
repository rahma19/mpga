import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from '../format-number.pipe';
import { TestPipe } from './test.pipe';

import { TestDirective } from './test.directive';
import { LanguagePipe } from './language.pipe';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [TestPipe,
    TestDirective,
    LanguagePipe, FormatNumberPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormatNumberPipe,
    TestPipe,
    TestDirective,
    LanguagePipe,
    TranslateModule,

  ],
  //  providers:[FormatNumberPipe]
})
export class SharedModule { }
