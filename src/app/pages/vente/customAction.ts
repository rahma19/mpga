
// import { MatDialog, MatDialogConfig, MatDialogRef, MatDialogState } from '@angular/material/dialog';

// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';



// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { reduce } from 'rxjs/operators';
// import { UpdateVenteComponent } from './vente/update-vente/update-vente.component';
// import { DetailVenteComponent } from './vente/detail-vente/detail-vente.component';
// import { ChangerEtatComponent } from './vente/changer-etat/changer-etat.component';
// import { ImpressionComponent } from './vente/impression/impression.component';
// import { DetailMagasin } from 'app/model/mpga/detailmagasin';
// import { MagasinService } from '../services/magasin.service';



// @Component({
//   template: `
// <div [shAttachMenu]="menu" [shMenuData]="value"  style="height:auto;width:auto" ><div style="margin-left:40%;">{{renderValue}}</div ></div>
// <sh-context-menu #menu  >

// <ng-template shContextMenuItem let-data (click)="detail(value?.cell?.idMagasin)" *ngIf="location=='magasin'"  >
// <div >
// <i class="fa fa-info-circle"> Détails</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="update(value?.cell?.idMagasin)" *ngIf="location=='magasin' " >
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
// export class CustomRenderMagasin implements  OnInit {
//   renderValue: string;
//   location: string;
//   etat:boolean=false;
//   @Input() value: any | number;
//   @Input() rowData: any;
 
//   detailmag= new DetailMagasin
//   data:any
//   val=''
//   source:any
//   upmag:boolean=false
//     matDialog: any;
//     matDialogRef: any;
  
//   constructor(private diag: MatDialog, private toast: ToastrService, private snap: Router,private mag:MagasinService) {

//   }
//   @Output() save: EventEmitter<any> = new EventEmitter();
 
//   ngOnInit() {
//   console.log(this.upmag)
//       this.value.row ? this.renderValue = this.value.row.toString(): this.renderValue = null;
//       let l: any = this.snap.url.split('/');
//       this.location = l[3];
//     //   document.addEventListener('contextmenu', event => event.preventDefault());
     
//       // console.log('location '+this.location)
//           if(this.rowData.etatMagsin=='Fermé'){
//         this.etat=false;
//        }
//        else {
//            this.etat=true;
//        }

    
   
//   }
 
//     update(v) {
      
//         if (this.location == 'magasin') {
            
//             let d = {
//                 action: 'Modifier',
//                 data: v
//             }
           
          
           
//             const diagref = this.diag.open(UpdateVenteComponent, {
//                 width: '820px',
//                 height: '500px',
//                 maxHeight:"95vh",
//                 hasBackdrop: false,
                
//                 data: d
//             })
          

//             diagref.afterClosed().subscribe(res => {
//                 this.upmag=true
//                 console.log(res)
//                 switch (res) {
                    
//                     case "0":
//                         this.toast.error("Magasin n'a pas été modifié !","", {timeOut: 2500})
                       
//                         break;
//                     case "1":
//                         this.toast.success("Magasin a été modifé avec succès","", {timeOut: 2500});
//                         this.save.emit('Done');
                        
//                         break;
                       
//                     default:
//                         break;
                       
//                 }
//             })
//         }
       
      
        

//     }
   
//     detail(v) {
//         if (this.location == 'magasin') {
//             let d = {
//                 action: 'Detail',
//                 data: v
//             }
            
//             const diagref = this.diag.open(DetailVenteComponent, {
//                 width: '750px',
//                 height: 'auto',
//                 maxHeight:"95vh",
//                 hasBackdrop: false,
//                 data: d
//             })
            
//         }
//     }
//     changer(v) {
//         if (this.location == 'magasin') {
//             let d = {
//                 action: '',
//                 data: v
//             }
//             const diagref = this.diag.open(ChangerEtatComponent, {
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
//                       this.toast.success("Etat magasin a étè changé avec succés !","", {timeOut: 2500})
//                       this.save.emit('Done');
//                       break;
//                   default:
//                       break;
//               }
//           })
//         }
//     }
   


//     impression(v) {
//         if (this.location == 'magasin') {
//             let d = {
//                 action: 'detail',
//                 data: v
//             }
//             this.data=[]
//             console.log(this.data)
//             const diagref = this.diag.open(ImpressionComponent, {
//                 width: 'auto',
//                 height: 'auto',
                
//                 data: d,
                
                
//             })

//             let instance = diagref.componentInstance;
//             instance.ngOnInit()
            
//     //         instance.Impression(this.detailmag);
//     //         this.mag.getmagasinbyId(v).subscribe((res:DetailMagasin)=>{
//     //  console.log(v)
//     //          window.print()
            
//     //           diagref.close();
//     //      })
            
  
//          }
      
//     }

// }
