import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {
level:any;

  constructor(private router: Router) { }
  mnt;
  ngOnInit() {

  //  this.tp.userLevel().subscribe((res:User)=>{
  //     this.level=res.user_level;
  //     if(this.level!=-1){
  //     this.ngProgress.start();
  //     this.tp.refreshMnt().subscribe(res => {
  //       this.mnt=res;
  //       this.ngProgress.done();
  //   });
  // }
  //  });
   
  
}
onSubmit() 
{
 // this.ngProgress.start();
 //  this.resfresh();
   //this.ngProgress.complete();
}
// resfresh()
// {
// this.tp.refreshMnt().subscribe((res:any) => {
//   this.mnt=res;
// });
// }
}
