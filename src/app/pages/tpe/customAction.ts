// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';

// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { reduce } from 'rxjs/operators';
// import { DetailComponent } from './tpe/detail/detail.component';
// import { ChangeEtatComponent } from './tpe/change-etat/change-etat.component';
// import { UpdateTpeComponent } from './tpe/update-tpe/update-tpe.component';



// @Component({
//   template: `
// <div [shAttachMenu]="menu" [shMenuData]="value" style="height:auto; width:auto"><div style="margin-left:40%">{{renderValue}}</div></div>
// <sh-context-menu #menu>
// <ng-template shContextMenuItem let-data (click)="detailT(value?.cell?.idTpe)" *ngIf="location=='tpe'">
// <div>
// <i class="fa fa-info-circle"> Détails</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="updateT(value?.cell?.idTpe)" *ngIf="location=='tpe'">
// <div>
// <i class="fa fa-edit"> Modifier</i>
// </div>
// </ng-template>

// </sh-context-menu>
// `,
// })
// export class CustomRenderActionHT implements  OnInit {
//   renderValue: string;
//   location: string;
//   affect:boolean;
//   check:boolean;
//   @Input() value: any | number;
//   @Input() rowData: any;
//   constructor(private diag: MatDialog, private toast: ToastrService, private snap: Router) {

//   }
//   @Output() save: EventEmitter<any> = new EventEmitter();

//   ngOnInit() {

//       this.value.row ? this.renderValue = this.value.row.toString(): this.renderValue = null;
//       let l: any = this.snap.url.split('/');
//       this.location = l[3];
//     //   document.addEventListener('contextmenu', event => event.preventDefault());
//       console.log('location '+this.location)
//       if(this.rowData.affecter==true){
//         this.affect=true;
//     }else{
//         this.affect=false;
//     }
//     if(this.rowData.idEtatTpe==1){
//         this.check=true;
//     }else{
//         this.check=false;
//     }
//   }
  
   
//     updateT(v) {
//         if (this.location == 'tpe') {
//             let d = {
//                 action: 'Modifier',
//                 data: v
//             }
//             const diagref = this.diag.open(UpdateTpeComponent, {
//                 width: '600px',
//                 height: '250px',
//                 hasBackdrop: false,
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//                 switch (res) {
//                     case "0":
//                          this.toast.error("TPE n'a pas été modifié !")
//                         break;
//                     case "1":
//                         this.toast.success("TPE a été modifé avec succès");
//                         this.save.emit('Done');
//                         break;
//                     default:
//                         break;
//                 }
//             })
//         }
//     }
  
  
//     detailT(v) {
//         if (this.location == 'tpe') {
//             let d = {
//                 action: 'Detail',
//                 data: v
//             }
//             const diagref = this.diag.open(DetailComponent, {
//                 width: '600px',
//                 maxWidth:'700px',
//                 height: '220px',
//                 hasBackdrop: false,
//                 data: d
//             })
            
//         }
//     }
//     changeEtat(v) {
//         if (this.location == 'tpe') {
//             let d = {
//                 action: 'Modifier',
//                 data: v
//             }
//             const diagref = this.diag.open(ChangeEtatComponent, {
//                 width: '500px',
//                 height: '190px',
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//                 switch (res) {
//                     case "0":
//                         this.toast.error("Etat TPE n'a pas été modifié !")
//                         break;
//                     case "1":
//                         this.toast.success("Etat TPE a été modifé avec succès");
//                         this.save.emit('Done');
//                         break;
//                     default:
//                         break;
//                 }
//             })
//         }
//     }

   
// }