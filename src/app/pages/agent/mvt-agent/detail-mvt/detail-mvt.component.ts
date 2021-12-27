import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mvt } from 'app/model/mpga/mvt';
import { AgentService } from 'app/pages/services/agent.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-mvt',
  templateUrl: './detail-mvt.component.html',
  styleUrls: ['./detail-mvt.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailMvtComponent implements OnInit {
  matricule:any;
  nomAgent:any;
  type:any;
  idtype:any
  magasin:any;
  categorie:any;
  comment:any;
  dateeffet:any;
  dateMvt:any;
  id:any;
  user:any;
  etat:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb:FormBuilder,private agent:AgentService,private dialogRef: MatDialogRef<DetailMvtComponent>) { }

  ngOnInit(): void {
    this.id=this.data.data;
    this.agent.getMvtById(this.id).subscribe((res:Mvt)=>{
      this.matricule=res.matricule;
      this.nomAgent=res.nom;
      this.type=res.typeMouvement;
      this.dateeffet=res.dateEffet;
      if (moment(this.dateeffet, moment.ISO_8601, true).isValid()) // true
            {
              this.dateeffet = moment(this.dateeffet).format("DD-MM-YYYY");
            } 
      this.dateMvt=res.dateMouvement;
      if (moment(this.dateMvt, moment.ISO_8601, true).isValid()) // true
            {
              this.dateMvt = moment(this.dateMvt).format("DD-MM-YYYY");
            } 
      this.comment=res.commentaire;
      this.idtype=res.idTypeMouvement;
      this.magasin=res.libelleMagasin
      this.categorie=res.categorieAgent
      this.etat=res.etatMouvement;
      this.user=res.user;
    })
  }
  Fermer(){
    this.dialogRef.close();
   }
}
