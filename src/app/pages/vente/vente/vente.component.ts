import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, ViewChildren, OnDestroy } from '@angular/core';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddVenteComponent } from './add-vente/add-vente.component';
import { startWith, map, mapTo } from 'rxjs/operators';

import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { MagasinService } from 'app/pages/services/magasin.service';
import { TransactionService } from 'app/pages/services/transaction.service';
import { MessageComponent } from 'app/pages/transaction-topup/message/message.component';

import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService } from 'app/pages/services/pagination.service';
import { DetailVenteComponent } from './detail-vente/detail-vente.component';
import { UpdateVenteComponent } from './update-vente/update-vente.component';
import { ChangerEtatComponent } from './changer-etat/changer-etat.component';
import { AffiliationComponent } from './affiliation/affiliation.component';

// import { TestDirective } from 'app/pages/shared/test.directive';



interface column{
  name:string,
  value:number
}
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VenteComponent implements OnInit {
  filter: any = false;
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
  etat:any='';
  service:any='';
  zones:any;
  etats:any;
  val='';
  nbr_magasin:any;
  nbr_ligne:any;
  nbr_caisse:any;
  // data:any=[];
  source:any;
  groupeby:column[]=[
    {name:'Aucun', value:1},
    {name:'Gouvernorat', value:2},
    {name:'Ville', value:3},
    {name:'Zone', value:4},
  ]
  isConnectionAvailableM: boolean = navigator.onLine; 
  isserverAvailable:boolean= true;
  mySubscription:any;
  newarray=[];
  liste=[];
  listegroupage=[];
  wallets:any;
  active:boolean;
  currentDate = new Date();
  id=3
  parametres:any
  adresse:any
  ville:any
  code:any
  tel:any
  rne:any
  emplacement:any
  vil:any;
  zone:any;
  et:any;
  gou:any
  ser:any;
  flag:boolean=false;
  message:any;
  groupe:any;
  checked:boolean=false;
  title:string='Liste des Magasins';
  resultat:any;
  page_bol:boolean=false;
  scroll_bol:boolean=true;
  loading = false;
  row_nbr:number=18;
  date:any;
  // @ViewChild("Section") printSectionRef: ElementRef;
  tab:any
  couleur1:any;
  couleur2:any;
  codemag:any;
  addmag:boolean=true
  dataSource = new MatTableDataSource<any>()
  resdata:any=[]
  myfiltre:any
  idetat:any
  statistique = {
    nbligne: 19,
    nbcaisse: 0,
  };
  contextMenuPosition=  {a: '0', b: '0'};
  displayedColumns: string[] = ['code','libelle','nombreCaisse','nombreCaissier','nombreTPE','etatMagsin'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  constructor(private fb:FormBuilder,private Transaction:TransactionService,private router: Router,
     private format:FormatNumberPipe, private dialog:MatDialog, 
    private mag:MagasinService,private changeDetector: ChangeDetectorRef , private translate:TranslateService,
    private pageservice:PaginationService ) {
    window.addEventListener('online', () => {
      this.isConnectionAvailableM = true
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
           // Trick the Router into believing it's last link wasn't previously loaded
           this.router.navigated = false;
        }
      }); 
  });

    window.addEventListener('offline', () => {
      this.isConnectionAvailableM = false
     //alert('Probl??me de connexion');
  });


 
  
   }
 

  ngOnInit(): void {
  this.initFormControl()
    this.watchFormChange();
    
  this.filtreM()
  
  }
  scroll(){
    this.scroll_bol=false;
    this.page_bol=true;
    this.pageservice.scroll(this.dataSource);
   }
   page(){
    this.scroll_bol=true;
    this.page_bol=false;
    setTimeout(()=>this.pageservice.page(this.dataSource,this.paginator,this.sort))
   }
   getrow_nbr(){
    setTimeout(()=>this.pageservice.getrow_nbr(this.dataSource,this.paginator,this.sort,this.row_nbr))
  }
  filtreM(){

    this.loading = true;
   
    this.mag.filtremagasin(this.val,this.val,this.val).subscribe(res=>{

      this.resultat=res;
    
      this.loading = false;
   
      this.countStat(this.resultat);
      this.dataSource = new MatTableDataSource( this.resultat);

 
      if(this.scroll_bol==true){
        setTimeout(()=>this.dataSource.paginator = this.paginator);
    
        }else{this.dataSource.paginator = null;}
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true
      this.filterData(this.dataSource);
      this.dataSource.filter=this.myfiltre
    
      this.resdata= this.dataSource.filteredData;
    
      
      })   
   
    this.mag.getgouvernorat().subscribe(res=>{
      this.gouvernorats=res;
    });
    this.Transaction.getZone().subscribe(res=>{
      this.zones=res;
    })
    this.mag.getetatmagasin().subscribe(res=>{
      this.etats=res;
    })
    this.Transaction.listewallet().subscribe(res=>{
      this.wallets=res;
    })
    this. Transaction.getParametre(this.id).subscribe(resultat=>{
      this.parametres=resultat
    //  console.log(this.parametres)
      for(var i=0; i<this.parametres.length;i++){
       this.adresse=this.parametres[0].valeurDefaut
       this.ville=this.parametres[1].valeurDefaut
       this.code=this.parametres[2].valeurDefaut
       this.tel=this.parametres[3].valeurDefaut
       this.rne=this.parametres[4].valeurDefaut
      }
    })

  }
  
  change(){
    let newsettings= this.settings;
    if(newsettings.pager.display==true){
    
      newsettings.pager.display=false;
      this.settings = Object.assign({}, newsettings);
      // this.source = new LocalDataSource(this.data);
      
    }
    else if(newsettings.pager.display==false){
      
      newsettings.pager.display=true;
      this.settings = Object.assign({}, newsettings);
    //  this.source = new LocalDataSource(this.data);
      
    }
   }
  getville(gouver){
    this.villegouver=-1;
    this.mag.getvillebyid(gouver).subscribe(res=>{
      this.villes=res;
    })
  }
  // doFilter(value:string):string[]{
    
  //   return this.resultat.map((x:any) => x.code).filter(option =>
  //    option.toLowerCase().includes(value.toLowerCase()));
  //  }

  show() {
    this.filter ? this.filter = false : this.filter = true;
   
    
   
  }
  

  Rechercher(value) {
  
    this.active=false

     this.loading = true;
     this.mag.filtremagasin('','','').subscribe(res=>{
     
      this.resultat=res;

      
    //  this.data=res;
     this.loading = false;
   
     this.dataSource = new MatTableDataSource( this.resultat);


     
      if(this.scroll_bol==true){
        setTimeout(()=>this.dataSource.paginator = this.paginator);
        }else{this.dataSource.paginator = null;}
  
  
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true
      
      
      this.filterData( this.dataSource);
      this.dataSource.filter=this.myfiltre
      this.resdata= this.dataSource.filteredData;
        
        this.countStat(this.resdata);
    
    })  

     this.active=true
   }

  Add(){
    this.addmag=false
    const dialogConfig= new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="650px";
    // dialogConfig.height="360px";
    dialogConfig.hasBackdrop = false;
  const diag=  this.dialog.open(AddVenteComponent,dialogConfig);
  
    diag.afterClosed().subscribe(item => {
     // console.log(item);
     this.addmag=true
       if(item==1){
      
         this.ngOnInit();
      }
    
    })
    
  }
  Print(){
    
   window.print();

 
  }
  onRightClick(event: MouseEvent, item) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();
    this.liste=item
    this.idetat=item.idEtatMagasin
console.log(item);

    // we record the mouse position in our object
    this.contextMenuPosition.a = event.clientX + 'px';
    this.contextMenuPosition.b = event.clientY + 'px';
  
    // we open the menu
    // we pass to the menu the information about our object
    this.contextMenu.menuData = {"item": item}
    this.contextMenu.menu.focusFirstItem('mouse');
    // we open the menu
    this.contextMenu.openMenu();
  
  }
changer(item){
  const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.minWidth="400px"
 
  dialogConfig.hasBackdrop = false;
 
  dialogConfig.data=this.liste;
const diag=  this.dialog.open(ChangerEtatComponent,dialogConfig);

  diag.afterClosed().subscribe(item => {
   // console.log(item);
     if(item==1){
       this.ngOnInit();
    }
  })
}
  detail(item){
 
    const dialogConfig= new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="800px";
    // dialogConfig.height="350px";
    // dialogConfig.maxWidth="900px"
     dialogConfig.hasBackdrop = false;
    dialogConfig.data=this.liste;
  const diag=  this.dialog.open( DetailVenteComponent,dialogConfig);
  
    diag.afterClosed().subscribe(item => {
    
    })
  }
  modifier(item){
    const dialogConfig= new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.width = "950px";
    // dialogConfig.height = "550px";
    dialogConfig.hasBackdrop = false;
    // dialogConfig.maxHeight = "550px"
    dialogConfig.data=this.liste;
  const diag=  this.dialog.open(UpdateVenteComponent,dialogConfig);
  
    diag.afterClosed().subscribe(item => {
     // console.log(item);
       if(item==1){
         this.ngOnInit();
      }
    })
  }  
  private initFormControl() {
  this.filterform = this.fb.group({

    cdmagasin:[''],
    // ville:[''],
    nomagasin:[''],
    etat_magasin:[''],
    // zone_:['']
  });
  }
  filterData(source){


    
    this.dataSource.filterPredicate = ((data, filter) => {
      const cmag =!filter.cdmagasin ||
      data.code.toLowerCase().includes(filter.cdmagasin);
      // const cmag =!filter.cdmagasin  || data.code == filter.filter.cdmagasin;
      const nom =!filter.nomagasin ||
      data.libelle.toLowerCase().includes(filter.nomagasin.toLowerCase());
     
      const etat = !filter.etat_magasin|| data.idEtatMagasin == filter.etat_magasin;
     
     
      return cmag  && nom && etat 
    }) as (PeriodicElement, string) => boolean;
  }

 
    private watchFormChange() {
    
    

      this.filterform.valueChanges.subscribe(value => {
        this.dataSource = new MatTableDataSource( this.resultat);
        if(this.scroll_bol==true){
          setTimeout(()=>this.dataSource.paginator = this.paginator);
          }else{this.dataSource.paginator = null;}
        this.dataSource.sort = this.sort;
        this.sort.disableClear = true
        this.filterData(this.dataSource);
     
        
        const filter = {
          ...value,
         
        } as string;
        this.dataSource.filter = filter;
        this.myfiltre = filter
         this.resdata= this.dataSource.filteredData;
         this.countStat(this.resdata);
       
    

      });


}
ngAfterViewChecked() {
  this.changeDetector.detectChanges();

 
}


private countStat(magasin) {
  let nbrligne = 0;
  let nbcaisse=0


  magasin.forEach((element) => {
   nbrligne=magasin.length
   nbcaisse += element.nombreCaisse

  });
  this.statistique.nbligne = nbrligne;
  this.statistique.nbcaisse=nbcaisse
  
  
  
  
}
affiliation(item){
  const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.width = "850px";
  // dialogConfig.height = "550px";
  dialogConfig.hasBackdrop = false;
  // dialogConfig.maxHeight = "550px"
  dialogConfig.data=this.liste;
const diag=  this.dialog.open(AffiliationComponent,dialogConfig);

  diag.afterClosed().subscribe(item => {
   // console.log(item);
     if(item==1){
       this.ngOnInit();
    }
  })
}
}
