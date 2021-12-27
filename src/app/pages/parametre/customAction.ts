// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';

// import { ToastrService } from 'ngx-toastr';
// import { DetailParametreComponent } from './parametre/detail-parametre/detail-parametre.component';
// import { UpdateParametreComponent } from './parametre/update-parametre/update-parametre.component';


// @Component({
//     template: `
    
//   <div [shAttachMenu]="menu" [shMenuData]="value" style="height:auto;width:auto"><div style="margin-left:30%;">{{renderValue}}</div></div>
//   <sh-context-menu #menu>
// <ng-template shContextMenuItem let-data (click)="detail(value?.cell?.idParametre)" *ngIf="location=='parametre'">
// <div>
// <i class="fa fa-info-circle"> Détails</i>
// </div>
// </ng-template>
// <ng-template shContextMenuItem let-data (click)="update(value?.cell?.idParametre)" *ngIf="location=='parametre'">
// <div>
// <i class="fa fa-edit"> Modifier</i>
// </div>
// </ng-template>
// </sh-context-menu>
//   `,
// })
// // export class CustomRenderParam implements OnInit {
//     renderValue: string;
//     location: string;
//     etatclientValue:any
    
//     @Input() value: any | number;
//     @Input() rowData: any;

//     constructor(private diag: MatDialog, private toast: ToastrService,private snap: Router) {

//     }
//     @Output() save: EventEmitter<any> = new EventEmitter();
//     // .toUpperCase()
    
//     ngOnInit() {
//         this.value.row ? this.renderValue = this.value.row.toString()  : this.renderValue=null ; 
 
//        let l: any = this.snap.url.split('/');
//        this.location = l[3];
//     //    document.addEventListener('contextmenu', event => event.preventDefault());
//       //  console.log('location '+this.location)
//     //   document.addEventListener('contextmenu', event => event.preventDefault());
//     }
//     update(v) {
//         if (this.location == 'parametre') {
//             let d = {
//                 action: 'Modifier',
//                 data: v
//             }
//             const diagref = this.diag.open(UpdateParametreComponent, {
//                 width: '600px',
//                 height: '600px',
//                 data: d
//             })
//             diagref.afterClosed().subscribe(res => {
//                 switch (res) {
//                     case "0":
//                         this.toast.error("Paramètre n'a pas été modifié !","", {timeOut: 2500})
//                         break;
//                     case "1":
//                         this.toast.success("Paramètre a été modifé avec succès","", {timeOut: 2500});
//                         this.save.emit('Done');
//                         break;
//                     default:
//                         break;
//                 }
//             })
//         }
//     }
   
//     detail(v) {
//         if (this.location == 'parametre') {
//             let d = {
//                 action: 'Detail',
//                 data: v
//             }
//             this.diag.open(DetailParametreComponent, {
//                 width: '750px',
//                 height: 'auto',
//                 maxHeight: '630px',
//                 data: d
//             })
            
//         }
//     }
// }