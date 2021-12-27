import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgentService } from 'app/pages/services/agent.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { TransactionService } from 'app/pages/services/transaction.service';


import { Observable } from 'rxjs';

import { AddAgentComponent } from './add-agent/add-agent.component';
interface column{
  name:string,
  value:number
}
@Component({
  selector: 'app-liste-agent',
  templateUrl: './liste-agent.component.html',
  styleUrls: ['./liste-agent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListeAgentComponent implements OnInit {
  filter: any = false;
  checked:boolean=false;
  filterform: FormGroup;
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  settings:any;
  level:any;
  gouvernorats:any;
  villes:any;
  partenaires:any;
  gouver:any;
  villegouver:any;
  etat:any;
  service:any;
  zones:any;
  etats:any;
  val='';
  nb_agent:any;
  nbr_ligne:any;
  data:any=[];
  source:any;
  groupeby:column[]=[
    {name:'Aucun', value:1},
    {name:'Catégorie', value:2},
    {name:'Magasin', value:3},
    {name:'Zone', value:4},
  ]
  page_bol:boolean=false;
  scroll_bol:boolean=true;
  loading = false;
  row_nbr:number=10;
  title:string='Liste des Agents';
  newarray=[];
  liste=[];
  listegroupage=[];
  resultat:any;
  magasins:any;
  categories:any
  couleur1:any;
  couleur2:any;
  couleur3:any;
  couleur4:any;
  constructor(private fb:FormBuilder,private dialog:MatDialog,private Transaction:TransactionService,private mag:MagasinService,private agent:AgentService) { }

  ngOnInit(): void {
    this.filterform = this.fb.group({

      magasin_:[''],
      categorie_:[''],
      zone_:[''],
    });
    this.loading=true;
    this.Transaction.getZone().subscribe(res=>{
      this.zones=res;
    })
    this.agent.listegategorieAgent().subscribe(res=>{
      this.categories=res;
    })
    this.nbr_ligne=0;
    this.agent.filtreagent(this.val,this.val,this.val).subscribe(res=>{
      
      this.data=res;
      this.resultat=res;
      this.loading=false;
      console.log(this.data);
      this.nbr_ligne=this.resultat.length
      // this.source = new LocalDataSource(this.data);
      for(var i=0; i<this.data.length; i++){
        if(this.data[i].idEtatAgent ==1){
        this.couleur1= this.data[i].couleurEtatAgent;
        console.log(this.couleur1);
        }
        else  if(this.data[i].idEtatAgent ==2){
          this.couleur2=this.data[i].couleurEtatAgent;
          console.log(this.couleur2);
        }
        else  if(this.data[i].idEtatAgent ==3){
          this.couleur3=this.data[i].couleurEtatAgent;
          console.log(this.couleur3);
        }
        else {
          this.couleur4=this.data[i].couleurEtatAgent;
          console.log(this.couleur4
            
            );
        }
      }
    },err=>{
      this.loading=false;
      }) 
    this.mag.filtremagasin(this.val,this.val,this.val).subscribe(res=>{
      this.magasins=res;
      
    })

    // this.settings = {
     
    //   columns: {
    //     matricule: {
    //       title: 'Matricule',
    //     type: 'custom',
    //     renderComponent: CustomRenderAgent,
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
    //     nom: {
    //       title: 'Nom',
    //     type: 'custom',
    //     renderComponent: CustomRenderAgent,
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
    //    // width:'15%',
    //     renderComponent: CustomRenderAgent,
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
    //   //  width:'15%',
    //     renderComponent: CustomRenderAgent,
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
    //     zone: {
    //       title: 'Zone',
    //     type: 'custom',
    //     renderComponent: CustomRenderAgent,
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
    //     mobile: {
    //       title: 'Mobile',
    //     type: 'custom',
    //    // width:'15%',
    //     renderComponent: CustomRenderAgent,
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
    //     etatAgent: {
    //       title: 'Etat',
    //     type: 'custom',
    //     //width:'5%',
    //     renderComponent: CustomRenderAgent,
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
    //   rowClassFunction: (row) =>{
    //     if (row.data.idEtatAgent ==1) {  
    //      document.documentElement.style.setProperty('--coloragent1', this.couleur1);
    //      return 'agentsolved'
         
    //       } else if(row.data.idEtatAgent ==2) {
    //        document.documentElement.style.setProperty('--color2agent', this.couleur2);
    //        return'agentaborted'
          
         
    //     } else if(row.data.idEtatAgent==3) {
    //       document.documentElement.style.setProperty('--color3agent', this.couleur3);
    //       return'agent3aborted'
         

        
    //   } else {
    //     document.documentElement.style.setProperty('--color4agent', this.couleur4);
    //     return'agent4aborted'
       
    //   }
    //     }, 
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
    //     perPage: 10,
    //   }, 
    // }
  }
  scroll(){
    // this.loading=true;
     let newsettings= this.settings;
     newsettings.pager.display=false;
     this.settings = Object.assign({}, newsettings);
    //  this.source = new LocalDataSource(this.data);
     this.scroll_bol=false;
     this.page_bol=true;
    // this.loading=false;
    }
    page(){
     let newsettings= this.settings;
     newsettings.pager.display=true;
     this.settings = Object.assign({}, newsettings);
    //  this.source = new LocalDataSource(this.data);
     this.scroll_bol=true;
     this.page_bol=false;
    }
    getrow_nbr(){
     if(this.row_nbr!=null && this.row_nbr){
      let newsettings= this.settings;
      newsettings.pager.perPage=this.row_nbr;
      this.settings = Object.assign({}, newsettings);
      // this.source = new LocalDataSource(this.data);
  }
   }
   change(){
     let newsettings= this.settings;
     if(newsettings.pager.display==true){
     
       newsettings.pager.display=false;
       this.settings = Object.assign({}, newsettings);
      //  this.source = new LocalDataSource(this.data);
       
     }
     else if(newsettings.pager.display==false){
       
       newsettings.pager.display=true;
       this.settings = Object.assign({}, newsettings);
      // this.source = new LocalDataSource(this.data);
       
     }
    }
    show() {
      this.filter ? this.filter = false : this.filter = true;
     
    }
    groupage(groupe){
      this.page_bol=false;
      this.scroll_bol=true;
      // this.settings = {
       
      //   columns: {
      //     nbr: {
      //       title: 'Nombre agent',
      //     type: 'custom',
      //     renderComponent: CustomRenderActionGroupe,
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
         
      //     zone: {
      //       title: 'Zone',
      //     type: 'custom',
      //     renderComponent: CustomRenderActionGroupe,
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
      //     renderComponent: CustomRenderActionGroupe,
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
      //     renderComponent: CustomRenderActionGroupe,
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
      //     perPage: 10,
      //   }, 
      // }
      this.newarray=[];
      this.liste=[];
      this.listegroupage=[];
      if(groupe==2){
       // this.checked=true;
        this.title='Groupage par catégorie';
        for(var i=0; i < this.resultat.length; i++){
          var raison = this.resultat[i].categorieAgent;
          var obj={raison};
           this.liste.push(obj);
         }
         this.listegroupage = this.liste.reduce((unique, o) => {
           if(!unique.some(obj => obj.raison === o.raison)) {
             unique.push(o);
           }
           return unique;
       },[]);
       for(var j=0; j < this.listegroupage.length; j++) {
        var categorieAgent:string=this.listegroupage[j].raison;
        var nbr=0;
        for(var k=0; k < this.resultat.length; k++){
          if(this.resultat[k].categorieAgent== categorieAgent){
            nbr=nbr+1;
          }
        }
        
        var magasin='N/A';
        var zone='N/A';
        var object={magasin,zone,categorieAgent,nbr};
        this.newarray.push(object);
        this.nbr_ligne=this.newarray.length;
      } 
      this.data=this.newarray;
      // this.source= new LocalDataSource(this.data);
      
      }
      else if(groupe==3){
       // this.checked=true;
        this.title='Groupage par magasin';
        for(var i=0; i < this.resultat.length; i++){
          var raison = this.resultat[i].magasin;
          var obj2={raison};
           this.liste.push(obj2);
         }
         this.listegroupage = this.liste.reduce((unique, o) => {
           if(!unique.some(obj => obj.raison === o.raison)) {
             unique.push(o);
           }
           return unique;
       },[]);
       for(var j=0; j < this.listegroupage.length; j++) {
        var magasin:string=this.listegroupage[j].raison;
        var nbr=0;
        for(var k=0; k < this.resultat.length; k++){
          if(this.resultat[k].magasin== magasin){
            nbr=nbr+1;
          }
        }
        var categorieAgent='N/A';
        var zone='N/A';
       // var nombreCaisse='N/A';
        var object1={magasin,zone,categorieAgent,nbr};
        this.newarray.push(object1);
        this.nbr_ligne=this.newarray.length;
      }
      this.data=this.newarray;
      // this.source= new LocalDataSource(this.data);
      }
      else if(groupe==4){
       // this.checked=true;
        this.title='Groupage par zone';
        for(var i=0; i < this.resultat.length; i++){
          var raison = this.resultat[i].zone;
          var obj2={raison};
           this.liste.push(obj2);
         }
         this.listegroupage = this.liste.reduce((unique, o) => {
           if(!unique.some(obj => obj.raison === o.raison)) {
             unique.push(o);
           }
           return unique;
       },[]);
       for(var j=0; j < this.listegroupage.length; j++) {
        // this.montantpargroupe=0; 
        var zone:string=this.listegroupage[j].raison;
        var nbr=0;
        for(var k=0; k < this.resultat.length; k++){
          if(this.resultat[k].zone== zone){
            nbr=nbr+1;
          }
        }
        var magasin='N/A';
        var categorieAgent='N/A';
       // var nombreCaisse='N/A';
        var object2={magasin,zone,categorieAgent,nbr};
        this.newarray.push(object2);
        this.nbr_ligne=this.newarray.length;
      } 
       this.data=this.newarray;
      // this.source= new LocalDataSource(this.data);
      }
      else if(groupe==1){
     //   this.checked=false;
        this.title='Liste des Agents';
        // this.settings = {
     
        //   columns: {
        //     matricule: {
        //       title: 'Matricule',
        //     type: 'custom',
        //     renderComponent: CustomRenderAgent,
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
        //     nom: {
        //       title: 'Nom',
        //     type: 'custom',
        //     renderComponent: CustomRenderAgent,
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
        //    // width:'15%',
        //     renderComponent: CustomRenderAgent,
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
        //   //  width:'15%',
        //     renderComponent: CustomRenderAgent,
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
        //     zone: {
        //       title: 'Zone',
        //     type: 'custom',
        //     renderComponent: CustomRenderAgent,
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
        //     mobile: {
        //       title: 'Mobile',
        //     type: 'custom',
        //    // width:'15%',
        //     renderComponent: CustomRenderAgent,
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
        //     etatAgent: {
        //       title: 'Etat',
        //     type: 'custom',
        //     //width:'5%',
        //     renderComponent: CustomRenderAgent,
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
        //     perPage: 10,
        //   }, 
        // }
        this.data=this.resultat;
        // this.source= new LocalDataSource(this.data);
        this.nbr_ligne=this.data.length;
      }
     }
     Add(){
      const dialogConfig= new MatDialogConfig;
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="730px";
      dialogConfig.height="auto";
  
    const diag=  this.dialog.open(AddAgentComponent,dialogConfig);
    
      diag.afterClosed().subscribe(item => {
       // console.log(item);
         if(item==1){
           this.ngOnInit();
        }
      })
    }
    Rechercher(value) {
      this.page_bol=false;
      this.scroll_bol=true;
      this.title='Liste des Agents';
      this.checked=false;
      // this.settings = {
     
      //   columns: {
      //     matricule: {
      //       title: 'Matricule',
      //     type: 'custom',
      //     renderComponent: CustomRenderAgent,
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
      //     nom: {
      //       title: 'Nom',
      //     type: 'custom',
      //     renderComponent: CustomRenderAgent,
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
      //    // width:'15%',
      //     renderComponent: CustomRenderAgent,
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
      //   //  width:'15%',
      //     renderComponent: CustomRenderAgent,
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
      //     zone: {
      //       title: 'Zone',
      //     type: 'custom',
      //     renderComponent: CustomRenderAgent,
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
      //     mobile: {
      //       title: 'Mobile',
      //     type: 'custom',
      //    // width:'15%',
      //     renderComponent: CustomRenderAgent,
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
      //     etatAgent: {
      //       title: 'Etat',
      //     type: 'custom',
      //     //width:'5%',
      //     renderComponent: CustomRenderAgent,
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
      //   rowClassFunction: (row) =>{
      //     if (row.data.idEtatAgent ==1) {  
      //      document.documentElement.style.setProperty('--coloragent1', this.couleur1);
      //      return 'agentsolved'
           
      //       } else if(row.data.idEtatAgent ==2) {
      //        document.documentElement.style.setProperty('--color2agent', this.couleur2);
      //        return'agentaborted'
            
           
      //     } else if(row.data.idEtatAgent ==3) {
      //       document.documentElement.style.setProperty('--color3agent', this.couleur3);
      //       return'agent3aborted'
           
  
          
      //   } else {
      //     document.documentElement.style.setProperty('--color4agent', this.couleur4);
      //     return'agent4aborted'
         
      //   }
      //     }, 
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
      //     perPage: 10,
      //   }, 
      // }
       if (value.magasin_ == null || value.magasin_ == undefined || value.magasin_== -1){
          value.magasin_='';  
       }
       if (value.categorie_ == null || value.categorie_ == undefined || value.categorie_== -1){
         value.categorie_='';  
      };
       if (value.zone_ == null || value.zone_ == undefined || value.zone_== -1){
         value.zone_='';  
      };
       this.loading = true;
       console.log(value.magasin_,value.categorie_,value.zone_)
       this.agent.filtreagent(value.magasin_,value.categorie_,value.zone_).subscribe(res=>{
        this.data=res;
        this.resultat=res;
        this.nbr_ligne=this.resultat.length
        this.loading=false;
        // this.source = new LocalDataSource(this.data);
      },err=>{
        this.loading=false;
       // console.log(err);
        }) 
}
}
