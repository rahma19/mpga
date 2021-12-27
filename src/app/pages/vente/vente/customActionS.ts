
// import { MatDialog } from '@angular/material/dialog';

// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';



// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { reduce } from 'rxjs/operators';
// import { UpdateCaisseComponent } from './update-caisse/update-caisse.component';
// import { UpdateServiceComponent } from './update-service/update-service.component';
// import { ActifServiceComponent } from './actif-service/actif-service.component';



// @Component({
//   template: `
// <div [shAttachMenu]="menu" [shMenuData]="value"  style="height:auto;width:auto" ><div style="margin-left:30%;">{{renderValue}}</div ></div>
// <sh-context-menu #menu  >

// <ng-template shContextMenuItem let-data (click)="update(rowData)" *ngIf="location=='magasin'" >
// <div >
// <i class="fa fa-edit"> Modifier</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="changer(rowData)" *ngIf="location=='magasin'&&!etat">
// <div >
// <i class="fa fa-unlock"> Ouvrir</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="changer(rowData)" *ngIf="location=='magasin'&&etat" >
// <div >
// <i class="fa fa-lock"> Fermer</i>
// </div>
// </ng-template>
// </sh-context-menu>

// `,
// })
// export class CustomRenderService implements  OnInit {
//   renderValue: string;
//   location: string;
//   etat:boolean=false;
//   @Input() value: any | number;
//   @Input() rowData: any;
 
//   data:any
//   val=''
//   source:any
//   constructor(private diag: MatDialog, private toast: ToastrService, private snap: Router) {

//   }
//   @Output() save: EventEmitter<any> = new EventEmitter();
 
//   ngOnInit() {
  
//       this.value.row ? this.renderValue = this.value.row.toString(): this.renderValue = null;
//       let l: any = this.snap.url.split('/');
//       this.location = l[3];
//     //   document.addEventListener('contextmenu', event => event.preventDefault());
     
//     //   console.log('location '+this.location)
//           if(this.rowData.idEtatWallet==1){
//         this.etat=true;
//        }
//        else {
//            this.etat=false;
//        }

    
   
//   }
 
//     update(v) {
//         if (this.location == 'magasin') {
//             let d = {
//                 action: 'Modifier',
//                 data: v
//             }
//             const diagref = this.diag.open(UpdateServiceComponent, {
//                 width: '500px',
//                 height: '250px',
//                 maxHeight:"95vh",
//                 hasBackdrop: false,
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//                 switch (res) {
//                     case "0":
//                         break;
//                     case "1":
//                         this.save.emit('Done');
//                         break;
//                     default:
//                         break;
//                 }
//             })
//         }
        

//     }
//     changer(v) {
//         if (this.location == 'magasin') {
//             let d = {
//                 action: '',
//                 data: v
//             }
//             const diagref = this.diag.open(ActifServiceComponent, {
//                 width: '500px',
//                 height: 'auto',
//                 maxHeight:"95vh",
//                 hasBackdrop: false,
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//               switch (res) {
//                   case "0":
//                       this.toast.error("Erreur !","", {timeOut: 2500})
//                       break;
//                   case "1":
//                       this.toast.success("Etat service a étè changé avec succés !","", {timeOut: 2500})
//                       this.save.emit('Done');
//                       break;
//                   default:
//                       break;
//               }
//           })
//         }
//     }

// }
