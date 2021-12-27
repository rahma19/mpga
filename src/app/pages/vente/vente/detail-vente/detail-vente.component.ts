import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormGroup } from '@angular/forms';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { MagasinService } from 'app/pages/services/magasin.service';
import { DetailMagasin } from 'app/model/mpga/detailmagasin';
import { TransactionService } from 'app/pages/services/transaction.service';

@Component({
  selector: 'app-detail-vente',
  templateUrl: './detail-vente.component.html',
  styleUrls: ['./detail-vente.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailVenteComponent implements OnInit {
gouvernorat:any;
ville:any;
id:any;
code:any;
etatMagsin:any;
libelle:any;
nombreCaisse:any;
responsablemagasin:any;
zoneGeographique:any;
resultat:any;
agents:any;
rue:any;
tel:any;
fax:any;
email:any;
codepostal:number;
ref:number;
services:any;
isOpened= true ;
  isOpened2=false ;
  openPop=true
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private mag:MagasinService,private Transaction:TransactionService,private dialog:MatDialog, private format:FormatNumberPipe, private dialogRef: MatDialogRef<DetailVenteComponent>) { }
  ngOnInit() {
    this.id=this.data.idMagasin;
    //this.ngProgress.start();
    this.mag.getmagasinbyId(this.id).subscribe((res:DetailMagasin)=>{
     // console.log(res);
      this.codepostal=res.codePostal;
      this.ref=res.numeroRefMpga;
      this.code=res.code;
      this.etatMagsin=res.etatMagsin;
      this.libelle=res.libelle;
      this.gouvernorat=res.gouvernorat;
      this.ville=res.ville;
      this.nombreCaisse=res.nombreCaisse;
      this.zoneGeographique=res.zoneGeographique;
      this.rue=res.rue;
      this.fax=res.fax;
      this.tel=res.telephone;
      this.email=res.email;
    })
    this.mag.listecaissebymagasin(this.id).subscribe((res:any)=>{
      this.resultat=res;
     // console.log('liste caisse  ',this.resultat);
    })
    this.mag.listeagentBymagasin(this.id).subscribe(res=>{
      this.agents=res;
     // console.log('liste agent  ',this.agents);
    })
    this.Transaction.walletbymagasin(this.id).subscribe(res=>{
      this.services=res;
     // console.log('liste services  ',this.services);
    })
    //this.ngProgress.complete();
  }
 
  Fermer(){
    this.dialogRef.close();
   }
   Print(){
     window.print()
   }

   Mini(){ 
    this.isOpened=false ;
      this.dialogRef.updatePosition({
        bottom:'15px',
        right: '15px', 
      })
      this.dialogRef.updateSize("350px", "auto");
      this.isOpened2=false ;
    }
    
Maxi(){ 
      this.isOpened2=true;
      console.log(this.isOpened2)
      this.dialogRef.updatePosition({
        
      })
      this.dialogRef.updateSize("750px", "auto");
      this.isOpened=true;
    }
}
