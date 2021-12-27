import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agent } from 'app/model/mpga/agent';
import { AgentService } from 'app/pages/services/agent.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateAgentComponent implements OnInit {
  agentform:FormGroup;
  val:string='';
  categories:any;
  magasins:any;
  magasin:any;
  categorie:any;
  nom:any
  prenom:any;
  matricule:any;
  email:any;
  mobile:any;
  id:any;
  addagent=new Agent;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<UpdateAgentComponent>,private fb:FormBuilder,private mag:MagasinService,private agent:AgentService,private toast: ToastrService) { }

  ngOnInit(): void {
    this.id=this.data.data;
    this.agentform=this.fb.group({
      matricule:new FormControl({value: '', disabled: true}),
      nom:new FormControl('', Validators.compose([Validators.required])),
      prenom:new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50)])),
      mobile:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(8),Validators.minLength(8)])),
      email_:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      categorie:new FormControl({value: '', disabled: true}),
      magasin:new FormControl({value: '', disabled: true}),
     });
     this.agent.listegategorieAgent().subscribe(res=>{
      this.categories=res;
    })
    this.agent.getAgentById(this.id).subscribe((res:Agent)=>{
      this.matricule=res.matricule;
      this.nom=res.nom;
      this.prenom=res.prenom;
      this.mobile=res.mobile;
      this.email=res.email;
      this.categorie=res.idCategorieAgent;
      this.magasin=res.idMagasin;
    })
    this.mag.filtremagasin(this.val,this.val,this.val).subscribe(res=>{
      this.magasins=res;

    })
  }
  getErrorMessage() {
    return this.agentform.get('email_').hasError('required')?'*Champ obligatoire':
    this.agentform.get('email_').hasError('email')?'Email invalid':"";
   }
    getErrorTel() {
     return this.agentform.get('mobile').hasError('required')?'*Champ obligatoire':
     this.agentform.get('mobile').hasError('pattern')?'Num téléphone invalid':
     this.agentform.get('mobile').hasError('minlength')?'Num téléphone de 8 chiffres':"";
    }
    onSubmit(form1){
      if (form1.invalid) {
        this.agentform.get('mobile').markAsTouched();
        this.agentform.get('nom').markAsTouched();
        this.agentform.get('email_').markAsTouched();
        this.agentform.get('prenom').markAsTouched();
        
        return;
      }
      else if(form1.valid){
        for(var i in form1.value) { 
          if(form1.value[i] === undefined) {
            form1.value[i] = '';
          }
        }
        this.addagent.idAgent=this.id;
        this.addagent.nom=form1.value.nom;
        this.addagent.prenom=form1.value.prenom;
        this.addagent.mobile=form1.value.mobile;
        this.addagent.email=form1.value.email_;
        console.log(this.addagent);
        this.agent.updateAgent(this.addagent).subscribe(res=>{
          this.dialogRef.close("1");
        },err=>{
          this.dialogRef.close("0");
          })   
      }
    } 
    Fermer(){
    this.dialogRef.close(0);
    }
    reset(){
      this.agent.getAgentById(this.id).subscribe((res:Agent)=>{
        this.matricule=res.matricule;
        this.nom=res.nom;
        this.prenom=res.prenom;
        this.mobile=res.mobile;
        this.email=res.email;
        this.categorie=res.idCategorieAgent;
        this.magasin=res.idMagasin;
      }) 
    }
}
