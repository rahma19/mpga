// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';

// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { reduce } from 'rxjs/operators';



// @Component({
//     template: `
    
//   <div  style="height:auto;width:auto"><div style="margin-left:30%;">{{renderValue}}</div></div>
//   `,
// })
// export class CustomRenderdetail implements OnInit {
//     renderValue: string;
//     location: string;
//     etatclientValue:any
    
//     @Input() value: any | number;
//     @Input() rowData: any;

//     constructor(private diag: MatDialog, private toast: ToastrService, private snap: Router) {

//     }
//     @Output() save: EventEmitter<any> = new EventEmitter();
//     // .toUpperCase()
    
//     ngOnInit() {
//         this.value.row ? this.renderValue = this.value.row.toString()  : this.renderValue=null ; 
 
//        // let l: any = this.snap.url.split('/');
//     //    this.location = l[3];
//         // console.log('location '+this.location)
//     }
// //     update(v) {
// //         if (this.location == 'produit') {.
// //             let d = {
// //                 action: 'Modifier',
// //                 data: v
// //             }
// //             const diagref = this.diag.open(ProduitDiagComponent, {
// //                 width: '750px',
// //                 height: 'auto',
// //                 data: d
// //             })
// //             diagref.afterClosed().subscribe(res => {
// //                 switch (res) {
// //                     case "2":
// //                         this.toast.error("Le produit n'a pas été modifié !")
// //                         break;
// //                     case "3":
// //                         this.toast.success("produit modifié avec succés !")
// //                         this.save.emit('Done');
// //                         break;
// //                     default:
// //                         break;
// //                 }
// //             })
// //         }
// //     }
// //     delete(v) {
// //         if (this.location == 'produit') {
// //             let d = {
// //                 action: 'Supprimer',
// //                 data: v
// //             }
// //             console.log(d);
// //             const diagref = this.diag.open(ProduitDiagComponent, {
// //                 width: '750px',
// //                 height: 'auto',
// //                 data: d,
// //                 disableClose: true,
// //             })
// //             diagref.afterClosed().subscribe(res => {
// //                 switch (res) {
// //                     case "0":
// //                         this.toast.error("Erreur lors de suppression !")
// //                         break;
// //                     case "1":
// //                         this.toast.success("produit supprimer avec succés !")
// //                         this.save.emit('Done');
// //                         break;
// //                     default:
// //                         break;
// //                 }
// //             })
// //         } else   if (this.location == 'familleproduit') {
// //         let d = {
// //             action: 'Supprimer',
// //             data: v
// //         }
// //         const diagref = this.diag.open(FamilleproduitDiagComponent, {
// //             width: '750px',
// //             height: 'auto',
// //             data: d
// //         })
// //         diagref.afterClosed().subscribe(res => {
// //             switch (res) {
// //                 case "4":
// //                     this.toast.error("Famille de produit n'a pas été supprimé !")
// //                     break;
// //                 case "5":
// //                     this.toast.success("Famille de produit supprimé avec succés !")
// //                     this.save.emit('Done');
// //                     break;
// //                 default:
// //                     break;
// //             }
// //         })
   
// // }
    
    
// //     }

   
// }