import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidebarComponent implements OnInit {  
  public  level:any;
  public settings: Settings;
  public menuItems:Array<any>;
  public menuItemsPart:Array<any>;
  public menuItemsAff:Array<any>;
  public menuItemsVente:Array<any>;
 
  constructor(public appSettings:AppSettings, public menuService:MenuService) {
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getVerticalMenuItems();
      this.menuItemsPart=this.menuService.getVerticalmenuitems();
      this.menuItemsAff=this.menuService.getVerticalaffitems();
      this.menuItemsVente=this.menuService.getVerticalventeitems();
  }

  ngOnInit() {    
    
    // this.Tp.userLevel().subscribe((res:User)=>{
    //   if(User){
    //     this.level=res.user_level;
    //     }
    
    // }) 

    if(sessionStorage["userMenuItems"]) {
      let ids = JSON.parse(sessionStorage.getItem("userMenuItems"));
      let newArr = [];
      let Arr =[];
      let array=[];
      let vente=[];
      ids.forEach(id => {
        let newMenuItem = this.menuItems.filter(mail => mail.id == id);
        let newMenuItemPart = this.menuItemsPart.filter(mail => mail.id == id);
        let newMenuItemAff = this.menuItemsAff.filter(mail => mail.id == id);
        let newMenuItemVente = this.menuItemsVente.filter(mail => mail.id == id);
        newArr.push(newMenuItem[0]);
        Arr.push(newMenuItemPart[0]);
        array.push(newMenuItemAff[0]);
        vente.push(newMenuItemVente[0]);
      });
      this.menuItems = newArr; 
      this.menuItemsPart = Arr;
      this.menuItemsAff=array;
      this.menuItemsVente=vente;
    }

  }

  public closeSubMenus(){
    let menu = document.querySelector("#menu0");
    for (let i = 0; i < menu.children.length; i++) {
        let child = menu.children[i].children[1]; 
        if(child){
            if(child.classList.contains('show')){
              child.classList.remove('show');
              menu.children[i].children[0].classList.add('collapsed'); 
            }             
        }
    }
  }


}
