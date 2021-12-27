import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailTpe } from 'app/model/detail_tpe';
import { TpeService } from 'app/pages/services/tpe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-tpe',
  templateUrl: './update-tpe.component.html',
  styleUrls: ['./update-tpe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateTpeComponent implements OnInit {
  tpeform: FormGroup;
  models:any;
  proprietaires:any;
  resultat:any;
  serie:any;
  model:any;
  prop:any;
  reset:any;
  marque:any;
  value:any;
  marques:any
  modeles:any
  versapp:any
  isConnectionAvailableMU: boolean = navigator.onLine;
  updatetpe = new DetailTpe;
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<UpdateTpeComponent>,private servicetpe:TpeService,private dialog:MatDialog,private fb:FormBuilder,private toast: ToastrService) {
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMU = false
      this.dialogRef.close()
  });
   }

  ngOnInit(): void {
    this.tpeform = this.fb.group({
      numeroSerie:new FormControl({ value: '', disabled: true }),
      idModeleTpe: new FormControl('',Validators.required),
      idProprietaireTpe:new FormControl('',Validators.required),
      marque_tpe:new FormControl({ value: '', disabled: true }),
      versionApplication: new FormControl('', Validators.compose([Validators.required,Validators.pattern("([0-9]{2}.?){2}"),Validators.maxLength(5),Validators.minLength(5)]))
    });
    this.servicetpe.getMarque().subscribe(res=>{
      this.marques=res;
      console.log(this.marques)
    })
    this.servicetpe.getProprietaire().subscribe(res=>{
      this.proprietaires=res;
    })
   
    console.log(this.data.data)
    this.servicetpe.detailTpe(this.data.data).subscribe((res:DetailTpe)=>{
      this.serie=res.numeroSerie;
      this.model=res.idModeleTpe;
     
      this.prop= res.idProprietaireTpe;
      this.marque=res.idMarqueTpe
       this.versapp=res.versionApplication
      console.log(res)
      console.log(this.marque)
    this.servicetpe.ListModelByIdMarque(this.marque).subscribe(res=>{
      this.modeles=res;
      console.log(this.modeles)
    })
    })
    
  }

  Reset(){
    this.servicetpe.detailTpe(this.data.data).subscribe((res:DetailTpe)=>{
      this.serie=res.numeroSerie;
      this.model=res.idModeleTpe;
      this.prop= res.idProprietaireTpe;
      this.versapp=res.versionApplication
    })
  }

  Fermer(){
    this.dialogRef.close();
  }
  onSubmit(form:NgForm){
    if(this.tpeform.invalid){
      this.tpeform.get('model_tpe').markAllAsTouched()
      this.tpeform.get('prop_tpe').markAllAsTouched()
    }
    if(this.tpeform.valid){
      this.updatetpe.idTpe=this.data.data;
      this.updatetpe.idModeleTpe=form.value.idModeleTpe;
      this.updatetpe.idProprietaireTpe=form.value.idProprietaireTpe;
      this.updatetpe.versionApplication=form.value.versionApplication
      this.servicetpe.updateTpe(this.updatetpe).subscribe(res=>{
   
      this.resultat=res;
       this.dialogRef.close('1');
        
      }, err => {
        this.dialogRef.close('0');
        console.log(err);
    })
    }
  }

  GetErrorversion(){
    return this.tpeform.get('versionApplication').hasError('required') ? 'champ Obligatoire ':
    this.tpeform.get('versionApplication').hasError('pattern') ? 'que des chiffres exp 01.01':'';
  
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
  this.dialogRef.updateSize("600px", "250px");
  this.isOpened=true;
  }

}
