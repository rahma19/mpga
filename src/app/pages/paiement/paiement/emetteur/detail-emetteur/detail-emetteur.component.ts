import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-emetteur',
  templateUrl: './detail-emetteur.component.html',
  styleUrls: ['./detail-emetteur.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailEmetteurComponent implements OnInit {
bin:any
qr:any
isOpened= true ;
  isOpened2=false ;
  openPop=true
  nom:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef:MatDialogRef<DetailEmetteurComponent>) { }

  ngOnInit(): void {
    this.bin=this.data.nomCommercial
this.qr=this.data.qr
this.bin=this.data.bin
  }

  Fermer(){
    this.dialogRef.close()
  }
  Mini()
  {
  
  this.openPop=false
  this.isOpened=false ;
  this.dialogRef.updatePosition({
  top:'850px',
  right: '20px',
  })
  this.dialogRef.updateSize("800px", "auto");
  this.isOpened2=false ;
  }
  
  Maxi()
  { this.openPop=false
  this.isOpened2=true;
  console.log(this.isOpened2)
  this.dialogRef.updatePosition({
  
  })
  this.dialogRef.updateSize("800px", "550px");
  this.isOpened=true;
  }


}
