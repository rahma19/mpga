import { Component, OnInit, ViewEncapsulation, HostListener, Output, EventEmitter } from '@angular/core';
import { trigger,  state,  style, transition, animate } from '@angular/animations';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';
import { LoginService } from 'app/pages/login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'app/pages/services/User.service';
import { LogOut } from 'app/model/mpga/lougoutsession';
import moment from 'moment';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService],
  animations: [
    trigger('showInfo', [
      state('1' , style({ transform: 'rotate(180deg)' })),
      state('0', style({ transform: 'rotate(0deg)' })),
      transition('1 => 0', animate('400ms')),
      transition('0 => 1', animate('400ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  public showHorizontalMenu:boolean = true; 
  public showInfoContent:boolean = false;
  public settings: Settings;
  public menuItems:Array<any>;
  level:any;
  cloture:any;
  // logout =new LogOut
  session= new LogOut
  date= new Date()
  lougoutsession:any
  constructor( public appSettings:AppSettings, public menuService:MenuService,private router:Router, private toast: ToastrService ,private userService: UserService) {
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getHorizontalMenuItems();
    //   window.addEventListener("beforeunload", function (e) {
    //     localStorage.removeItem('userToken');
         
    //  });
   


    // var timeout 
    // document.onmousemove = function(){
    //   // clearTimeout(timeout);
    //   timeout = setTimeout(function(){localStorage.removeItem('userToken');},  900000);
      
    // }
    // clearTimeout(timeout);
  }
  @Output() change: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    
    if(window.innerWidth <= 768) 
      this.showHorizontalMenu = false;

      // this.tp.userLevel().subscribe((res:User)=>{
      //   if(User){
      //   this.level=res.user_name;
      //   }
      // })
  }


  LogOut()
  {
   
   var dateformat = moment(this.date).format('YYYY/MM/DD HH:mm:ss')
   console.log(dateformat)
    localStorage.removeItem('userToken');
    this.toast.success('Utilisateur déconnecté')     
// this.session.datelogout=dateformat
// this.userService. LogoutSession(this.session).subscribe(res=>{
//   this.lougoutsession=res
//   console.log( this.lougoutsession)
// })
    //this.router.navigateByUrl('/login');

  }




//   LogOut(){
//     console.log("dandan")
//     this.authService.Id();
//     this.authService.removeRoles();
//     setTimeout(() => {this.authService.removeId();}, 1000);
//     setTimeout(() => {
//       this.authService.removeToken();
//     }, 1000);  
//  }


  public closeSubMenus(){
    let menu = document.querySelector("#menu0"); 
    if(menu){
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

  @HostListener('window:resize')
  public onWindowResize():void {
     if(window.innerWidth <= 768){
        this.showHorizontalMenu = false;
     }      
      else{
        this.showHorizontalMenu = true;
      }
  }
  
}
