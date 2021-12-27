import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { LanguageService } from 'app/theme/language/language.service';
@Component({
  selector: 'app-flags-menu',
  templateUrl: './flags-menu.component.html',
  styleUrls: ['./flags-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlagsMenuComponent implements OnInit {
  constructor(private lan: LanguageService) { }
  // hedhi tekhou mel localStorage ritha attend hani bech namel aliha test 

  language = localStorage.getItem('lang');
  ngOnInit() {
    if(environment.language == null || environment.language== undefined){
      environment.language= 'FR';
    }
    if(this.language == null || this.language == undefined){
      this.language = 'FR'
    }
    this.lang(environment.language)
  }
  lang(l) {
    if (l != environment.language) {
      environment.language = l;
      localStorage.setItem('lang', l);
      document.location.reload();
    }
  }
}
