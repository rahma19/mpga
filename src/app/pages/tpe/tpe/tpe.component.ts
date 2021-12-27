import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { MagasinService } from 'app/pages/services/magasin.service';
import { TpeService } from 'app/pages/services/tpe.service';

import { MessageComponent } from 'app/pages/transaction-topup/message/message.component';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AddTpeComponent } from './add-tpe/add-tpe.component';

interface column{
  name:string,
  value:number
}

@Component({
  selector: 'app-tpe',
  templateUrl: './tpe.component.html',
  styleUrls: ['./tpe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TpeComponent implements OnInit {
  isConnectionAvailable: boolean = navigator.onLine;
  isserverAvailable:boolean= true;
  mySubscription:any;
  myControl= new FormControl();
  filteredOptions: Observable<string[]>;
  filterform: FormGroup;
  liste_serie:any;
  filter: any = false;
  settings: any;
  source: any;
  val='';
  Partenaires:any
  marques:any;
  marque:any='';
  model:any='';
  models:any;
  Affilies:any;
  PointVente:any;
  part:any='';
  aff:any='';
  pv:any='';
  situations:any;
  idsituation:any='';
  serie:any='';
  loading = false;
  row_nbr:number=10;
  page_bol:boolean=false;
scroll_bol:boolean=true;
data:any
level:any;
groupe:any;
groupeby:column[]=[
  {name:'Aucun', value:1},
  {name:'Magasin', value:2},
  {name:'Marque', value:3},
  {name:'Modéle', value:4},
  {name:'Etat', value:5},

]
liste=[];
listegroupage=[];
title:string ='Liste des TPE';
newarray=[];
nbr:number;
resultat:any
nbr_ligne:any
nbr_tpe:any
// sat=2
satval:any
message:any
couleur1:any
couleur2:any
couleur4:any
couleur3:any
myControlmagasin: FormControl = new FormControl();
filteredOptionsmagasin: Observable<string[]>;
magasins:any;
magasin:any
addtpe:boolean=true
idmag:any
  constructor(private mag:MagasinService,private fb: FormBuilder, private dialog:MatDialog,private servicetpe:TpeService,private router:Router) {
    window.addEventListener('offline', () => {
      this.isConnectionAvailable = false
      //alert('Problème de connexion');
  });
  window.addEventListener('online', () => {
    this.isConnectionAvailable = true
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
         this.router.navigated = true;
      }
    }); 
  
});
   }

   ngOnInit() {

    this.mag.filtremagasin(this.val,this.val,this.val).subscribe(res=>{
      this.magasins=res;
      //  console.log(this.magasins);
    })

   
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
      startWith(''),
       map(val => val.length >= 1 ? this.doFilter(val): [])
     
      );

      this.filteredOptionsmagasin = this.myControlmagasin.valueChanges
      .pipe(
      startWith(''),
      map(val => val.length >= 1 ? this.doFiltermagasin(val): [])
      
      );
    this.filterform = this.fb.group({
      num_serie:[''],
      marque_tpe:[''],
      model_tpe:[''],
      situation_tpe:[''],
      magasin_:['']
     
    })
    
    this.loading=true;
  
    this.servicetpe.listeTpefiltre(this.val,this.val,this.val,this.val,this.val).subscribe((res)=>{
      this.data=res
      console.log(this.data)
      this.resultat=res;
      this.nbr_ligne=0
      this.nbr_tpe=0
      // this.source = new LocalDataSource(this.data);
     
      console.log(this.data)

      console.log(this.source);
      this.loading=false;
      this.nbr_ligne=this.data.length
      this.nbr_tpe=this.data.length
      for(var i=0;i<this.data.length;i++){
        if(this.data[i].idEtatTpe==1){
this.couleur1=this.data[i].couleurEtat
console.log(this.couleur1)
        }
        else  if(this.data[i].idEtatTpe==2){
          this.couleur2=this.data[i].couleurEtat
          console.log(this.couleur2)
                  }
                  else  if(this.data[i].idEtatTpe==3){
                    this.couleur3=this.data[i].couleurEtat
                    console.log(this.couleur3)
                            }
        else{
          this.couleur4=this.data[i].couleurEtat
          console.log(this.couleur4)
        }
      }
      if(this.data.length===0){
    this.message="Pas de TPE en exploitation";
    const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="400px";
  dialogConfig.height="auto";
  dialogConfig.data=this.message;
  this.dialog.open(MessageComponent,dialogConfig);
 

  }
     
    })
  
    this.servicetpe.getTpe().subscribe(res=>{
      this.liste_serie=res;
      console.log('liste tpe ',this.liste_serie);
    })
    
    this.servicetpe.getMarque().subscribe(res=>{
      this.marques=res;
    })
    this.servicetpe.getModel().subscribe(res=>{
      this.models=res;
    })
    this.servicetpe. ListEtatTpe().subscribe(res=>{
      this.situations=res;
      console.log(this.situations)
    })

   
   
    //   this.settings = {
     
    //     columns: {
    //       numeroSerie: {
    //         title: 'Numéro série',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
    //       marqueTpe: {
    //         title: 'Marque',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
        
    //       modeleTpe: {
    //         title: 'Modèle',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
    //       codeMagasin: {
    //         title: 'Code Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           // data.row =data.row.Ope_RaisonSociale
               
  
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },
    //       nomMagasin: {
    //         title: 'Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },    
    //       // raisonSociale: {
    //       //   title: 'Raison sociale',
    //       //   type: 'custom',
    //       //   renderComponent: CustomRenderActionHT,
    //       //   valuePrepareFunction: (row, cell) => {
    //       //     let data = {
    //       //       cell,
    //       //       row
    //       //     }
    //       //     return data;
    //       //   },
    //       //   onComponentInitFunction: (instance, cell) => {
    //       //     instance.save.subscribe(row => {
    //       //       if (row == 'Done') {
    //       //         this.ngOnInit();
    //       //       }
    //       //     });
    //       //   }
          
            
    //       // }, 
         
    //       etatTpe: {
    //         title: 'Etat',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
              
             
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
        
    //   },
    //   rowClassFunction: (row) =>{
    //     if (row.data.idEtatTpe===1) {  
    //      document.documentElement.style.setProperty('--color', this.couleur1);
    //      return 'tpesolved'
         
    //       }
         
    //      else if (row.data.idEtatTpe===2) {
    //        document.documentElement.style.setProperty('--color2', this.couleur2);
    //        return'tpeaborted'
          
    //      }
    //      else if (row.data.idEtatTpe===3) {
    //       document.documentElement.style.setProperty('--color3', this.couleur3);
    //       return'etattpeaborted'
         
    //     }
    //     else {
    //       document.documentElement.style.setProperty('--color4', this.couleur4);
    //       return'etattpesolved'
         
    //     }
    //     }, 
    //   hideSubHeader: true,
    //     attr: {
    //       class: 'table',
    //     },
    //     noDataMessage: '',
    //     actions: {
    //       add: false,
    //       edit: false,
    //       delete: false,
  
    //     },
    
    //     pager: {  
    //       display: true,  
    //       perPage: 10,
    //     }, 
    // }



  }

  doFiltermagasin(value:string):string[]{
 
    return this.magasins.map((x:any) => x.libelle).filter(option =>
    option.toString().toLowerCase().includes(value.toLowerCase()));

   
   
  }

  getnom(libelle){
    console.log(this.magasin)
    if(this.magasin!=''){
    var extract = this.magasins.find(t=>t.libelle == libelle);
    console.log(extract);
    this.idmag=extract.idMagasin;
    console.log( this.idmag)
  // this.magasin= this.idmag
    }
    else{
      this.idmag=''
      console.log( this.idmag)
    }
  
  }
  doFilter(value:string):string[]{
    return this.liste_serie.map((x:any) => x.numeroSerie).filter(option =>
    option.toLowerCase().includes(value.toLowerCase()));
    }
  show() {
    
   this.filter ? this.filter = false : this.filter = true;
 
   
  }
  Rechercher(value) {
  console.log(this.idmag)  
 
    this.title='Liste des TPE';
     this.groupe=1;
  //    this.settings = {
     
  //     columns: {
  //       numeroSerie: {
  //         title: 'Numéro série',
  //         type: 'custom',
  //         renderComponent: CustomRenderActionHT,
  //         valuePrepareFunction: (row, cell) => {
  //           let data = {
  //             cell,
  //             row
  //           }
  //           return data;
  //          },
  //         onComponentInitFunction: (instance, cell) => {
  //           instance.save.subscribe(row => {
  //             if (row == 'Done') {
  //               this.ngOnInit();
  //             }
  //           });
  //         }
        
  //       }, 
  //       marqueTpe: {
  //         title: 'Marque',
  //         type: 'custom',
  //         renderComponent: CustomRenderActionHT,
  //         valuePrepareFunction: (row, cell) => {
  //           let data = {
  //             cell,
  //             row
  //           }
  //           return data;
  //         },
  //         onComponentInitFunction: (instance, cell) => {
  //           instance.save.subscribe(row => {
  //             if (row == 'Done') {
  //               this.ngOnInit();
  //             }
  //           });
  //         },
         
  //       }, 
      
  //       modeleTpe: {
  //         title: 'Modèle',
  //         type: 'custom',
  //         renderComponent: CustomRenderActionHT,
  //         valuePrepareFunction: (row, cell) => {
  //           let data = {
  //             cell,
  //             row
  //           }
  //           return data;
  //         },
  //         onComponentInitFunction: (instance, cell) => {
  //           instance.save.subscribe(row => {
  //             if (row == 'Done') {
  //               this.ngOnInit();
  //             }
  //           });
  //         },
         
  //       }, 
  //       codeMagasin: {
  //         title: 'Code Magasin',
  //         type: 'custom',
  //         renderComponent: CustomRenderActionHT,
  //         valuePrepareFunction: (row, cell) => {
  //           let data = {
  //             cell,
  //             row
  //           }
  //           // data.row =data.row.Ope_RaisonSociale
             

  //           return data ;
  //         },
  //         onComponentInitFunction: (instance, cell) => {
  //           instance.save.subscribe(row => {
  //             if (row == 'Done') {
  //               this.ngOnInit();
  //             }
  //           });

            
  //         },
  //       },
  //       nomMagasin: {
  //         title: 'Magasin',
  //         type: 'custom',
  //         renderComponent: CustomRenderActionHT,
  //         valuePrepareFunction: (row, cell) => {
  //           let data = {
  //             cell,
  //             row
  //           }
  //           return data ;
  //         },
  //         onComponentInitFunction: (instance, cell) => {
  //           instance.save.subscribe(row => {
  //             if (row == 'Done') {
  //               this.ngOnInit();
  //             }
  //           });

            
  //         },
  //       },    
        
       
  //       etatTpe: {
  //         title: 'Etat',
  //         type: 'custom',
  //         renderComponent: CustomRenderActionHT,
  //         valuePrepareFunction: (row, cell) => {
  //           let data = {
  //             cell,
  //             row
  //           }
            
           
  //           return data;
  //          },
  //         onComponentInitFunction: (instance, cell) => {
  //           instance.save.subscribe(row => {
  //             if (row == 'Done') {
  //               this.ngOnInit();
  //             }
  //           });
  //         }
        
  //       }, 
      
  //   },
  //   rowClassFunction: (row) =>{
  //     if (row.data.idEtatTpe===1) {  
  //      document.documentElement.style.setProperty('--color', this.couleur1);
  //      return 'tpesolved'
       
  //       }
       
  //      else if (row.data.idEtatTpe===2) {
  //        document.documentElement.style.setProperty('--color2', this.couleur2);
  //        return'tpeaborted'
        
  //      }
  //      else if (row.data.idEtatTpe===3) {
  //       document.documentElement.style.setProperty('--color3', this.couleur3);
  //       return'etattpeaborted'
       
  //     }
  //     else {
  //       document.documentElement.style.setProperty('--color4', this.couleur4);
  //       return'etattpesolved'
       
  //     }
  //     }, 
  //   hideSubHeader: true,
  //     attr: {
  //       class: 'table',
  //     },
  //     noDataMessage: '',
  //     actions: {
  //       add: false,
  //       edit: false,
  //       delete: false,

  //     },
  
  //     pager: {  
  //       display: true,  
  //       perPage: 10,
  //     }, 
  // }
    if (value.num_serie == null || value.num_serie == undefined || value.num_serie== -1){
       value.num_serie='';  
     
      var num=''
    }
    else{
      num=this.serie
    }
   
    if (value.marque_tpe == null || value.marque_tpe == undefined || value.marque_tpe== -1){
      value.marque_tpe='';  
     
      var martp=''
   }
   else{
     martp=this.marque
   }
    if (value.model_tpe == null || value.model_tpe == undefined || value.model_tpe== -1){
      value.model_tpe='';  
      
      var modtp=''
   }
   else{
     modtp=this.model
   }
   if (value.magasin_== null || value.magasin_ == undefined || value.magasin_== -1){
    value.magasin_='';  
  
    var mg=''
  }
  else{
    if(this.magasin!=''){
    mg=this.idmag
    
    }
    else{
      mg=this.magasin
    }
    console.log(mg)
  }
  
  if (value.situation_tpe == null || value.situation_tpe == undefined || value.situation_tpe== -1){
    value.situation_tpe='';  
   
    
      var situ=''
    
  }
  else{
     situ=this.idsituation
  
  }
  
   
    this.loading=true;
    this.nbr_ligne=0
    this.nbr_tpe=0
    this.servicetpe.listeTpefiltre(num,martp,modtp,situ,mg).subscribe((res:any)=>{
      this.data=res
      this.resultat=res;
      this.nbr_ligne=this.data.length
        this.nbr_tpe=this.data.length
  
      // this.source= new LocalDataSource(this.data)
    // this.source = new LocalDataSource(res);
    
    console.log(res);
    this.loading=false;
    for(var i=0;i<this.data.length;i++){
      if(this.data[i].idEtatTpe==1){
  this.couleur1=this.data[i].couleurEtat
  console.log(this.couleur1)
      }
      else  if(this.data[i].idEtatTpe==2){
        this.couleur2=this.data[i].couleurEtat
        console.log(this.couleur2)
                }
                else  if(this.data[i].idEtatTpe==3){
                  this.couleur3=this.data[i].couleurEtat
                  console.log(this.couleur3)
                          }
      else{
        this.couleur4=this.data[i].couleurEtat
        console.log(this.couleur4)
      }
    }
   
    })
   // this.ngProgress.done();
   
  }
  Add(){
    this.addtpe=false
    const dialogConfig= new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="600px";
    dialogConfig.height="300px";
    dialogConfig.hasBackdrop = false;
   // dialogConfig.maxHeight="80%";
    this.dialog.open(AddTpeComponent,dialogConfig).afterClosed().subscribe(item=>{
      this.addtpe=true
      if(item==1){
       
        this.ngOnInit();
      }
    
    })
   
  }
  
  scroll(){
    let newsettings= this.settings;
    newsettings.pager.display=false;
    this.settings = Object.assign({}, newsettings);
    // this.source = new LocalDataSource(this.data);
    this.scroll_bol=false;
    this.page_bol=true;
   }
   page(){
    let newsettings= this.settings;
    newsettings.pager.display=true;
    this.settings = Object.assign({}, newsettings);
    // this.source = new LocalDataSource(this.data);
    this.scroll_bol=true;
    this.page_bol=false;
   }
   getrow_nbr(){
    if(this.row_nbr!=null && this.row_nbr){
    // setTimeout(()=> {
     let newsettings= this.settings;
     newsettings.pager.perPage=this.row_nbr;
     this.settings = Object.assign({}, newsettings);
    //  this.source = new LocalDataSource(this.data);
  }
  }
  
  groupage(groupe){
    this.newarray=[];
    this.liste=[];
    this.listegroupage=[];
    // this.flag=false;
    // this.page_bol=false;
    // this.scroll_bol=true;
      if(groupe==2){
    this.nbr_ligne=0
      this.title='Groupage par Magasin';
    //   this.settings = {
    //     columns: {
    //       nombre: {
    //         title: 'Nombre',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
    //       marqueTpe: {
    //         title: 'Marque',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
        
    //       modeleTpe: {
    //         title: 'Modèle',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
    //       codeMagasin: {
    //         title: 'Code Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           // data.row =data.row.Ope_RaisonSociale
               
  
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },
    //       nomMagasin: {
    //         title: 'Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       }, 
    //       etatTpe: {
    //         title: 'Etat',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
              
            
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
        
    //   },
    //   hideSubHeader: true,
    //     attr: {
    //       class: 'table',
    //     },
    //     noDataMessage: '',
    //     actions: {
    //       add: false,
    //       edit: false,
    //       delete: false,
  
    //     },
    
    //     pager: {  
    //       display: true,  
    //       perPage: 10,
    //     }, 
    // }
      for(var i=0; i < this.resultat.length; i++){
        var magasin = this.resultat[i].nomMagasin;
        var obj3 ={magasin};
         this.liste.push(obj3);
       }
       this.listegroupage = this.liste.reduce((unique, o) => {
         if(!unique.some(obj3 => obj3.magasin === o.magasin)) {
           unique.push(o);
         }
         return unique;
     },[]);
     this.nbr_ligne=this.listegroupage.length
     for(var j=0; j < this.listegroupage.length; j++) {
     
      this.nbr=0;
      var mag :string=this.listegroupage[j].magasin;
      console.log(mag);
      for(var k=0; k < this.resultat.length; k++){
        console.log(mag);
        if(this.resultat[k].nomMagasin==mag){
     this.nbr=this.nbr+1;
         
        }
      }
     
     
    
      var nombre=this.nbr;
      console.log(nombre)
     var marqueTpe='N/A';
        var nomMagasin=mag;
      var modeleTpe='N/A';
      var codeMagasin='N/A';
     
       var  etatTpe='N/A';
    
      var object={marqueTpe,nombre,modeleTpe,codeMagasin,nomMagasin, etatTpe};
      this.newarray.push(object);
    
    } 
    this.data=this.newarray;
    // this.source= new LocalDataSource(this.data);
    
    }
   else if(groupe==3){
      this.nbr_ligne=0
      this.title='Groupage par Marque';
    //   this.settings = {
    //     columns: {
    //       nombre: {
    //         title: 'Nombre',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
    //       marqueTpe: {
    //         title: 'Marque',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
        
    //       modeleTpe: {
    //         title: 'Modèle',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
    //       codeMagasin: {
    //         title: 'Code Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           // data.row =data.row.Ope_RaisonSociale
               
  
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },
    //       nomMagasin: {
    //         title: 'Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },    
    //       // raisonSociale: {
    //       //   title: 'Raison sociale',
    //       //   type: 'custom',
    //       //   renderComponent: CustomRenderActionHT,
    //       //   valuePrepareFunction: (row, cell) => {
    //       //     let data = {
    //       //       cell,
    //       //       row
    //       //     }
    //       //     return data;
    //       //   },
    //       //   onComponentInitFunction: (instance, cell) => {
    //       //     instance.save.subscribe(row => {
    //       //       if (row == 'Done') {
    //       //         this.ngOnInit();
    //       //       }
    //       //     });
    //       //   }
          
            
    //       // }, 
         
    //       etatTpe: {
    //         title: 'Etat',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
              
             
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
        
    //   },
    //   hideSubHeader: true,
    //     attr: {
    //       class: 'table',
    //     },
    //     noDataMessage: '',
    //     actions: {
    //       add: false,
    //       edit: false,
    //       delete: false,
  
    //     },
    
    //     pager: {  
    //       display: true,  
    //       perPage: 10,
    //     }, 
    // }
      for(var i=0; i < this.resultat.length; i++){
        var marque = this.resultat[i].marqueTpe;
        var obj={marque};
         this.liste.push(obj);
       }
       this.listegroupage = this.liste.reduce((unique, o) => {
         if(!unique.some(obj => obj.marque === o.marque)) {
           unique.push(o);
         }
         return unique;
     },[]);
     this.nbr_ligne=this.listegroupage.length
     for(var j=0; j < this.listegroupage.length; j++) {
     
      this.nbr=0;
      var mrq :string=this.listegroupage[j].marque;
      console.log(mrq);
      for(var k=0; k < this.resultat.length; k++){
        console.log(mrq);
        if(this.resultat[k].marqueTpe== mrq){
     this.nbr=this.nbr+1;
         
        }
      }
     
     
    
      var nombre=this.nbr;
  
     var marqueTpe=mrq;
     
       var nomMagasin='N/A';
      var modeleTpe='N/A';
      var codeMagasin='N/A';
      // var raisonSociale='N/A';
       var  etatTpe='N/A';
     
      var object={marqueTpe,nombre,modeleTpe,codeMagasin, nomMagasin,etatTpe};
      this.newarray.push(object);
    
    } 
    this.data=this.newarray;
    // this.source= new LocalDataSource(this.data);
    
    }
  else if(groupe==4){
    this.nbr_ligne=0
      this.title='Groupage par Modèle';
    //   this.settings = {
    //     columns: {
    //       nombre: {
    //         title: 'Nombre',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
    //       marqueTpe: {
    //         title: 'Marque',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
        
    //       modeleTpe: {
    //         title: 'Modèle',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
    //       codeMagasin: {
    //         title: 'Code Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           // data.row =data.row.Ope_RaisonSociale
               
  
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },
    //       nomMagasin: {
    //         title: 'Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },    
         
         
    //       etatTpe: {
    //         title: 'Etat',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
              
             
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
        
    //   },
    //   hideSubHeader: true,
    //     attr: {
    //       class: 'table',
    //     },
    //     noDataMessage: '',
    //     actions: {
    //       add: false,
    //       edit: false,
    //       delete: false,
  
    //     },
    
    //     pager: {  
    //       display: true,  
    //       perPage: 10,
    //     }, 
    // }
      for(var i=0; i < this.resultat.length; i++){
        var mdl = this.resultat[i].modeleTpe;
        var obj1 ={mdl};
         this.liste.push(obj1);
       }
       this.listegroupage = this.liste.reduce((unique, o) => {
         if(!unique.some(obj1 => obj1.mdl === o.mdl)) {
           unique.push(o);
         }
         return unique;
     },[]);
     this.nbr_ligne=this.listegroupage.length
     for(var j=0; j < this.listegroupage.length; j++) {
     
      this.nbr=0;
      var model :string=this.listegroupage[j].mdl;
      console.log(model);
      for(var k=0; k < this.resultat.length; k++){
        console.log(model);
        if(this.resultat[k].modeleTpe== model){
     this.nbr=this.nbr+1;
         
        }
      }
     
     
    
      var nombre=this.nbr;
      console.log(nombre)
     var marqueTpe='N/A';
     
        var nomMagasin='N/A';
      var modeleTpe=model;
      var codeMagasin='N/A';
      // var raisonSociale='N/A';
       var  etatTpe='N/A';
       var  idEtatTpe='N/A';
      // var solde_apres_trans='N/A';
      var object={marqueTpe,nombre,modeleTpe,codeMagasin,nomMagasin, etatTpe};
      this.newarray.push(object);
      // this.nbr_ligne=this.newarray.length;
    } 
    this.data=this.newarray;
    // this.source= new LocalDataSource(this.data);
    
    }
   else if(groupe==5){
    this.nbr_ligne=0
      this.title='Groupage par Etat';
    //   this.settings = {
    //     columns: {
    //       nombre: {
    //         title: 'Nombre',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
    //       marqueTpe: {
    //         title: 'Marque',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
        
    //       modeleTpe: {
    //         title: 'Modèle',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
    //       codeMagasin: {
    //         title: 'Code Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           // data.row =data.row.Ope_RaisonSociale
               
  
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },
    //       nomMagasin: {
    //         title: 'Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },    
         
         
    //       etatTpe: {
    //         title: 'Etat',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
              
             
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
        
    //   },
    //   hideSubHeader: true,
    //     attr: {
    //       class: 'table',
    //     },
    //     noDataMessage: '',
    //     actions: {
    //       add: false,
    //       edit: false,
    //       delete: false,
  
    //     },
    
    //     pager: {  
    //       display: true,  
    //       perPage: 10,
    //     }, 
    // }
      for(var i=0; i < this.resultat.length; i++){
        var st = this.resultat[i].etatTpe;
        var obj2 ={st};
         this.liste.push(obj2);
       }
       this.listegroupage = this.liste.reduce((unique, o) => {
         if(!unique.some(obj2 => obj2.st === o.st)) {
           unique.push(o);
         }
         return unique;
     },[]);
     this.nbr_ligne=this.listegroupage.length
     for(var j=0; j < this.listegroupage.length; j++) {
     
      this.nbr=0;
      var situat :string=this.listegroupage[j].st;
      console.log(situat);
      for(var k=0; k < this.resultat.length; k++){
        console.log(situat);
        if(this.resultat[k].etatTpe==situat){
     this.nbr=this.nbr+1;
         
        }
      }
     
     
    
      var nombre=this.nbr;
      console.log(nombre)
     var marqueTpe='N/A';
     
        var nomMagasin='N/A';
      var modeleTpe='N/A';
      var codeMagasin='N/A';
      // var raisonSociale='N/A';
       var  etatTpe=situat;
    
      var object={marqueTpe,nombre,modeleTpe,codeMagasin,nomMagasin, etatTpe};
      this.newarray.push(object);
      // this.nbr_ligne=this.newarray.length;
    } 
    this.data=this.newarray;
    // this.source= new LocalDataSource(this.data);
    
    }
  
    else if(groupe==1){
      this.nbr_ligne=0
      this.title='Liste des TPE';
    //   this.settings = {
     
    //     columns: {
    //       numeroSerie: {
    //         title: 'Numéro série',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
    //       marqueTpe: {
    //         title: 'Marque',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
        
    //       modeleTpe: {
    //         title: 'Modèle',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         },
           
    //       }, 
    //       codeMagasin: {
    //         title: 'Code Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           // data.row =data.row.Ope_RaisonSociale
               
  
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },
    //       nomMagasin: {
    //         title: 'Magasin',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
    //           return data ;
    //         },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
  
              
    //         },
    //       },    
    //       // raisonSociale: {
    //       //   title: 'Raison sociale',
    //       //   type: 'custom',
    //       //   renderComponent: CustomRenderActionHT,
    //       //   valuePrepareFunction: (row, cell) => {
    //       //     let data = {
    //       //       cell,
    //       //       row
    //       //     }
    //       //     return data;
    //       //   },
    //       //   onComponentInitFunction: (instance, cell) => {
    //       //     instance.save.subscribe(row => {
    //       //       if (row == 'Done') {
    //       //         this.ngOnInit();
    //       //       }
    //       //     });
    //       //   }
          
            
    //       // }, 
         
    //       etatTpe: {
    //         title: 'Etat',
    //         type: 'custom',
    //         renderComponent: CustomRenderActionHT,
    //         valuePrepareFunction: (row, cell) => {
    //           let data = {
    //             cell,
    //             row
    //           }
              
             
    //           return data;
    //          },
    //         onComponentInitFunction: (instance, cell) => {
    //           instance.save.subscribe(row => {
    //             if (row == 'Done') {
    //               this.ngOnInit();
    //             }
    //           });
    //         }
          
    //       }, 
        
    //   },
    //   rowClassFunction: (row) =>{
    //     if (row.data.idEtatTpe===1) {  
    //      document.documentElement.style.setProperty('--color', this.couleur1);
    //      return 'tpesolved'
         
    //       }
         
    //      else if (row.data.idEtatTpe===2) {
    //        document.documentElement.style.setProperty('--color2', this.couleur2);
    //        return'tpeaborted'
          
    //      }
    //      else if (row.data.idEtatTpe===3) {
    //       document.documentElement.style.setProperty('--color3', this.couleur3);
    //       return'etattpeaborted'
         
    //     }
    //     else {
    //       document.documentElement.style.setProperty('--color4', this.couleur4);
    //       return'etattpesolved'
         
    //     }
    //     }, 
    //   hideSubHeader: true,
    //     attr: {
    //       class: 'table',
    //     },
    //     noDataMessage: '',
    //     actions: {
    //       add: false,
    //       edit: false,
    //       delete: false,
  
    //     },
    
    //     pager: {  
    //       display: true,  
    //       perPage: 10,
    //     }, 
    // }
    
   
      this.data=this.resultat;
      this.nbr_ligne=this.data.length
      // this.source= new LocalDataSource(this.data);
      // this.nbr_ligne=this.filtremouv.length;
    }
   
   }
}
