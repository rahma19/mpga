import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agent } from 'app/model/mpga/agent';
import { AgentService } from 'app/pages/services/agent.service';

import * as moment from 'moment';

@Component({
  selector: 'app-detail-agent',
  templateUrl: './detail-agent.component.html',
  styleUrls: ['./detail-agent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailAgentComponent implements OnInit {
  magasin:any;
  categorie:any;
  nom:any
  prenom:any;
  matricule:any;
  email:any;
  mobile:any;
  id:any;
  etat:any;
  zone:any;
  source:any;
  settings:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<DetailAgentComponent>,private agent:AgentService) { }

  ngOnInit(): void {
    this.id=this.data.data;
    this.agent.getAgentById(this.id).subscribe((res:Agent)=>{
      this.matricule=res.matricule;
      this.nom=res.nom;
      this.prenom=res.prenom;
      this.mobile=res.mobile;
      this.email=res.email;
      this.categorie=res.categorieAgent;
      this.magasin=res.magasin;
      this.etat=res.etatAgent;
      this.zone=res.zone;
      this.source=res.listHistoriqueMouvementAgent;
    })
    // this.settings = {
     
    //   columns: {
    //     dateEffet: {
    //       title: 'Date Effet',
    //     type: 'custom',
    //     renderComponent: CustomRenderActionHT,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }    
    //      // if (moment(data.row, moment.ISO_8601, true).isValid()) // true
          
    //          data.row = moment(data.row).format("DD-MM-YYYY");
                   
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    
    //     },
    //     typeMouvement: {
    //       title: 'Type Mvt',
    //     type: 'custom',
    //     renderComponent: CustomRenderActionHT,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }            
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    
    //     },
       
    //     magasin: {
    //       title: 'Magasin',
    //     type: 'custom',
    //     renderComponent: CustomRenderActionHT,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }              
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    //     },
    //     categorieAgent: {
    //       title: 'Catégorie',
    //     type: 'custom',
    //     renderComponent: CustomRenderActionHT,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }               
    //       return data;
    //     },
    //     onComponentInitFunction: (instance, cell) => {
    //       instance.save.subscribe(row => {
    //         if (row == 'Done') {
    //           this.ngOnInit();
    //         }
    //       });
    //     }
    //     },
    //   },
    //   hideSubHeader: true,
    //   attr: {
    //     class: 'table',
    //   },
    //   noDataMessage: '',
    //   actions: {
    //     add: false,
    //     edit: false,
    //     delete: false,
    //   },
    
    //   pager: {  
    //     display: true,  
    //     perPage: 5,
    //   }, 
    // }
  }
  Fermer(){
    this.dialogRef.close(0);
      }
}
