import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AgentService } from 'app/pages/services/agent.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import { Mvt } from 'app/model/mpga/mvt';

@Component({
  selector: 'app-add-mvt',
  templateUrl: './add-mvt.component.html',
  styleUrls: ['./add-mvt.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddMvtComponent implements OnInit {
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
  constructor(private dialogRef: MatDialogRef<AddMvtComponent>,private fb:FormBuilder,private mag:MagasinService,private toast: ToastrService,private agent:AgentService) { }

  ngOnInit(): void {
    this.currentday= new Date();
  //  this.date=moment(this.currentday).format("YYYY/MM/DD");
    this.agentform=this.fb.group({
      matricule:new FormControl('', Validators.compose([Validators.required])),
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
     this.filteredOptions = this.myControl.valueChanges
     .pipe(
     startWith(''),
     map(val => val.length >= 1 ? this.doFilter2(val): [])
     );
  }
  doFilter2(value:string):string[]{
    return this.agents.map((x:any) => x.matricule).filter(option =>
    option.toLowerCase().includes(value.toLowerCase()));
    }
  getnom(matricule){
    this.type='';
    var extract = this.agents.find(t=>t.matricule == matricule);
    console.log(extract);
    this.idAgent=extract.idAgent;
    this.nomAgent=extract.nom;
    this.etatAgent=extract.idEtatAgent;
    this.magasin=extract.magasin;
    this.categorie=extract.categorieAgent;
    console.log(this.etatAgent);
    
    if(this.etatAgent==2){
      this.valMvt=2;
    }else if(this.etatAgent==1){
      this.valMvt=1;
    }
    else{
      this.valMvt='';
    }
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
      this.agentform.get('matricule').markAsTouched();
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
        this.dialogRef.close(1);
     
        this.toast.success("Mouvement Agent a étè ajouté avec succes !","", {timeOut: 2500});
      },err=>{
        this.dialogRef.close(0);
        this.toast.error("L'ajout a échoué !","", {timeOut: 2500});
       // console.log(err);
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
     // this.agentform.controls.magasin.disable();

    }
    if(type==3){
      this.changement=true;
      this.agentform.controls.categorie.enable();
    }
    else{
      this.changement=false;
     // this.agentform.controls.categorie.disable();
    }
    if(type==1){
      this.affect=true;
      this.agentform.controls.magasin.enable();
    }
    else{
      this.affect=false;
     // this.agentform.controls.magasin.disable();

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
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
    startWith(''),
    map(val => val.length >= 1 ? this.doFilter2(val): [])
    );
  }
}
