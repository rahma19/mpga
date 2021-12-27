import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgentService } from 'app/pages/services/agent.service';


import * as moment from 'moment';
import { AddMvtComponent } from './add-mvt/add-mvt.component';

@Component({
  selector: 'app-mvt-agent',
  templateUrl: './mvt-agent.component.html',
  styleUrls: ['./mvt-agent.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MvtAgentComponent implements OnInit {
  settings:any;
  page_bol:boolean=false;
  scroll_bol:boolean=true;
  loading = false;
  row_nbr:number=10;
  source:any;
  data:any;
  filter: any = false;
  couleur1:any
  couleur2:any
  couleur3:any
  constructor(private dialog:MatDialog,private agent:AgentService) { }

  ngOnInit(): void {
    this.agent.listMvtAgent().subscribe(res=>{
      this.data=res;
      console.log(this.data);
      // this.source = new LocalDataSource(this.data);
      for(var i=0; i<this.data.length; i++){
        if(this.data[i].idEtatMouvement ==1){
        this.couleur1= this.data[i].couleurEtatMouvement;
        console.log(this.couleur1);
        }
        else  if(this.data[i].idEtatMouvement ==2){
          this.couleur2=this.data[i].couleurEtatMouvement;
          console.log(this.couleur2);
        }
       
        else {
          this.couleur3=this.data[i].couleurEtatMouvement;
          console.log(this.couleur3
            
            );
        }
      }
    })
    // this.settings = {
     
    //   columns: {
    //     dateMouvement: {
    //       title: 'Date',
    //     type: 'custom',
    //     //width:'6%',
    //     renderComponent: CustomRenderMouvement,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       } 
    //       if (moment(data.row, moment.ISO_8601, true).isValid()) // true
    //         {
    //            data.row = moment(data.row).format("DD-MM-YYYY");
    //         }            
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
    //     matricule: {
    //       title: 'Matricule',
    //     type: 'custom',
    //   //  width:'15%',
    //     renderComponent: CustomRenderMouvement,
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
    //    // width:'15%',
    //     renderComponent: CustomRenderMouvement,
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
    //     typeMouvement: {
    //       title: 'Mouvement',
    //     type: 'custom',
    //    // width:'15%',
    //     renderComponent: CustomRenderMouvement,
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
    //     dateEffet: {
    //       title: 'Date effet',
    //     type: 'custom',
    //     renderComponent: CustomRenderMouvement,
    //     valuePrepareFunction: (row, cell) => {
    //       let data = {
    //         cell,
    //         row
    //       }   
    //       if (moment(data.row, moment.ISO_8601, true).isValid()) // true
    //         {
    //            data.row = moment(data.row).format("DD-MM-YYYY");
    //         }            
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
    //     etatMouvement: {
    //       title: 'Etat',
    //     type: 'custom',
    //     //width:'15%',
    //     renderComponent: CustomRenderMouvement,
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
    //     user: {
    //       title: 'User',
    //     type: 'custom',
    //   //  width:'5%',
    //     renderComponent: CustomRenderMouvement,
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
    //     if (row.data.idEtatMouvement ==1) {  
    //      document.documentElement.style.setProperty('--colormvt1', this.couleur1);
    //      return 'mvtsolved'
         
    //       } else if(row.data.idEtatMouvement ==2) {
    //        document.documentElement.style.setProperty('--color2mvt', this.couleur2);
    //        return'mvtaborted'
          
         
        
        
    //   } else {
    //     document.documentElement.style.setProperty('--color3mvt', this.couleur3);
    //     return'mvt2aborted'
       
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
Add(){
  const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="680px";
  dialogConfig.height="auto";

const diag=  this.dialog.open(AddMvtComponent,dialogConfig);

  diag.afterClosed().subscribe(item => {
   // console.log(item);
     if(item==1){
       this.ngOnInit();
    }
  })
}
Print(){}
}
