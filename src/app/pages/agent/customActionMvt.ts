
// import { MatDialog } from '@angular/material/dialog';

// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// ;


// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { reduce } from 'rxjs/operators';
// import { DetailMagasin } from 'app/model/mpga/detailmagasin';
// import { MagasinService } from '../services/magasin.service';
// import { UpdateMvtComponent } from './mvt-agent/update-mvt/update-mvt.component';
// import { DetailMvtComponent } from './mvt-agent/detail-mvt/detail-mvt.component';
// import { AnnuleMvtComponent } from './mvt-agent/annule-mvt/annule-mvt.component';



// @Component({
//   template: `
// <div [shAttachMenu]="menu" [shMenuData]="value"  style="height:auto;width:auto" ><div style="margin-left:20%;">{{renderValue}}</div ></div>
// <sh-context-menu #menu  >

// <ng-template shContextMenuItem let-data (click)="detail(value?.cell?.idMouvementAgent)" *ngIf="location=='mouvement'"  >
// <div >
// <i class="fa fa-info-circle"> Détails</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="update(value?.cell?.idMouvementAgent)" *ngIf="location=='mouvement'" >
// <div >
// <i class="fa fa-edit"> Modifier</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="changer(value?.cell?.idMouvementAgent)" *ngIf="location=='mouvement'&&etat">
// <div >
// <i class="fa fa-ban"> Annuler</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="changer(value?.cell?.idMouvementAgent)" *ngIf="location=='magasin'&&etat" >
// <div >
// <i class="fa fa-lock"> Fermer</i>
// </div>
// </ng-template>
// </sh-context-menu>

// `,
// })
// export class CustomRenderMouvement implements  OnInit {
//   renderValue: string;
//   location: string;
//   etat:boolean=false;
//   @Input() value: any | number;
//   @Input() rowData: any;
 
//   detailmag= new DetailMagasin
//   data:any
//   val=''
//   source:any
//   constructor(private diag: MatDialog, private toast: ToastrService, private snap: Router,private mag:MagasinService) {

//   }
//   @Output() save: EventEmitter<any> = new EventEmitter();
 
//   ngOnInit() {
  
//       this.value.row ? this.renderValue = this.value.row.toString(): this.renderValue = null;
//       let l: any = this.snap.url.split('/');
//       this.location = l[3];
//       document.addEventListener('contextmenu', event => event.preventDefault());
     
//       // console.log('location '+this.location)
//           if(this.rowData.idEtatMouvement==1){
//         this.etat=true;
//        }
//        else {
//            this.etat=false;
//        }

    
   
//   }
 
//     update(v) {
//         if (this.location == 'mouvement') {
//             let d = {
//                 action: 'Modifier',
//                 data: v
//             }
//             const diagref = this.diag.open(UpdateMvtComponent, {
//                 width: '680px',
//                 height: 'auto',
//                 maxHeight:"95vh",
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//                 switch (res) {
//                     case "0":
//                         this.toast.error("Mouvement n'a pas été modifié !","", {timeOut: 2500})
//                         break;
//                     case "1":
//                         this.toast.success("Mouvement a été modifé avec succès","", {timeOut: 2500});
//                         this.save.emit('Done');
//                         break;
//                     default:
//                         break;
//                 }
//             })
//         }
        

//      }
   
//     detail(v) {
//         if (this.location == 'mouvement') {
//             let d = {
//                 action: 'Detail',
//                 data: v
//             }
//             const diagref = this.diag.open(DetailMvtComponent, {
//                 width: '750px',
//                 height: 'auto',
//                 maxHeight:"95vh",
//                 data: d
//             })
            
//         }
//     }
//     changer(v) {
//         if (this.location == 'mouvement') {
//             let d = {
//                 action: '',
//                 data: v
//             }
//             const diagref = this.diag.open(AnnuleMvtComponent, {
//                 width: '500px',
//                 height: 'auto',
//                 maxHeight:"95vh",
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//               switch (res) {
//                   case "0":
//                       this.toast.error("Erreur !","", {timeOut: 2500})
//                       break;
//                   case "1":
//                       this.toast.success("Mouvement a étè annulé avec succés !","", {timeOut: 2500})
//                       this.save.emit('Done');
//                       break;
//                   default:
//                       break;
//               }
//           })
//         }
//     }
   


//     // impression(v) {
//     //     if (this.location == 'magasin') {
//     //         let d = {
//     //             action: 'detail',
//     //             data: v
//     //         }
//     //         this.data=[]
//     //         console.log(this.data)
//     //         const diagref = this.diag.open(ImpressionComponent, {
//     //             width: 'auto',
//     //             height: 'auto',
                
//     //             data: d,
                
                
//     //         })

//     //         let instance = diagref.componentInstance;
//     //         instance.ngOnInit()
            
//     // //         instance.Impression(this.detailmag);
//     // //         this.mag.getmagasinbyId(v).subscribe((res:DetailMagasin)=>{
//     // //  console.log(v)
//     // //          window.print()
            
//     // //           diagref.close();
//     // //      })
            
  
//     //      }
      
//     // }

// }
