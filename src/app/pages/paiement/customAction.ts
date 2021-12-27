// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';

// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { reduce } from 'rxjs/operators';
// import { ModifierBinComponent } from './paiement/modifier-bin/modifier-bin.component';
// import { SupprimerBinComponent } from './paiement/supprimer-bin/supprimer-bin.component';
// import { DetailBinComponent } from './paiement/detail-bin/detail-bin.component';



// @Component({
//   template: `
// <div [shAttachMenu]="menu" [shMenuData]="value" style="height:auto; width:auto"><div style="margin-left:40%">{{renderValue}}</div></div>
// <sh-context-menu #menu>
// <ng-template shContextMenuItem let-data (click)="detail(value?.cell?.idBin)" *ngIf="location=='service_paiement'">
// <div>
// <i class="fa fa-info-circle"> Détails</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="update(value?.cell?.idBin)" *ngIf="location=='service_paiement'">
// <div>
// <i class="fa fa-edit"> Modifier</i>
// </div>

// </ng-template>
// <ng-template shContextMenuItem let-data (click)="supprimerbin(value?.cell?.idBin)" *ngIf="location=='service_paiement'">
// <div>
// <i class="fa fa-trash"> Supprimer</i>
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
  
   
//     update(v) {
//         if (this.location == 'service_paiement') {
//             let d = {
//                 action: 'Modifier',
//                 data: v
//             }
//             const diagref = this.diag.open(ModifierBinComponent, {
//                 width: '600px',
//                 height: '300px',
//                 hasBackdrop: false,
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//                 switch (res) {
//                     case "0":
//                         //  this.toast.error("TPE n'a pas été modifié !")
//                         break;
//                     case "1":
//                         // this.toast.success("TPE a été modifé avec succès");
//                         this.save.emit('Done');
//                         break;
//                     default:
//                         break;
//                 }
//             })
//         }
//     }
  
  
//     detail(v) {
//         if (this.location == 'service_paiement') {
//             let d = {
//                 action: 'Detail',
//                 data: v
//             }
//             const diagref = this.diag.open( DetailBinComponent, {
//                 width: '500px',
//                 maxWidth:'700px',
//                 height: 'auto',
//                 maxHeight:'700px',
//                 hasBackdrop: false,
//                 data: d
//             })
            
//         }
//     }
//     supprimerbin(v) {
//         if (this.location == 'service_paiement') {
//             let d = {
//                 action: 'supprimer',
//                 data: v
//             }
//             const diagref = this.diag.open(SupprimerBinComponent, {
//                 width: '500px',
//                 height: 'auto',
//                 hasBackdrop: false,
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//                 switch (res) {
//                     case "0":
//                         // this.toast.error("Etat TPE n'a pas été modifié !")
//                         break;
//                     case "1":
//                         // this.toast.success("Etat TPE a été modifé avec succès");
//                         this.save.emit('Done');
//                         break;
//                     default:
//                         break;
//                 }
//             })
//         }
//     }

   
// }