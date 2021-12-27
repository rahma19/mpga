import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClotureService } from 'app/pages/services/cloture.service';

@Component({
  selector: 'app-valider-recon',
  templateUrl: './valider-recon.component.html',
  styleUrls: ['./valider-recon.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ValiderReconComponent implements OnInit {
id:any;
loading:boolean=false;
isOpened= true ;
isOpened2=false ;
openPop=true
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialog:MatDialog, private closerv:ClotureService,private dialogRef: MatDialogRef<ValiderReconComponent>) { }

  ngOnInit(): void {
    this.id=this.data.data;
  }
  valider(){
    this.closerv.validercloture(this.id).subscribe(res=>{
      this.dialogRef.close('1');
     }, err => {
        this.dialogRef.close('0');
    })
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
   this.dialogRef.updateSize("400px", "auto");
   this.isOpened2=false ;
   }
   
   Maxi()
   { this.openPop=false
   this.isOpened2=true;
   console.log(this.isOpened2)
   this.dialogRef.updatePosition({
   
   })
   this.dialogRef.updateSize("400px", "auto");
   this.isOpened=true;
   }
}
