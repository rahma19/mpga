import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Agent } from 'app/model/mpga/agent';
import { AgentService } from 'app/pages/services/agent.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddAgentComponent implements OnInit {
  agentform:FormGroup;
  val:string='';
  categories:any;
  magasins:any;
  addagent=new Agent;
  constructor(private dialogRef: MatDialogRef<AddAgentComponent>,private fb:FormBuilder,private mag:MagasinService,private toast: ToastrService,private agent:AgentService) { }

  ngOnInit(): void {
    this.agentform=this.fb.group({
      matricule:new FormControl('', Validators.compose([Validators.required,Validators.maxLength(20)])),
      nom:new FormControl('', Validators.compose([Validators.required])),
      prenom:new FormControl('', Validators.compose([Validators.required,Validators.maxLength(50)])),
      mobile:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(8),Validators.minLength(8)])),
      email_:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      categorie:new FormControl('', Validators.compose([Validators.required])),
      magasin:new FormControl(''),
     });
     this.agent.listegategorieAgent().subscribe(res=>{
      this.categories=res;
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
        this.agentform.get('matricule').markAsTouched();
        this.agentform.get('nom').markAsTouched();
        this.agentform.get('email_').markAsTouched();
        this.agentform.get('prenom').markAsTouched();
        this.agentform.get('categorie').markAsTouched();
        
        return;
      }
      else if(form1.valid){
        for(var i in form1.value) { 
          if(form1.value[i] === undefined) {
            form1.value[i] = '';
          }
        }
        this.addagent.matricule=form1.value.matricule;
        this.addagent.nom=form1.value.nom;
        this.addagent.prenom=form1.value.prenom;
        this.addagent.mobile=form1.value.mobile;
        this.addagent.email=form1.value.email_;
        this.addagent.idCategorieAgent=form1.value.categorie;
        this.addagent.idMagasin=form1.value.magasin;
        console.log(this.addagent);
        this.agent.addAgent(this.addagent).subscribe(res=>{
          this.dialogRef.close(1);
       
          this.toast.success("Agent a étè ajouté avec succes !","", {timeOut: 2500});
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
    reset(form1){
      form1.reset();
    }
}
