import { Component, EventEmitter, Inject, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Param } from 'app/model/mpga/param';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { EtablissementFinancierService } from 'app/pages/services/etablissement_financier.service';
import { PaiementService } from 'app/pages/services/paiement.service';
import { ParametreService } from 'app/pages/services/parametre.service';
import { TpeService } from 'app/pages/services/tpe.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-etat',
  templateUrl: './update-etat.component.html',
  styleUrls: ['./update-etat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateEtatComponent implements OnInit {
  id:any;
  list:any;
  name:any;
  value:any;
  listEtatAnomalie=[];
  etatrecon:any;
  etatecart:any
  etatmagasin:any;
  etatcaisse:any;
  etatmvt:any;
  etatAgent:any;
  etatmaga:any;
  etatcaiss:any;
  categorie:any;
  codeerreur:any;
  recon:any=[]
  etatwallet:any
  etatlettrage:any
  etatreconsilliation:any
  etattransaction:any
  utilisateursys:any
  etablissement:any
  produits_finance:any
  canal:any
  marques:any
  categories:any
  os:any
  proprietaires:any
  Etattpe:any
  models:any
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  mrqform:FormGroup
  ds:any
  descrip:any
  newlist=[]
  modlform:FormGroup
  dsmdl:any
  mrq:any
  cat:any
  nb:any
  formatserie:any
  frai:any
  com:any
  flagimp:boolean=false
  errnbr:boolean
  idos:any
 
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<UpdateEtatComponent>,private param:ParametreService,private toast: ToastrService,private finance:PaiementService,private tpe:TpeService,private fb:FormBuilder,private format:FormatNumberPipe) { }

  ngOnInit(): void {
   
    this.mrqform=this.fb.group({
      designation:['',[Validators.required,Validators.pattern("^[a-zA-Z ]*$")]],
      commentaire:['']
    })
    this.modlform=this.fb.group({
      designation :['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
      idMarqueTpe:['',Validators.required],
      idCategorieTpe :['',Validators.required],
      idOsTpe :['',Validators.required],
      nombreCaractereNumeroSerie :['',[Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]],
      fraisLocationMensuel:['',[Validators.required,Validators.pattern(/^(?=,*[0-9])/)]],
        flagImprimante:[''],
        commentaire:[''],
        formatNumeroSerie :['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]*$/)]]   
    })
    
    console.log(this.data);
    this.id=this.data.id;
     this.list=this.data.value;

  console.log(this.list)
    this.name=this.data.name;
    console.log(this.id);


    this.tpe.getMarque().subscribe(res=>{
      this.marques=res
     
      
    })
    
  
  
    this.tpe.ListCategorie().subscribe(res=>{
      this.categories=res
     
      
    })
    
    this.tpe.ListOs().subscribe(res=>{
      this.os=res
    })

  }
  
  // checkvalue(liste){
  //   if(this.list.length!=0){
  //   let value = '';
  //   for(var k=0; k<this.list.length;k++){
       
  //       value= this.list[k].libelle;
      
  //     if(value!='') break;
  //   }
  //   return value;
  // }
  // }
  show(liste){
    if(this.id==2){
    var index= this.list.findIndex((t)=>t.idEtatAnomalie===liste.idEtatAnomalie)
    if(index=== -1){
     this.list.push(liste);
    }
    
    //console.log(this.list);
  }
  if(this.id==1){
   
    var index= this.list.findIndex((t)=>t.idEtatCloture===liste.idEtatCloture)
    console.log(index)
    if(index=== -1){
     this.list.push(liste);
     
    }
  //  this.data=liste
 
  //   console.log(liste);
  //   console.log(this.list);
  }
  if(this.id==4){
    var index= this.list.findIndex((t)=>t.idEtatAgent===liste.idEtatAgent)
    if(index=== -1){
     this.list.push(liste);
    }
    
    //console.log(this.list);
  }
  if(this.id==3){
    var index= this.list.findIndex((t)=>t.idEtatMouvement===liste.idEtatMouvement)
    if(index=== -1){
     this.list.push(liste);
    }
    
    //console.log(this.list);
  }

  if(this.id==5){
    var index= this.list.findIndex((t)=>t.idEtatMagasin===liste.idEtatMagasin)
    if(index=== -1){
     this.list.push(liste);
    }
  }


  if(this.id==6){
    var index= this.list.findIndex((t)=>t.idEtatCaisse===liste.idEtatCaisse)
    if(index=== -1){
     this.list.push(liste);
    }
  }
  if(this.id==7){
    var index= this.list.findIndex((t)=>t.idCategorieAgent===liste.idCategorieAgent)
    if(index=== -1){
     this.list.push(liste);
    }
    
    
  }
  if(this.id==8){
    var index= this.list.findIndex((t)=>t.idCodeErreur===liste.idCodeErreur)
    if(index=== -1){
     this.list.push(liste);
    }
    
  
  }
  if(this.id==9){
    var index= this.list.findIndex((t)=>t.idEtatWallet===liste.idEtatWallet)
    if(index=== -1){
     this.list.push(liste);
    }
    
  
  }
  if(this.id==10){
    var index= this.list.findIndex((t)=>t.idEtatLettrage===liste.idEtatLettrage)
    if(index=== -1){
     this.list.push(liste);
    }
    
  
  }
  if(this.id==11){
    var index= this.list.findIndex((t)=>t.idEtatReconciliation===liste.idEtatReconciliation)
    if(index=== -1){
     this.list.push(liste);
    }
    
  
  }
  if(this.id==12){
    var index= this.list.findIndex((t)=>t.idEtatTransaction===liste.idEtatTransaction)
    if(index=== -1){
     this.list.push(liste);
    }
    
  
  }
  if(this.id==13){
    var index= this.list.findIndex((t)=>t.idUtilisateurSysteme===liste.idUtilisateurSysteme)
    if(index=== -1){
     this.list.push(liste);
    }
    
  
  }
 
  }
  onSubmit(){
    
    
if(this.id==2){
    for(var i=0;i<this.list.length;i++){
      let obj={idEtatAnomalie:this.list[i].idEtatAnomalie,libelle:this.list[i].libelle,couleur:this.list[i].couleur}
      this.listEtatAnomalie.push(obj);
    }
    console.log(this.listEtatAnomalie);
    let obj2={listEtatAnomalie:this.listEtatAnomalie};
    this.param.updateEcartEtat(obj2).subscribe(res=>{
      this.dialogRef.close();
      this.toast.success("Etat écart modifié avec succes !","", {timeOut: 2500});
    },err=>{
      this.dialogRef.close();
      this.toast.error("La modification a échoué !","", {timeOut: 2500});
     // console.log(err);
      }) 
    }
    if(this.id==1){
     
      for(var i=0;i<this.list.length;i++){
        let obj={idEtatCloture:this.list[i].idEtatCloture,libelle:this.list[i].libelle,couleur:this.list[i].couleur}
        this.listEtatAnomalie.push(obj);
      }
      console.log(this.listEtatAnomalie);
      let obj2={listEtatClotureJournee:this.listEtatAnomalie};
    
      this.param.updateReconciliationtEtat(obj2).subscribe(res=>{
        this.dialogRef.close();
        this.toast.success("Etat réconciliation modifié avec succes !","", {timeOut: 2500});
         this. ngOnInit()
     
      },err=>{
        this.dialogRef.close();
        this.toast.error("La modification a échoué !","", {timeOut: 2500});
       // console.log(err);
        }) 
      }
      if(this.id==3){
        for(var i=0;i<this.list.length;i++){
          let obj={idEtatMouvement:this.list[i].idEtatMouvement,libelle:this.list[i].libelle,couleur:this.list[i].couleur}
          this.listEtatAnomalie.push(obj);
        }
        console.log(this.listEtatAnomalie);
        let obj2={listEtatMouvementAgent:this.listEtatAnomalie};
      
        this.param.updateEtatMouvement(obj2).subscribe(res=>{
          this.dialogRef.close();
          this.toast.success("Etat mouvement modifié avec succes !","", {timeOut: 2500});
          
        },err=>{
          this.dialogRef.close();
          this.toast.error("La modification a échoué !","", {timeOut: 2500});
         // console.log(err);
          }) 
        }
      
        if(this.id==4){
          for(var i=0;i<this.list.length;i++){
            let obj={idEtatAgent:this.list[i].idEtatAgent,libelle:this.list[i].libelle,couleur:this.list[i].couleur}
            this.listEtatAnomalie.push(obj);
          }
          console.log(this.listEtatAnomalie);
          let obj2={listEtatAgent:this.listEtatAnomalie};
        
          this.param.updateAgentEtat(obj2).subscribe(res=>{
            this.dialogRef.close();
            this.toast.success("Etat agent modifié avec succes !","", {timeOut: 2500});
            
          },err=>{
            this.dialogRef.close();
            this.toast.error("La modification a échoué !","", {timeOut: 2500});
           // console.log(err);
            }) 
          }
          if(this.id==6){
            for(var i=0;i<this.list.length;i++){
              let obj={idEtatCaisse:this.list[i].idEtatCaisse,libelle:this.list[i].libelle,couleur:this.list[i].couleur}
              this.listEtatAnomalie.push(obj);
            }
            console.log(this.listEtatAnomalie);
            let obj2={listEtatCaisse:this.listEtatAnomalie};
          
            this.param.updateEtatCaisse(obj2).subscribe(res=>{
              this.dialogRef.close();
              this.toast.success("Etat caisse modifié avec succes !","", {timeOut: 2500});
              
            },err=>{
              this.dialogRef.close();
              this.toast.error("La modification a échoué !","", {timeOut: 2500});
             // console.log(err);
              }) 
            }

            if(this.id==7){
              for(var i=0;i<this.list.length;i++){
                let obj={idCategorieAgent:this.list[i].idCategorieAgent,libelle:this.list[i].libelle}
                this.listEtatAnomalie.push(obj);
              }
              console.log(this.listEtatAnomalie);
              let obj2={listCategorieAgent:this.listEtatAnomalie};
            
              this.param.updateEtatCategorieAgent(obj2).subscribe(res=>{
                this.dialogRef.close();
                this.toast.success("Etat catégorie agent modifié avec succes !","", {timeOut: 2500});
                
              },err=>{
                this.dialogRef.close();
                this.toast.error("La modification a échoué !","", {timeOut: 2500});
               // console.log(err);
                }) 
              }

    if(this.id==5){
      for(var i=0;i<this.list.length;i++){
        let obj={idEtatMagasin:this.list[i].idEtatMagasin,libelle:this.list[i].designation,couleur:this.list[i].couleur}
        this.listEtatAnomalie.push(obj);
      }
      console.log(this.listEtatAnomalie);
      let obj2={listEtatMagasin:this.listEtatAnomalie};
      this.param.updateEtatmagasin(obj2).subscribe(res=>{
        this.dialogRef.close();
        this.toast.success("Etat magasin modifié avec succes !","", {timeOut: 2500});
      },err=>{
        this.dialogRef.close();
        this.toast.error("La modification a échoué !","", {timeOut: 2500});
       // console.log(err);
        }) 
      }
      if(this.id==8){
        for(var i=0;i<this.list.length;i++){
          let obj={idCodeErreur:this.list[i].idCodeErreur,libelle:this.list[i].libelle}
          this.listEtatAnomalie.push(obj);
        }
        console.log(this.listEtatAnomalie);
        let obj2={listCodeErreur:this.listEtatAnomalie};
      
        this.param.updateEtatCodeerreur(obj2).subscribe(res=>{
          this.dialogRef.close();
          this.toast.success("Etat code erreur modifié avec succes !","", {timeOut: 2500});
          
        },err=>{
          this.dialogRef.close();
          this.toast.error("La modification a échoué !","", {timeOut: 2500});
         // console.log(err);
          }) 
        }

        if(this.id==9){
          for(var i=0;i<this.list.length;i++){
            let obj={idEtatProduitFinancier:this.list[i].idEtatProduitFinancier,libelle:this.list[i].designation,couleur:this.list[i].couleur}
            this.listEtatAnomalie.push(obj);
          }
          console.log(this.listEtatAnomalie);
          let obj2={listEtatProduitFinancier:this.listEtatAnomalie};
          this.param.updateEtatWallet(obj2).subscribe(res=>{
            this.dialogRef.close();
            this.toast.success("Etat produit financier modifié avec succes !","", {timeOut: 2500});
          },err=>{
            this.dialogRef.close();
            this.toast.error("La modification a échoué !","", {timeOut: 2500});
           // console.log(err);
            }) 
          }
          if(this.id==10){
            for(var i=0;i<this.list.length;i++){
              let obj={idEtatLettrage:this.list[i].idEtatLettrage,libelle:this.list[i].designation,couleur:this.list[i].couleur}
              this.listEtatAnomalie.push(obj);
            }
            console.log(this.listEtatAnomalie);
            let obj2={listEtatLettrage:this.listEtatAnomalie};
            this.param.updateEtatLettrage(obj2).subscribe(res=>{
              this.dialogRef.close();
              this.toast.success("Etat lettrage modifié avec succes !","", {timeOut: 2500});
            },err=>{
              this.dialogRef.close();
              this.toast.error("La modification a échoué !","", {timeOut: 2500});
             // console.log(err);
              }) 
            }
            if(this.id==11){
              for(var i=0;i<this.list.length;i++){
                let obj={idEtatReconciliation:this.list[i].idEtatReconciliation,libelle:this.list[i].designation,couleur:this.list[i].couleur}
                this.listEtatAnomalie.push(obj);
              }
              console.log(this.listEtatAnomalie);
              let obj2={listEtatReconciliation:this.listEtatAnomalie};
              this.param.updateEtatReconcilliation(obj2).subscribe(res=>{
                this.dialogRef.close();
                this.toast.success("Etat reconcilliation modifié avec succes !","", {timeOut: 2500});
              },err=>{
                this.dialogRef.close();
                this.toast.error("La modification a échoué !","", {timeOut: 2500});
               // console.log(err);
                }) 
              }
              if(this.id==12){
                for(var i=0;i<this.list.length;i++){
                  let obj={idEtatTransaction:this.list[i].idEtatTransaction,libelle:this.list[i].designation,couleur:this.list[i].couleur}
                  this.listEtatAnomalie.push(obj);
                }
                console.log(this.listEtatAnomalie);
                let obj2={listEtatTransaction:this.listEtatAnomalie};
                this.param.updateEtatTransaction(obj2).subscribe(res=>{
                  this.dialogRef.close();
                  this.toast.success("Etat transaction modifié avec succes !","", {timeOut: 2500});
                },err=>{
                  this.dialogRef.close();
                  this.toast.error("La modification a échoué !","", {timeOut: 2500});
                 // console.log(err);
                  }) 
                }

                if(this.id==13){
                  for(var i=0;i<this.list.length;i++){
                    let obj={idUtilisateurSysteme:this.list[i].idUtilisateurSysteme,nomUtilisateur:this.list[i].nomUtilisateur}
                    this.listEtatAnomalie.push(obj);
                  }
                  console.log(this.listEtatAnomalie);
                  let obj2={listUtilisateurSysteme:this.listEtatAnomalie};
                  console.log(obj2)
                  this.param.updateUtilisateurSysteme(obj2).subscribe(res=>{
                    this.dialogRef.close();
                    this.toast.success("Utilisateur systeme modifié avec succes !","", {timeOut: 2500});
                  },err=>{
                    this.dialogRef.close();
                    this.toast.error("La modification a échoué !","", {timeOut: 2500});
                   // console.log(err);
                    }) 
                  }


                  if(this.id==14){
                    for(var i=0;i<this.list.length;i++){
                      let obj={idCategorieEtablissementFinancier:this.list[i].idCategorieEtablissementFinancier,designation:this.list[i].designation,commentaire:this.list[i].commentaire,couleur:this.list[i].couleur}
                      this.listEtatAnomalie.push(obj);
                    }
                    console.log(this.listEtatAnomalie);
                    let obj2={listCategorieEtablissementFinancier:this.listEtatAnomalie};
                    console.log(obj2)
                    this.finance.UpdateCategorieEtablissement(obj2).subscribe(res=>{
                      this.dialogRef.close();
                      this.toast.success("Catégorie etablissement modifié avec succes !","", {timeOut: 2500});
                    },err=>{
                      this.dialogRef.close();
                      this.toast.error("La modification a échoué !","", {timeOut: 2500});
                     // console.log(err);
                      }) 
                    }
                    if(this.id==15){
                      for(var i=0;i<this.list.length;i++){
                        let obj={idCategorieProduitFinancier:this.list[i].idCategorieProduitFinancier,designation:this.list[i].designation,commentaire:this.list[i].commentaire}
                        this.listEtatAnomalie.push(obj);
                      }
                      console.log(this.listEtatAnomalie);
                      let obj2={listCategorieProduitFinancier:this.listEtatAnomalie};
                      console.log(obj2)
                      this.finance.UpdateCategorieProduitFinancier(obj2).subscribe(res=>{
                        this.dialogRef.close();
                        this.toast.success("Catégorie produit financier modifié avec succes !","", {timeOut: 2500});
                      },err=>{
                        this.dialogRef.close();
                        this.toast.error("La modification a échoué !","", {timeOut: 2500});
                       // console.log(err);
                        }) 
                      }
                      if(this.id==16){
                        for(var i=0;i<this.list.length;i++){
                          let obj={idCanalPaiement:this.list[i].idCanalPaiement,designation:this.list[i].designation,commentaire:this.list[i].commentaire}
                          this.listEtatAnomalie.push(obj);
                        }
                        console.log(this.listEtatAnomalie);
                        let obj2={listCanalPaiement:this.listEtatAnomalie};
                        console.log(obj2)
                        this.finance.UpdateCanalPaiement(obj2).subscribe(res=>{
                          this.dialogRef.close();
                          this.toast.success("Canal paiement modifié avec succes !","", {timeOut: 2500});
                        },err=>{
                          this.dialogRef.close();
                          this.toast.error("La modification a échoué !","", {timeOut: 2500});
                         // console.log(err);
                          }) 
                        }
                        if(this.id==18){



                          
                          for(var i=0;i<this.list.length;i++){
                            let obj={idMarqueTpe:this.list[i].idMarqueTpe,designation:this.list[i].designation}
                            this.listEtatAnomalie.push(obj);
                          }
                          console.log(this.listEtatAnomalie);
                          let obj2={listMarqueTpe:this.listEtatAnomalie};
                          console.log(obj2)
                          this.tpe.UpdateMarque(obj2).subscribe(res=>{
                            this.dialogRef.close();
                            this.toast.success("Marque TPE modifié avec succes !","", {timeOut: 2500});
                          },err=>{
                            this.dialogRef.close();
                            this.toast.error("La modification a échoué !","", {timeOut: 2500});
                           // console.log(err);
                            }) 
                          }
                          if(this.id==21){
                            for(var i=0;i<this.list.length;i++){
                              let obj={idCategorieTpe:this.list[i].idCategorieTpe,designation:this.list[i].designation}
                              this.listEtatAnomalie.push(obj);
                            }
                            console.log(this.listEtatAnomalie);
                            let obj2={listCategorieTpe:this.listEtatAnomalie};
                            console.log(obj2)
                            this.tpe.UpdateCategorie(obj2).subscribe(res=>{
                              this.dialogRef.close();
                              this.toast.success("Catégorie TPE modifié avec succes !","", {timeOut: 2500});
                            },err=>{
                              this.dialogRef.close();
                              this.toast.error("La modification a échoué !","", {timeOut: 2500});
                             // console.log(err);
                              }) 
                            }
                            if(this.id==22){
                              for(var i=0;i<this.list.length;i++){
                                let obj={idOsTpe:this.list[i].idOsTpe,designation:this.list[i].designation}
                                this.listEtatAnomalie.push(obj);
                              }
                              console.log(this.listEtatAnomalie);
                              let obj2={listOsTpe:this.listEtatAnomalie};
                              console.log(obj2)
                              this.tpe.UpdateOS(obj2).subscribe(res=>{
                                this.dialogRef.close();
                                this.toast.success("OS modifié avec succes !","", {timeOut: 2500});
                              },err=>{
                                this.dialogRef.close();
                                this.toast.error("La modification a échoué !","", {timeOut: 2500});
                               // console.log(err);
                                }) 
                              }
                              if(this.id==20){
                                for(var i=0;i<this.list.length;i++){
                                  let obj={idProprietaireTpe:this.list[i].idProprietaireTpe,designation:this.list[i].designation}
                                  this.listEtatAnomalie.push(obj);
                                }
                                console.log(this.listEtatAnomalie);
                                let obj2={listProprietaireTpe:this.listEtatAnomalie};
                                console.log(obj2)
                                this.tpe.UpdateProprietaire(obj2).subscribe(res=>{
                                  this.dialogRef.close();
                                  this.toast.success("Propiétaire modifié avec succes !","", {timeOut: 2500});
                                },err=>{
                                  this.dialogRef.close();
                                  this.toast.error("La modification a échoué !","", {timeOut: 2500});
                                 // console.log(err);
                                  }) 
                                }
                                if(this.id==23){
                                  for(var i=0;i<this.list.length;i++){
                                    let obj={idEtatTpe:this.list[i].idEtatTpe,designation:this.list[i].designation,couleur:this.list[i].couleur}
                                    this.listEtatAnomalie.push(obj);
                                  }
                                  console.log(this.listEtatAnomalie);
                                  let obj2={listEtatTpe:this.listEtatAnomalie};
                                  console.log(obj2)
                                  this.tpe.UpdateEtatTPE(obj2).subscribe(res=>{
                                    this.dialogRef.close();
                                    this.toast.success("Etat TPE modifié avec succes !","", {timeOut: 2500});
                                  },err=>{
                                    this.dialogRef.close();
                                    this.toast.error("La modification a échoué !","", {timeOut: 2500});
                                   // console.log(err);
                                    }) 
                                  }
                                  if(this.id==19){
                                    for(var i=0;i<this.list.length;i++){
                                      let obj={idModeleTpe:this.list[i].idModeleTpe,designation:this.list[i].designation,idMarqueTpe:this.list[i].idMarqueTpe
                                        ,idCategorieTpe:this.list[i].idCategorieTpe,idOsTpe:this.list[i].idOsTpe,fraisLocationMensuel:this.list[i].fraisLocationMensuel,
                                        nombreCaractereNumeroSerie:this.list[i].nombreCaractereNumeroSerie,formatNumeroSerie:this.list[i].formatNumeroSerie
                                        ,flagImprimante:this.list[i].flagImprimante
                                      }
                                      this.listEtatAnomalie.push(obj);
                                    }
                                    console.log(this.listEtatAnomalie);
                                    let obj2={listModeleTpe:this.listEtatAnomalie};
                                    console.log(obj2)
                                    this.tpe.UpdateModeleTPE(obj2).subscribe(res=>{
                                      this.dialogRef.close();
                                      this.toast.success("Modèle TPE modifié avec succes !","", {timeOut: 2500});
                                    },err=>{
                                      this.dialogRef.close();
                                      this.toast.error("La modification a échoué !","", {timeOut: 2500});
                                     // console.log(err);
                                      }) 
                                    }
  }
  Fermer(){
    this.dialogRef.close();
   }
   reset(){
    this.newlist=[]
    this.mrqform.reset()
this.modlform.reset()
     if(this.id==1){
       this.param.etatcloture().subscribe(res=>{
         this.recon=res
        //  console.log(this.recon)
         this.list=   this.recon
        
       })
     
     }
   
     if(this.id==2){
     
      this.param.etatecart().subscribe(res=>{
        this.etatecart=res;
        console.log(this.etatecart)
        this.list= this.etatecart
         console.log(this.list);
      })
    
       }

       if(this.id==3){
        this.param.etatmouvement().subscribe(res=>{
          this.etatmvt=res;
          this.list= this.etatmvt
          console.log(this.list);
       })
     
         }
         if(this.id==4){
          this.param.etatAgent().subscribe(res=>{
            this.etatAgent=res;
            this.list= this.etatAgent
            console.log(this.list);
         })
       
        }
        if(this.id==5){
          this.param.etatmagasin().subscribe(res=>{
            this.etatmaga=res;
            this.list= this.etatmaga
            console.log(this.list);
          })
         
        }
        if(this.id==6){
          this.param.etatcaisse().subscribe(res=>{
            this.etatcaiss=res;
            this.list= this.etatcaiss
            console.log(this.list);
          })
         
        }
        if(this.id==7){
          this.param.categorieAgent().subscribe(res=>{
            this.categorie=res;
            this.list= this.categorie
            console.log(this.list);
          })
        
        }
        if(this.id==8){
          this.param.codeerreur().subscribe(res=>{
            this.codeerreur=res;
            this.list= this.codeerreur
            console.log(this.list);
          })
          
        }
        if(this.id==9){
          this.param.EtatWallet().subscribe(res=>{
            this.etatwallet=res;
            this.list= this.etatwallet
            console.log(this.list);
          })
          
        }
        if(this.id==10){
          this.param. EtatLettrage().subscribe(res=>{
            this.etatlettrage=res;
            this.list= this.etatlettrage
            console.log(this.list);
          })
          
        }
        if(this.id==11){
          this.param.EtatReconcilliation().subscribe(res=>{
            this.etatreconsilliation=res;
            this.list= this.etatreconsilliation
            console.log(this.list);
          })
          
        }
        if(this.id==12){
          this.param.EtatTransaction().subscribe(res=>{
            this.etattransaction=res;
            this.list= this.etattransaction
            console.log(this.list);
          })
          
        }
        if(this.id==13){
          this.param.UtilisateurSysteme().subscribe(res=>{
            this.utilisateursys=res;
            this.list= this.utilisateursys
            console.log(this.list);
          })
          
        }
        if(this.id==14){
          this.finance.ListCategoriesEtablissement().subscribe(res=>{
            this.etablissement=res;
            this.list= this.etablissement
            console.log(this.list);
          })
          
        }
        if(this.id==15){
          this.finance.ListCategoriesProduits().subscribe(res=>{
            this.produits_finance=res;
            this.list= this.produits_finance
            console.log(this.list);
          })
          
        }
        if(this.id==16){
          this.finance.CanalPaiement().subscribe(res=>{
            this.canal=res;
            this.list= this.canal
            console.log(this.list);
          })
          
        }
        if(this.id==18){
          this.tpe.getMarque().subscribe(res=>{
            this.marques=res
            this.list= this.marques
            
          })
          
        }
        if(this.id==21){
          this.tpe.ListCategorie().subscribe(res=>{
            this.categories=res
            this.list= this.categories
            
          })
          
        }
        if(this.id==22){
          this.tpe.ListOs().subscribe(res=>{
            this.os=res
            this.list= this.os
            
          })
          
        }
        if(this.id==20){
          this.tpe. getProprietaire().subscribe(res=>{
            this.proprietaires=res
            this.list= this.proprietaires
            
          })
          
        }
        if(this.id==23){
          this.tpe.ListEtatTpe().subscribe(res=>{
            this.Etattpe=res
            this.list= this.Etattpe
            
          })
          
        }
        if(this.id==19){
          this.tpe.getModel().subscribe(res=>{
            this.models=res
            this.list= this.models
            
          })
          
        }
   }
//    ngOnChanges(changes: SimpleChanges) {
        
//     this.ngOnInit();
//     // You can also use categoryId.previousValue and 
//     // categoryId.firstChange for comparing old and new values
    
// }
Mini()
  {
  
  this.openPop=false
  this.isOpened=false ;
  this.dialogRef.updatePosition({
  top:'850px',
  right: '20px',
  })
  this.dialogRef.updateSize("600px", "auto");
  this.isOpened2=false ;
  }
  
  Maxi()
  { this.openPop=false
  this.isOpened2=true;
  console.log(this.isOpened2)
  this.dialogRef.updatePosition({
  
  })
  this.dialogRef.updateSize("600px", "auto");
  this.isOpened=true;
  }
Default(){
  console.log(this.list)
  
    for(var i=0;i<this.list.length;i++){
      this.list[i].libelle=this.list[i].libelleDefaut
      this.list[i].designation=this.list[i].libelleDefaut
      this.list[i].nomUtilisateur=this.list[i].nomUtilisateurDefaut
      this.list[i].designation=this.list[i].designationDefaut
      // console.log(this.list[i].libelleDefaut)
    }
    console.log(this.list)
}

geterrordesig(){
  return this.mrqform.get('designation').hasError('required') ?  'Champ obligatoire':
  this.mrqform.get('designation').hasError('pattern') ? 'invalid! que des lettres ' : '';
}
geterrordesigmodel(){
  return this.modlform.get('designation').hasError('required') ?  'Champ Obligatoire' :
  this.modlform.get('designation').hasError('pattern') ? ' que des lettres et des chiffres' : '';
}
geterronb(){
  return this.modlform.get('nombreCaractereNumeroSerie').hasError('required') ? 'Champ Obligatoire' :
  this.modlform.get('nombreCaractereNumeroSerie').hasError('pattern') ? 'que des chiffres supérieur à zéro' :''; 
  
}
geterrnumserie(){
  return this.modlform.get('formatNumeroSerie').hasError('required') ? 'Champ Obligatoire' :
  this.modlform.get('formatNumeroSerie').hasError('pattern') ? 'que des chiffres et des lettres' :''; 
  
}
geterrfrai(){
  return this.modlform.get('fraisLocationMensuel').hasError('required') ? 'Champ Obligatoire' :
  this.modlform.get('fraisLocationMensuel').hasError('pattern') ? ' que des chiffres' :''; 
  
}
add(){
  if(this.id==18){
    if(this.mrqform.invalid){
      this.mrqform.get('designation').markAllAsTouched()
      this.mrqform.get('commentaire').markAllAsTouched()
     
      
    }
    if(this.mrqform.valid){
     this.list.push(this.mrqform.value)
  
    this.newlist.push(this.mrqform.value)
    //  this.nact=this.mrqform.value
   
    
    
    console.log(this.newlist)
    }
    this.mrqform.get('designation').reset()
        this.mrqform.get('commentaire').reset()
       
   
  }
  if(this.id==19){
    if(this.modlform.invalid){
      this.modlform.get('designation').markAllAsTouched()
      this.modlform.get('idMarqueTpe').markAllAsTouched()
      this.modlform.get('idCategorieTpe').markAllAsTouched()
      this.modlform.get('idOsTpe').markAllAsTouched()
      this.modlform.get('nombreCaractereNumeroSerie').markAllAsTouched()
      this.modlform.get('formatNumeroSerie').markAllAsTouched()
      this.modlform.get('fraisLocationMensuel').markAllAsTouched()
      
    }
    if(this.modlform.valid){
     this.list.push(this.modlform.value)
  console.log(this.list)
    this.newlist.push(this.modlform.value)
    //  this.nact=this.mrqform.value
   
    
    
    console.log(this.newlist)
    }
    this.modlform.get('designation').reset()
        this.modlform.get('idMarqueTpe').reset()
        this.modlform.get('idOsTpe').reset()
        this.modlform.get('idCategorieTpe').reset()
        this.modlform.get('nombreCaractereNumeroSerie').reset()
        this.modlform.get('formatNumeroSerie').reset()
        this.modlform.get('fraisLocationMensuel').reset()
  }
}

seuilformatnumserie(event){
 
  // console.log('erreur seuil '+this.nb)
  // console.log(this.formatserie)
 
  let longeur=Number(this.nb)
  // console.log(longeur)
  if(this.formatserie!='' && this.formatserie.length==longeur){
this.errnbr=false
  }
  else{
    this.errnbr=true
    this.formatserie=''
  }
}
Updatfrais(){
    
  if( this.frai!= undefined && this.frai != ''){
    if (this.frai.indexOf('TND') == -1&& this.frai.indexOf(',') == -1){
      this.frai=this.format.transform(this.frai);
      console.log(this.frai)
  }
}
}
nombrecaractere(event){
  let longeur=Number( this.formatserie)
  if(this.formatserie!='' && this.nb.length==longeur){
    this.errnbr=false
      }
      else{
        this.errnbr=true
        this.formatserie=''
      }
}

modifnombrecaract(event){

  for(var i=0;i<this.list.length;i++){
    let longeur=Number( this.list[i].nombreCaractereNumeroSerie)
    console.log(longeur)
    if(this.list[i].formatNumeroSerie!='' && this.list[i].nombreCaractereNumeroSerie.length==longeur){
      this.errnbr=false
        }
        else{
          this.errnbr=true
          this.list[i].formatNumeroSerie=''
          
        }
  }
 
}
modifformatnumserie(event){
 
  // console.log('erreur seuil '+this.nb)
  // console.log(this.formatserie)
  for(var i=0;i<this.list.length;i++){
  let longeur=Number(this.list[i].nombreCaractereNumeroSerie)
  // console.log(longeur)
  if(this.list[i].formatNumeroSerie!='' && this.list[i].formatNumeroSerie.length==longeur){
this.errnbr=false
  }
  else{
    this.errnbr=true
    this.list[i].formatNumeroSerie=''
   
  }
}
}
}
