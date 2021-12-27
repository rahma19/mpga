import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mvt } from 'app/model/mpga/mvt';
import { AgentService } from 'app/pages/services/agent.service';
import { MagasinService } from 'app/pages/services/magasin.service';

@Component({
  selector: 'app-update-mvt',
  templateUrl: './update-mvt.component.html',
  styleUrls: ['./update-mvt.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateMvtComponent implements OnInit {
  agentform:FormGroup;
  matricule:any;
  nomAgent:any;
  type:any;
  idtype:any
  magasin:any;
  magasins:any;
  categorie:any;
  categories:any
  val:string='';
  comment:any;
  currentday:any;
  id:any;
  mutation:boolean=false;
  affect:boolean=false;
  changement:boolean=false;
  updatemvt=new Mvt;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb:FormBuilder,private mag:MagasinService,private agent:AgentService,private dialogRef: MatDialogRef<UpdateMvtComponent>) { }

  ngOnInit(): void {
   this.id=this.data.data;
   this.agent.getMvtById(this.id).subscribe((res:Mvt)=>{
     this.matricule=res.matricule;
     this.nomAgent=res.nom;
     this.type=res.typeMouvement;
     this.currentday=res.dateEffet;
     this.comment=res.commentaire;
     this.idtype=res.idTypeMouvement;
     if(this.idtype==2){
      this.mutation=true;
      this.agentform.controls.magasin.enable();
    }
    else{
      this.mutation=false;
    }
    if(this.idtype==3){
      this.changement=true;
      this.agentform.controls.categorie.enable();
    }
    else{
      this.changement=false;
    }
    if(this.idtype==1){
      this.affect=true;
      this.agentform.controls.magasin.enable();
    }
    else{
      this.affect=false;
    }
     this.magasin=res.idMagasin
     this.categorie=res.idCategorieAgent
   })
   this.agent.listegategorieAgent().subscribe(res=>{
    this.categories=res;
  })
   this.mag.filtremagasin(this.val,this.val,this.val).subscribe(res=>{
    this.magasins=res;
  })
    this.agentform=this.fb.group({
      matricule:new FormControl({value: '', disabled: true}),
      nom:new FormControl({value: '', disabled: true}),
      type:new FormControl({value: '', disabled: true}),
      Date:new FormControl('', Validators.compose([Validators.required])),
      comment:new FormControl('', Validators.compose([Validators.required])),
      magasin:new FormControl('', Validators.compose([Validators.required])),
      categorie:new FormControl('', Validators.compose([Validators.required])),
      nommag:new FormControl({value: '', disabled: true}),
      catmag:new FormControl({value: '', disabled: true}),
     });
  }
  onSubmit(form){
    if(this.changement==false){
      this.agentform.controls.categorie.disable();
    }
    if(this.mutation==false && this.affect==false){
      this.agentform.controls.magasin.disable();
      }
    if (form.invalid) {
      this.agentform.get('Date').markAsTouched();
      this.agentform.get('comment').markAsTouched();
      
      return;
    }
    else if(form.valid){
     
      this.updatemvt.idMouvementAgent=this.id;
      this.updatemvt.idMagasin=form.value.magasin;
      this.updatemvt.idCategorieAgent=form.value.categorie;
      this.updatemvt.dateEffet=form.value.Date;
      this.updatemvt.commentaire=form.value.comment;
      for(var i in this.updatemvt) { 
        if(this.updatemvt[i] === undefined) {
          this.updatemvt[i] = '';
        }
      }
      console.log(this.updatemvt);
      this.agent.updateMvt(this.updatemvt).subscribe(res=>{
        this.dialogRef.close("1");
      },err=>{
        this.dialogRef.close("0");
        })   
    }
  }
  Fermer(){
    this.dialogRef.close();
   }
   reset(){ 
     this.agent.getMvtById(this.id).subscribe((res:Mvt)=>{
    this.matricule=res.matricule;
    this.nomAgent=res.nom;
    this.type=res.typeMouvement;
    this.currentday=res.dateEffet;
    this.comment=res.commentaire;
    this.idtype=res.idTypeMouvement;
    if(this.idtype==2){
     this.mutation=true;
     this.agentform.controls.magasin.enable();
   }
   else{
     this.mutation=false;
   }
   if(this.idtype==3){
     this.changement=true;
     this.agentform.controls.categorie.enable();
   }
   else{
     this.changement=false;
   }
   if(this.idtype==1){
     this.affect=true;
     this.agentform.controls.magasin.enable();
   }
   else{
     this.affect=false;
   }
    this.magasin=res.idMagasin
    this.categorie=res.idCategorieAgent
  })
}
}
