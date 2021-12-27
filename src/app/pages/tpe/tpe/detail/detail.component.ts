import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailTpe } from 'app/model/detail_tpe';
import { TpeService } from 'app/pages/services/tpe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {
  serie:any;
  model:any;
  prop:any;
  situation:any;
  marque:any;
  application:any;
  isConnectionAvailableMU: boolean = navigator.onLine;
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  idetat:any
  etat:any
  magasin:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private servicetpe:TpeService, private dialogRef: MatDialogRef<DetailComponent>) { }

  ngOnInit(): void {
    this.servicetpe.detailTpe(this.data.data).subscribe((res:DetailTpe)=>{
      this.serie=res.numeroSerie;
      this.model=res.modeleTpe;
      this.situation=res.situationTpe;
      this.marque=res.marqueTpe;
      this.application=res.versionApplication;
      this.prop=res.proprietaireTpe;
      this.idetat=res.idEtatTpe
      this.etat=res.etatTpe
      this.magasin=res.nomMagasin
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
  this.dialogRef.updateSize("600px", "auto");
  this.isOpened2=false ;
  }
  
  Maxi()
  { this.openPop=false
  this.isOpened2=true;
  console.log(this.isOpened2)
  this.dialogRef.updatePosition({
  
  })
  this.dialogRef.updateSize("600px", "220px");
  this.isOpened=true;
  }


}
