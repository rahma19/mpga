import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ChangeEtat } from 'app/model/mpga/changeetat';
import { MagasinService } from 'app/pages/services/magasin.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-changer-etat',
  templateUrl: './changer-etat.component.html',
  styleUrls: ['./changer-etat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangerEtatComponent implements OnInit {
  idEtatMagasin:any;
  idMagasin:any;
  change= new ChangeEtat;
  loading:boolean=false;
  msg:any;
  ermsg:boolean=false;
  isConnectionAvailableMC: boolean = navigator.onLine; 
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  err: boolean = false;
  disable: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private mag:MagasinService,private dialog:MatDialog,
  private dialogRef: MatDialogRef<ChangerEtatComponent>,  private translate: TranslateService,
  private toast: ToastrService) {

    window.addEventListener('offline', () => {
      this.isConnectionAvailableMC = false
      this.dialogRef.close()
  });
   }

  ngOnInit() {
    this.idEtatMagasin=this.data.idEtatMagasin;
    this.idMagasin=this.data.idMagasin;
   // console.log(this.data.data);
  }
  Fermer(){
    this.dialogRef.close();
   }
   changer(){
    if(this.idEtatMagasin==1){
      this.change.idEtatMagasin=2;
    }
    else  if(this.idEtatMagasin==2){
      this.change.idEtatMagasin=1;
    }
   this.disable=true
    this.change.idMagasin=this.idMagasin;
  //  console.log(this.change);
    this.mag.changeretatmagasin(this.change).subscribe(res=>{
      this.dialogRef.close('1');
      // this.ngOnInit();
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
    this.dialogRef.updateSize("600px", "auto");
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
