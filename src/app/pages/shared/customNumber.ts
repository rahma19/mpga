// import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';

// import { ToastrService } from 'ngx-toastr';
// import { Router } from '@angular/router';
// import { reduce } from 'rxjs/operators';



// @Component({
//     template: `
    
//   <div  [ngClass]="classToApply"   style="height:auto;width:auto">{{renderValue}}</div>
  
//   `,
//   styles: ['.error { text-align:right;}']
// })
// export class CustomNumberdetail implements  OnInit {
//     renderValue: string;
//     location: string;
//     etatclientValue:any
    
//     @Input() value: any | number;
//     @Input() rowData: any;
//     classToApply = 'error';
//     constructor(private diag: MatDialog, private toast: ToastrService, private snap: Router) {

//     }
//     @Output() save: EventEmitter<any> = new EventEmitter();
//     // .toUpperCase()
    
//     ngOnInit() {
//         this.value.row ? this.renderValue = this.value.row.toString()  : this.renderValue=null ; 
 
//        // let l: any = this.snap.url.split('/');
//     //    this.location = l[3];
//       //   console.log('location '+this.location)
//     }
// }