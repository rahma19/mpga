import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { PaiementService } from 'app/pages/services/paiement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-supprimer-bin',
  templateUrl: './supprimer-bin.component.html',
  styleUrls: ['./supprimer-bin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SupprimerBinComponent implements OnInit {
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  id:any
  err: boolean = false;
  disable: boolean = false;
  msg:string
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef:MatDialogRef<SupprimerBinComponent>,
  private toast:ToastrService,private paiement:PaiementService,  private translate: TranslateService) { }

  ngOnInit(): void {
    this.id=this.data.idBin
  }
  Fermer(){
    this.dialogRef.close()
  }
  Supprimer(){
    this.disable=true
    this.paiement.DeleteBin(this.id).subscribe(resultat=>{
      this.dialogRef.close("1");
      this.toast.success(this.translate.instant("toast.suppression"));
      this.ngOnInit();

    },error=>{
      this.disable=false;
      this.err=true;
     if(error.status==400){
      this.msg=this.translate.instant('toast.echec');
      console.log(error)
     } 
                  
    })

  } 
  
  Mini()
  {
  
  this.openPop=false
  this.isOpened=false ;
  this.dialogRef.updatePosition({
  top:'850px',
  right: '20px',
  })
  this.dialogRef.updateSize("500px", "auto");
  this.isOpened2=false ;
  }
  
  Maxi()
  { this.openPop=false
  this.isOpened2=true;
  console.log(this.isOpened2)
  this.dialogRef.updatePosition({
  
  })
  this.dialogRef.updateSize("500px", "auto");
  this.isOpened=true;
  }
}
