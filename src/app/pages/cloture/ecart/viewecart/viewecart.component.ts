import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailEcart } from 'app/model/mpga/detailecart';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { ClotureService } from 'app/pages/services/cloture.service';

import * as moment from 'moment';

@Component({
  selector: 'app-viewecart',
  templateUrl: './viewecart.component.html',
  styleUrls: ['./viewecart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewecartComponent implements OnInit {
  settings:any;
  id:any;
  date:any;
  etat:any;
  type:any;
  code:any;
  ref:any;
  autorisation:any;
  mag:any;
  vcn:any;
  montant:any;
  source:any;
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialog:MatDialog, private closerv:ClotureService,private format:FormatNumberPipe,private dialogRef: MatDialogRef<ViewecartComponent>) { }

  ngOnInit(): void {
    this.id=this.data.data;
    this.closerv.getEcartDetail(this.id).subscribe((res:DetailEcart)=>{
      this.date=res.date;
      this.date=moment(this.date).format("DD-MM-YYYY");
      this.etat=res.etatAnomalie;
      this.type=res.typeAnomalie;
      this.code=res.codeAnomalie;
      this.ref=res.refmpga;
      this.autorisation=res.autorisation;
      this.mag=res.codeMagasin;
      this.vcn=res.vcn;
      this.montant=res.montant;
      this.montant=this.format.transform(this.montant);
      this.source=res.listHistoriqueAnomalie;
    })
    // this.settings = {
     
    //   columns: {
    //     dateHistorique: {
    //       title: 'Date/Heure',
    //     type: 'custom',
    //     renderComponent: CustomRenderActionHT,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }    
    //      // if (moment(data.row, moment.ISO_8601, true).isValid()) // true
          
    //          data.row = moment(data.row).format("DD-MM-YYYY HH:mm");
                   
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    
    //     },
    //     typeAnomalie: {
    //       title: 'Type',
    //     type: 'custom',
    //     renderComponent: CustomRenderActionHT,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }            
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    
    //     },
       
    //     etatAnomalie: {
    //       title: 'Etat',
    //     type: 'custom',
    //     renderComponent: CustomRenderActionHT,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }            
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    //     },
       
    //     user: {
    //       title: 'User',
    //     type: 'custom',
    //     renderComponent: CustomRenderActionHT,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }  
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    
    //     },
    //   },
    //   hideSubHeader: true,
    //   attr: {
    //     class: 'table',
    //   },
    //   noDataMessage: '',
    //   actions: {
    //     add: false,
    //     edit: false,
    //     delete: false,
    //   },
    
    //   pager: {  
    //     display: true,  
    //     perPage: 5,
    //   }, 
    // }
  }
  Fermer(){
    this.dialogRef.close();
   }

   Mini()
   {
   
   this.openPop=false
   this.isOpened=false ;
   this.dialogRef.updatePosition({
   top:'850px',
   right: '20px',
   })
   this.dialogRef.updateSize("600px", "auto");
   this.isOpened2=false ;
   }
   
   Maxi()
   { this.openPop=false
   this.isOpened2=true;
   console.log(this.isOpened2)
   this.dialogRef.updatePosition({
   
   })
   this.dialogRef.updateSize("auto", "auto");
   this.isOpened=true;
   }
}
