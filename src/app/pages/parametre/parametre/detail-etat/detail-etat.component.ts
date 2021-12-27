import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-etat',
  templateUrl: './detail-etat.component.html',
  styleUrls: ['./detail-etat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailEtatComponent implements OnInit {
id:any;
list:any;
name:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<DetailEtatComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
    this.id=this.data.id;
    this.list=this.data.value;
    this.name=this.data.name;
    console.log(this.id);
  }
  Fermer(){
    this.dialogRef.close();
   }
}
