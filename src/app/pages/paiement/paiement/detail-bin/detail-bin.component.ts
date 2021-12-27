import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bin } from 'app/model/mpga/bin';
import { PaiementService } from 'app/pages/services/paiement.service';

@Component({
  selector: 'app-detail-bin',
  templateUrl: './detail-bin.component.html',
  styleUrls: ['./detail-bin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailBinComponent implements OnInit {
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  id:any
  detail=new Bin()
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private paiement:PaiementService, private dialogRef: MatDialogRef<DetailBinComponent>) { }

  ngOnInit(): void {
    this.id=this.data.idBin
    this.paiement.GetBin(this.id).subscribe((res:Bin)=>{
      this.detail.idBin=res.idBin;
      this.detail.debutPlageBin=res.debutPlageBin
      this.detail.finPlageBin=res.finPlageBin
      this.detail.idEmetteur=res.idEmetteur
      this.detail.nomPlageBin=res.nomPlageBin
      this.detail.idAcquereur=res.idAcquereur
      this.detail.acquereur=res.acquereur
      this.detail.emetteur=res.emetteur
console.log(this.detail)
      
    })
  }
  Fermer(){
    this.dialogRef.close();
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
      this.dialogRef.updateSize("500px", "auto");
      this.isOpened=true;
     
    }
}
