import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MagasinService } from 'app/pages/services/magasin.service';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateAgentComponent implements OnInit {
categorieAgent:any;
email:any;
telephone:any;
matricule:any;
nom:any;
prenom:any;
agents:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private mag:MagasinService,private fb:FormBuilder,private dialogRef: MatDialogRef<UpdateAgentComponent>) { }

  ngOnInit() {
    this.agents=this.data;
    this.categorieAgent=this.agents.categorieAgent;
    this.email=this.agents.email;
    this.telephone=this.agents.mobile;
    this.matricule=this.agents.matricule;
    this.nom=this.agents.nom;
    this.prenom=this.agents.prenom;
  }
Fermer(){
this.dialogRef.close();
}
}
