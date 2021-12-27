import { NgModule } from '@angular/core';
import { HasAnyAuthorityDirective } from './pages/login/has-anhy-authority.directive';





@NgModule({
    declarations: [
        HasAnyAuthorityDirective
    ],
    exports: [
        HasAnyAuthorityDirective
    ]
})
export class SharedModule{}