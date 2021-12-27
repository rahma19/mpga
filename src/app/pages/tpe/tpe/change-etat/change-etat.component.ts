import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TpeService } from 'app/pages/services/tpe.service';

@Component({
  selector: 'app-change-etat',
  templateUrl: './change-etat.component.html',
  styleUrls: ['./change-etat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChangeEtatComponent implements OnInit {
  etat:any;
  id:any;
  isConnectionAvailableMU: boolean = navigator.onLine;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private servicetpe:TpeService, private dialogRef: MatDialogRef<ChangeEtatComponent>) {
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMU = false
      this.dialogRef.close()
  });
   }

  ngOnInit(): void {
    this.id=this.data.data.idTpe;
    this.etat=this.data.data.idEtatTpe;
  }
  changer(){
    this.servicetpe.changeEtat(this.id).subscribe(res=>{
      this.dialogRef.close('1');
     }, err => {
       this.dialogRef.close('0')
       console.log(err);
    })
  }
  Fermer(){
    this.dialogRef.close();
    }
}
