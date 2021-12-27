import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-file',
  templateUrl: './details-file.component.html',
  styleUrls: ['./details-file.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsFileComponent implements OnInit {
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef:MatDialogRef<DetailsFileComponent >) { }

  ngOnInit(): void {
    console.log(this.data)
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
  this.dialogRef.updateSize("690px", "auto");
  this.isOpened2=false ;
  }
  
  Maxi()
  { this.openPop=false
  this.isOpened2=true;
  console.log(this.isOpened2)
  this.dialogRef.updatePosition({
  
  })
  this.dialogRef.updateSize("690px", "500px");
  this.isOpened=true;
  }
}

