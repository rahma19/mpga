import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Affect } from 'app/model/affectation';
import { DetailMagasin } from 'app/model/mpga/detailmagasin';
import { Simulation } from 'app/model/simulationQR';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { EtablissementFinancierService } from 'app/pages/services/etablissement_financier.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { PaiementService } from 'app/pages/services/paiement.service';
import { QrCodeService } from 'app/pages/services/qr_code.service';
import { ToastrService } from 'ngx-toastr';
import { DetailCommentaireComponent } from './detail-commentaire/detail-commentaire.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationComponent implements OnInit {
  displayedColumnsemetteur: string[] = ['libelle','buttonsubmit'];
  dataSourceemetteur : any;
  id=1
  emetteurs:any
  dataSourceobject:any
  displayedColumndataobject: string[] = ['idDataObject','codeId','designation','valeur','commentaire'];
  objectdata:any
  affich:any
  dataSourcesousobject:any
  displayedColumnsousdataobject: string[] = ['idDataObject','codeId','designation','valeur'];
  dataaffect:any=[]
  idemetteur:any
  affect:Array<{id_produit_financier:any,list_data_object:Array<{id_data_object:any}>}>=[]
  objecttemplate:any
  active:boolean=false
  listeaffecter = new Affect
  tab=[]
  loading:boolean=false
  visible:boolean=false
  valueqr:any
  open:boolean=false
 tableau=[]
 simulation:FormGroup
 emet:any
 maga:any
 magasins:any
 val=''
 value:any
 caisses:any
 ville:any
 codepostal:any
 cdcaisse:any
 mont:any
 simul =new Simulation
 nom:any
 codemg:any
 aff:any
 ref:any
 resultat:any
  constructor(private fb:FormBuilder,private etabfinance:PaiementService,private qr:QrCodeService,private dialog: MatDialog,private toast:ToastrService,private mg:MagasinService,private format:FormatNumberPipe,) { }

  ngOnInit(): void {
    
    this.etabfinance. ListProduitFinancietByCat(this.id).subscribe(res=>{
      this.emetteurs=res
    
      this.dataSourceemetteur= new MatTableDataSource(this.emetteurs)
    })
    this.loading=true
this.qr.ListObjectData().subscribe(res=>{
  this.objectdata=res
console.log( this.objectdata)
  this.dataSourceobject= new MatTableDataSource(this.objectdata)
  this.loading=false
})

this.simulation=this.fb.group({
  idProduitFinancier: new  FormControl('',Validators.required),
  nomMagasin:new  FormControl('',Validators.required),
  codeCaisse:new  FormControl('',Validators.required),
  codePostal:new FormControl({ value: '', disabled: true }),
  nomVille:new FormControl({ value: '', disabled: true }),
  montant:new FormControl('',[Validators.required,Validators.pattern(/^([.0-9])/)]),
  affiliationMonetique:new  FormControl('',[Validators.required,Validators.pattern(/^([0-9])/),Validators.maxLength(15),Validators.minLength(15)]),
  refMPGA:new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9]*$"),Validators.maxLength(20),Validators.minLength(20)]),
})

this.mg.filtremagasin(this.val,this.val,this.val).subscribe(res=>{
  this.magasins=res
  for(var i=0; i<this.magasins.length;i++){
    
  }
})

  }
  affichcommentaire(event:any){
console.log(event)
const dialogConfig= new MatDialogConfig;
  dialogConfig.disableClose=true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="auto";
  dialogConfig.height="auto";
dialogConfig.data=event
 this.dialog.open(DetailCommentaireComponent,dialogConfig);

  

  }
  dataobjectaffect(liste){
    this.tab=[]
    this.visible=true
    console.log(liste.idProduitFinancier)
      // this.openfonction=true
      this.idemetteur=liste.idProduitFinancier
     this.qr.ListDataObjectAffect(this.idemetteur).subscribe((res:any)=>{
       this.dataaffect=res
       console.log(this.dataaffect)
       for(var j=0;j<this.objectdata.length;j++){
        if(this.objectdata[j].flagPresence== true){
          this.dataaffect.push(this.objectdata[j])
          //  this.active=true
        }
        // else{
        //   this.active=false
        // }
      }
this.dataaffect=this.dataaffect.reduce((acc, val) => {
  if (!acc.find(el => el.idDataObject === val.idDataObject)) {
    acc.push(val);
  }
  return acc;
}, []);
         for(var i=0;i<this.dataaffect.length;i++){
            this.tab.push({id_data_object:this.dataaffect[i].idDataObject})
        }
      console.log(this.tab)
     
     })
    
    }
  inputChecked(data){
  
    let checked = false;
    for(var k=0; k< this.dataaffect.length;k++){
  


        var idobject= this.dataaffect[k].idDataObject
        var flag=this.dataaffect[k].flagPresence== true
       
      if(idobject==data.idDataObject  ){
        checked= true;
      
       
      }
      if(checked==true) break;
    }
    return checked;

  }
  
  
    CheckboxSelect(id,event,flag){
   

      if(event.target.checked===true){
         
      this.tab.push({id_data_object:id});
      console.log(this.tab)
        this.tab = this.tab.filter((thing, index, self) =>
        index === self.findIndex((t) => (
           t === thing
        )),
        
      )
    
      if(flag){
     this.qr.ListObjectDataTemplate(id).subscribe(res=>{
       this.objecttemplate=res
       console.log(res)
       this.dataSourcesousobject= new MatTableDataSource(this.objecttemplate)
       for(var j=0;j<this.objecttemplate.length;j++){
       if(this.objecttemplate[j].flagPresence== true){
         this.tab.push({id_data_object:this.objecttemplate[j].idDataObject})
        
       }
      //  this.dataaffect=this.tab
      //  console.log('affect',this.dataaffect)
     }
     console.log('rrr',this.tab)
     
     })
     
             }
            
      
      }
      
      if(event.target.checked=== false ){
        
       for(var i=0; i < this.tab.length; i++) {
        
        
      if(this.tab[i].id_data_object == id  ){

          this.tab.splice(i,1);

        console.log('flag',flag)
       
        }
       
        if( flag){
     
          // console.log('id',id)
           console.log('flag',flag)
          this.qr.ListObjectDataTemplate(id).subscribe(res=>{
            this.objecttemplate=res
            console.log(res)
            for(var j=0;j<this.objecttemplate.length;j++){
          var identifiant=this.objecttemplate[j].idDataObject
           console.log(identifiant)

          var sousid = this.tab.find( ({ id_data_object}) => id_data_object === identifiant);
         
console.log('yy',sousid)
          
var index= this.tab.indexOf(sousid);
if (index !== -1) {
    this.tab.splice(index, 1);
}
          }
          console.log('rrr',this.tab)
         
          })
          
                  }

                 
     }
     
  
      }
      console.log(this.tab);
      
    }
    sousidinputChecked(data){
      //  console.log(data)
      
      let checked = false;
      for(var k=0; k< this.objecttemplate.length;k++){
        
       
        
          
       
  
  
          var idobject= this.objecttemplate[k].idDataObject
         
        if(idobject==data.idDataObject  ){
         
        
          checked= true;
          
  
        }
      
       
        if(checked==true) break;
        
      }
    
          
    
      return checked;
  
    }
   
    sousidCheckboxSelect(id,event,flag){
   

      if(event.target.checked===true){
      
      this.tab.push({id_data_object:id});
      console.log(this.dataaffect)
        this.tab = this.tab.filter((thing, index, self) =>
        index === self.findIndex((t) => (
           t === thing
        )),
        
      )
      
     
      }
      
      if(event.target.checked=== false ){
        
       for(var i=0; i < this.tab.length; i++) {
    
      if(this.tab[i].id_data_object == id  )
      
        {
          this.tab.splice(i,1);
        }
     }
   
    
      }
      console.log(this.tab);
      
    }


    affecter(){
   this.loading=true
      this.listeaffecter.list_data_object=this.tab
      this.listeaffecter.id_produit_financier=this.idemetteur
       console.log(this.listeaffecter)
      
       this.qr.Affect(this.listeaffecter).subscribe(res=>{
        
         this.toast.success(" Affectation effectué avec succes !","", {timeOut: 2500});
         this.ngOnInit()
         this.visible=false
         this.affich=false
         this.loading=false
       },err=>{
        
         this.toast.error("Affectation a échoué !","", {timeOut: 2500});
         this.visible=false
         this.loading=false
         console.log(err);
          }) 
     }



     valider(value){
       value=this.valueqr
       console.log(value)
       this.open=true
     }

     opensousid(id ,event,flag){
      if(flag){
        this.affich=true

this.qr.ListObjectDataTemplate(id).subscribe(res=>{
this.objecttemplate=res
console.log(res)
this.dataSourcesousobject= new MatTableDataSource(this.objecttemplate)
})

      }
      else{
        this.affich=false
      }

     }

     sousinputChecked(data){
   
      
      let checked = false;
      for(var k=0; k< this.tab.length;k++){
    
  
  
          var idobject= this.tab[k].id_data_object
          
         
        if(idobject==data.idDataObject  ){
          checked= true;
        
         
        }
        if(checked==true) break;
      }
      return checked;
  
    }


    checkValuemagasin(maga){
      this.value=maga.idMagasin
      console.log(this.value)
      this.nom=maga.libelle
      this.codemg=this.maga.code
      this.codepostal=''
      this.ville=''
      this.cdcaisse=''
     
      if(this.value != ''){
        this.codepostal=this.maga.codePostal
        this.ville=maga.ville
        this.mg.listecaissebymagasin(this.value).subscribe(res=>{
          this.caisses=res
        })
      }
    }

    erreurref(){
      return this.simulation.get('refMPGA').hasError('required') ? 'champ obligatoire' :
    this.simulation.get('refMPGA').hasError('pattern') ? 'que des chiffres et des lettres' :
    this.simulation.get('refMPGA').hasError('minlength') ? 'il faut 20 caractéres' : ''
    }
    erreuraffiliation(){
      return this.simulation.get('affiliationMonetique').hasError('required') ? 'champ obligatoire' :
      this.simulation.get('affiliationMonetique').hasError('pattern') ? 'que des chiffres ' :
      this.simulation.get('affiliationMonetique').hasError('minlength') ? 'il faut 15 caractéres' : ''
    }
    erreurmontant(){
      return this.simulation.get('montant').hasError('required') ? 'champ obligatoire' :
      this.simulation.get('montant').hasError('pattern') ? 'que des chiffres ' :''
    }
    onSubmit(){
      if(this.simulation.invalid){
        this.simulation.get('idProduitFinancier').markAllAsTouched()
        this.simulation.get('nomMagasin').markAllAsTouched()
        this.simulation.get('codeCaisse').markAllAsTouched()
        this.simulation.get('montant').markAllAsTouched()
        this.simulation.get('affiliationMonetique').markAllAsTouched()
        this.simulation.get('refMPGA').markAllAsTouched()
      }
      if(this.simulation.valid){
        
        var prixformate =this.mont.replace(/\s/g, "");
        var prix=prixformate.replace(',', ".");

      
this.simul.idProduitFinancier=this.emet
this.simul.nomMagasin=this.nom
this.simul.codeMagasin=this.codemg
this.simul.codeCaisse=this.cdcaisse
this.simul.nomVille=this.ville
this.simul.codePostal=this.codepostal
this.simul.montant=prix
this.simul.affiliationMonetique=this.aff
this.simul.refMPGA=this.ref
console.log(this.simul)
this.qr.GenererQR(this.simul).subscribe(res=>{
  this.resultat=res
console.log(this.resultat)
this.simulation.reset()
})
      }
    }


    updatmontant(){
    if( this.mont!= undefined && this.mont != ''){
      if (this.mont.indexOf(',') == -1){
   // this.prix='0,'+this.prix+' TND' ;
      this.mont=this.format.transform(this.mont);
    }
  }
  }
 
}
