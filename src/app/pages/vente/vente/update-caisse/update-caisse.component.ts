import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Caisse } from 'app/model/mpga/caisse';
import { MagasinService } from 'app/pages/services/magasin.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-caisse',
  templateUrl: './update-caisse.component.html',
  styleUrls: ['./update-caisse.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateCaisseComponent implements OnInit {
  caisseform: FormGroup;
  updatecaisse=new Caisse;
  nom:any;
  code:any;
  codes:any;
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  err:boolean=false;
  disable:boolean=false;
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  msg:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<UpdateCaisseComponent>,
  private mag:MagasinService,private fb:FormBuilder, private formUtils: FormUtils,private translate:TranslateService,private toast :ToastrService ) { }

  ngOnInit(): void {
   console.log(this.data);
    this.nom=this.data.libelleCaisse;
    this.code=this.data.idImpressionQrCode;
    this.mag.listeimpression().subscribe((res:any)=>{
      this.codes=res;
    //  console.log(this.codes);
    })
    this.caisseform=this.fb.group({
      libelle: new FormControl('',Validators.required),
      qrcode:new FormControl(''),
    });
  }
  onSubmit(form){
    if (form.invalid) {
      // this.caisseform.get('libelle').markAsTouched();
      this.onError()
      this.markInvalidControls(form);
    }
   if(form.valid){
    this.disable=true;
     this.updatecaisse.idCaisse=this.data.idCaisse;
     this.updatecaisse.idImpressionQrCode=this.code;
     this.updatecaisse.libelleCaisse=this.nom;
     console.log(this.updatecaisse);
     this.mag.updateCaisse(this.updatecaisse).subscribe(res=>{
      this.dialogRef.close('1');
      this.toast.success(this.translate.instant('toast.modifier') );
    },err=>{
      this.disable=false;
              this.err=true;
        if(err.status==400){
          this.msg=this.translate.instant('toast.echec');
       console.log(err);
        }
    })
   }
  }
  Fermer(){
    this.dialogRef.close();
    }
    reset(){
      this.nom=this.data.libelleCaisse;
      this.code=this.data.idImpressionQrCode;
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
  onFocus(types: TYPE_MESSAGE[], required: boolean, num?) {
    this.Messages = this.formUtils._getFormControlMessage(types, required, num)
  }
  onBlur() {
    this.Messages = [];
  }
  onError() {
    this.Messages = [this.formUtils._error()];
  }
  markInvalidControls(form): void {
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        controls[name].markAllAsTouched();
      }
    }
  }
}
