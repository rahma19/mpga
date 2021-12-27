
// import { MatDialog } from '@angular/material/dialog';

// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';



// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { reduce } from 'rxjs/operators';
// import { DetailMagasin } from 'app/model/mpga/detailmagasin';
// import { MagasinService } from '../services/magasin.service';
// import { UpdateAgentComponent } from './liste-agent/update-agent/update-agent.component';
// import { DetailAgentComponent } from './liste-agent/detail-agent/detail-agent.component';
// import { MvtComponent } from './liste-agent/mvt/mvt.component';



// @Component({
//   template: `
// <div [shAttachMenu]="menu" [shMenuData]="value"  style="height:auto;width:auto" ><div style="margin-left:20%;">{{renderValue}}</div ></div>
// <sh-context-menu #menu  >

// <ng-template shContextMenuItem let-data (click)="detail(value?.cell?.idAgent)" *ngIf="location=='agent'"  >
// <div >
// <i class="fa fa-info-circle"> Détails</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="update(value?.cell?.idAgent)" *ngIf="location=='agent'" >
// <div >
// <i class="fa fa-edit"> Modifier</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="changer(rowData)" *ngIf="location=='agent'" >
// <div >
// <i class="fa fa-plus-square"> Mvt Agent</i>
// </div>
// </ng-template>
// </sh-context-menu>

// `,
// })
// export class CustomRenderAgent implements ViewCell, OnInit {
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
//        document.addEventListener('contextmenu', event => event.preventDefault());
     
//        console.log('location '+this.location)
//           if(this.rowData.etatMagsin=='Fermé'){
//         this.etat=false;
//        }
//        else {
//            this.etat=true;
//        }

    
   
//   }
 
//     update(v) {
//         if (this.location == 'agent') {
//             let d = {
//                 action: 'Modifier',
//                 data: v
//             }
//             const diagref = this.diag.open(UpdateAgentComponent, {
//                 width: '730px',
//                 height: 'auto',
//                 maxHeight:"95vh",
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//                 switch (res) {
//                     case "0":
//                         this.toast.error("Agent n'a pas été modifié !","", {timeOut: 2500})
//                         break;
//                     case "1":
//                         this.toast.success("Agent a été modifé avec succès","", {timeOut: 2500});
//                         this.save.emit('Done');
//                         break;
//                     default:
//                         break;
//                 }
//             })
//         }
        

//      }
   
//     detail(v) {
//         if (this.location == 'agent') {
//             let d = {
//                 action: 'Detail',
//                 data: v
//             }
//             const diagref = this.diag.open(DetailAgentComponent, {
//                 width: '800px',
//                 height: 'auto',
//                 maxHeight:"95vh",
//                 data: d
//             })
            
//         }
//     }
//     changer(v) {
//         if (this.location == 'agent') {
//             let d = {
//                 action: '',
//                 data: v
//             }
//             const diagref = this.diag.open(MvtComponent, {
//                 width: '680px',
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
//                       this.toast.success("Mouvement Agent a étè ajouté avec succés !","", {timeOut: 2500})
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
