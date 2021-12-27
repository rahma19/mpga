import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MagasinService } from 'app/pages/services/magasin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actif-service',
  templateUrl: './actif-service.component.html',
  styleUrls: ['./actif-service.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActifServiceComponent implements OnInit {
  idEtatwallet:any;
  idmagasinwallet:any;
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  err:boolean=false;
  disable:boolean=false;
  msg:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private mag:MagasinService,
  private dialog:MatDialog,private dialogRef: MatDialogRef<ActifServiceComponent>,private toast:ToastrService,
  private translate:TranslateService) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.idEtatwallet=this.data.idEtatWallet;
    this.idmagasinwallet=this.data.idMagasinWallet
  }
//idMagasinWallet
Fermer(){
  this.dialogRef.close();
 }
 changer(){
  this.disable=true
  var obj={idMagasinWallet:this.idmagasinwallet};
  this.mag.changeEtatWallet(obj).subscribe(res=>{
    this.dialogRef.close('1');
    this.toast.success(this.translate.instant("toast.statut"));
   }, err => {
    this.disable=false;
    this.err=true;
   if(err.status==400){
    this.msg=this.translate.instant('toast.echec');
    console.log(err)
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
