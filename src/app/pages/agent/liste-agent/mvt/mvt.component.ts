import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mvt } from 'app/model/mpga/mvt';
import { AgentService } from 'app/pages/services/agent.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-mvt',
  templateUrl: './mvt.component.html',
  styleUrls: ['./mvt.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MvtComponent implements OnInit {
  agentform:FormGroup;
  filteredOptions: Observable<string[]>;
myControl: FormControl = new FormControl();
agents:any;
val:string="";
idAgent:any;
nomAgent:any;
etatAgent:any;
mvts:any;
currentday= new Date();
date:any;
matricule:any;
valMvt:any;
type:any;
mutation:boolean=false;
affect:boolean=false;
changement:boolean=false;
magasins:any;
magasin:any;
categorie:any;
categories:any;
comment:any;
addmvt=new Mvt;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<MvtComponent>,private fb:FormBuilder,private mag:MagasinService,private toast: ToastrService,private agent:AgentService) { }

  ngOnInit(): void {
    this.currentday= new Date();
    console.log(this.data.data);
    this.idAgent=this.data.data.idAgent;
    this.matricule=this.data.data.matricule;
    this.nomAgent=this.data.data.nom;
    this.magasin=this.data.data.magasin;
    this.categorie=this.data.data.categorieAgent;
    this.etatAgent=this.data.data.idEtatAgent
    if(this.etatAgent==2){
      this.valMvt=2;
    }else if(this.etatAgent==1){
      this.valMvt=1;
    }
    else{
      this.valMvt='';
    }
    //  this.date=moment(this.currentday).format("YYYY/MM/DD");
      this.agentform=this.fb.group({
        matricule:new FormControl({value: '', disabled: true}),
        nom:new FormControl({value: '', disabled: true}),
        type:new FormControl('', Validators.compose([Validators.required])),
        Date:new FormControl('', Validators.compose([Validators.required])),
        comment:new FormControl('', Validators.compose([Validators.required])),
        magasin:new FormControl('', Validators.compose([Validators.required])),
        categorie:new FormControl('', Validators.compose([Validators.required])),
        nommag:new FormControl({value: '', disabled: true}),
        catmag:new FormControl({value: '', disabled: true}),
       });
       this.agent.filtreagent(this.val,this.val,this.val).subscribe(res=>{
         this.agents=res;
       })
       this.agent.listegategorieAgent().subscribe(res=>{
        this.categories=res;
      })
       this.mag.filtremagasin(this.val,this.val,this.val).subscribe(res=>{
        this.magasins=res;
      })
       this.agent.listTypeMvt().subscribe(res=>{
        this.mvts=res;
        console.log(this.mvts);
      })
  }
  onSubmit(form){
    if(this.changement==false){
      this.agentform.controls.categorie.disable();
    }
    if(this.mutation==false && this.affect==false){
      this.agentform.controls.magasin.disable();
      }
    if (form.invalid) {
      this.agentform.get('type').markAsTouched();
      this.agentform.get('Date').markAsTouched();
      this.agentform.get('comment').markAsTouched();
      if(this.mutation==true || this.affect==true){
      this.agentform.get('magasin').markAsTouched();
      }
       if(this.changement==true){
      this.agentform.get('categorie').markAsTouched();
      }
      
      return;
    }
    else if(form.valid){
     
      this.addmvt.idAgent=this.idAgent;
      this.addmvt.idTypeMouvement=form.value.type;
      this.addmvt.idMagasin=form.value.magasin;
      this.addmvt.idCategorieAgent=form.value.categorie;
      this.addmvt.dateEffet=form.value.Date;
      this.addmvt.commentaire=form.value.comment;
      for(var i in this.addmvt) { 
        if(this.addmvt[i] === undefined) {
          this.addmvt[i] = '';
        }
      }
      console.log(this.addmvt);
      this.agent.addMvt(this.addmvt).subscribe(res=>{
        this.dialogRef.close("1");
      },err=>{
        this.dialogRef.close("0");
        })   
    }
  }
Fermer(){
  this.dialogRef.close(0);
  }
  clear(){
    this.matricule='';
    this.nomAgent='';
    this.type='';
    this.valMvt='';
    this.magasin='';
    this.categorie='';
  }
  getvariable(type){
    if(type==2){
      this.mutation=true;
      this.agentform.controls.magasin.enable();
    }
    else{
      this.mutation=false;
    }
    if(type==3){
      this.changement=true;
      this.agentform.controls.categorie.enable();
    }
    else{
      this.changement=false;
    }
    if(type==1){
      this.affect=true;
      this.agentform.controls.magasin.enable();
    }
    else{
      this.affect=false;
    }
  }
  reset(){
    this.matricule='';
    this.nomAgent='';
    this.type='';
    this.currentday=new Date();
    this.comment='';
    this.magasin='';
    this.categorie='';
  }
}
