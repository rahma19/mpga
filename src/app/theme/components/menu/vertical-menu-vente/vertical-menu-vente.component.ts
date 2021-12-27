import { Component, OnInit, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '../menu.service';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { Menu } from '../menu.model';
import { LoginService } from 'app/pages/login/login.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-vertical-menu-vente',
  templateUrl: './vertical-menu-vente.component.html',
  styleUrls: ['./vertical-menu-vente.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class VerticalMenuVenteComponent implements OnInit {

  @Input('menuItems') menuItems;
  menutoRender : Array<Menu> = [];
  userProfiles;
  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              private menuService:MenuService, 
              private router: Router, 
              private elementRef:ElementRef,private loginservice : LoginService) {
      
      this.settings = this.appSettings.settings;
      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              window.scrollTo(0, 0);
              let activeLink = this.menuService.getActiveLink(this.menuItems);
              this.menuService.setActiveLink(this.menuItems, activeLink); 
              jQuery('.tooltip').tooltip('hide');
              if(window.innerWidth <= 768){
                this.settings.theme.showMenu = false; 
              }             
          }                
      }); 
  }
 
  ngOnInit() {    
    // this.userProfiles = this.loginservice.getProfiles()
    // this.userProfiles = this.userProfiles.split(",");

    let menu_wrapper = this.elementRef.nativeElement.children[0];
    
    // this.menuItems.forEach(element => {
    //   this.userProfiles.forEach(profile => {
    //     element.profil.forEach(profi => {
    //       if (profi == profile) {
    //         this.menutoRender.push(element)
    //       }
    //     });
        
    //   });
    // });
    this.menuService.createMenu(this.menuItems, menu_wrapper, 'vertical');
    if(this.settings.theme.menuType == 'mini')
      jQuery('.menu-item-link').tooltip();
  }

  ngAfterViewInit(){
     
    this.menuService.showActiveSubMenu(this.menuItems);
    let activeLink = this.menuService.getActiveLink(this.menuItems);
    this.menuService.setActiveLink(this.menuItems, activeLink); 
  } 

}
