import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { EtablissementFinancierService } from 'app/pages/services/etablissement_financier.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { PaiementService } from 'app/pages/services/paiement.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-caisse-aff',
  templateUrl: './caisse-aff.component.html',
  styleUrls: ['./caisse-aff.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CaisseAffComponent implements OnInit {

  msg:any;
  err:boolean=false;
  disable:boolean=false;
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  isConnectionAvailableMA: boolean = navigator.onLine; 
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  code:any
  nom:any
  etablifi:any
  produitfin:any
  displayedColumns: string[] = ['libelle','idCaisseEtablissement','affiliation'];
  dataSource = new MatTableDataSource<any>()
  id:any
  caissesaff:any
  idprod:any
  affMagasin:any
  listWalletCaisse=[]
  listWaletCaisseFiltre=[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialogRef: MatDialogRef<CaisseAffComponent> ,private dialog:MatDialog,
    private fb:FormBuilder,private toast: ToastrService,@Inject(MAT_DIALOG_DATA) public data: any,
    private mag:MagasinService, private formUtils: FormUtils,private translate:TranslateService,
    private etabli:EtablissementFinancierService,private paiement:PaiementService) { 
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMA = false
      this.dialogRef.close()
  });
  }

  ngOnInit(): void {
    console.log(this.data);

    
    this.code=this.data.data.code
    this.nom=this.data.data.libelle
   this.etablifi= this.data.item.nom_commercial
    this.produitfin=this.data.item.produit_financier
    this.id=this.data.data.idMagasin
    this.idprod=this.data.item.id_produit_financier
  this.affMagasin=this.data.item.affiliation_magasin
    
    this.mag.ListAffiliationByIdMagasin(this.id,this.idprod).subscribe(res=>{
      this.caissesaff=res
      console.log(this.caissesaff);
      
      this.dataSource = new MatTableDataSource(  this.caissesaff);
      this.dataSource.paginator = this.paginator
     this.dataSource.sort = this.sort;
     this.sort.disableClear = true
    })
  }
  Fermer(){
    this.dialogRef.close();
      }
      Mini(){ 
        this.isOpened=false ;
          this.dialogRef.updatePosition({
            bottom:'15px',
            right: '15px', 
          })
          this.dialogRef.updateSize("350px", "auto");
          this.isOpened2=false ;
        }
        
        Maxi(){ 
          this.isOpened2=true;
          console.log(this.isOpened2)
          this.dialogRef.updatePosition({
            
          })
          this.dialogRef.updateSize("700px", "auto");
          this.isOpened=true;
        }
      onFocus(types: TYPE_MESSAGE[], required: boolean, num?) {
        this.Messages = this.formUtils._getFormControlMessage(types, required, num)
      }
      onBlur() {
        this.Messages = [];
      }
      onError() {
        this.Messages = [this.formUtils._error()];
      }
      markInvalidControls(form): void {
        const controls = form.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            controls[name].markAllAsTouched();
          }
        }
      }
      onSubmit(){



        this.disable=true;
        for(var i=0;i<this.dataSource.data.length;i++){
          let obj={idCaisseWallet:this.dataSource.data[i].idCaisseWallet,
            idCaisse:this.dataSource.data[i].idCaisseEtablissement,
            affiliationMonetique:this.dataSource.data[i].affiliation,
            idProduitFinancier: this.idprod,idCaisseEtablissement:this.dataSource.data[i].idCaisseEtablissement
          }
          this.listWalletCaisse.push(obj);
        }
        for(var j=0;j<this.listWalletCaisse.length;j++){
          if(this.listWalletCaisse[j].affiliationMonetique!= null){
            this.listWaletCaisseFiltre.push(this.listWalletCaisse[j])
          }
        
        }
        let obj2= this.listWaletCaisseFiltre
     
        console.log("xx", this.listWaletCaisseFiltre);
        
        
        this.paiement.AddUpdateListWaletCaisse(obj2).subscribe(res=>{
          this.dialogRef.close('1');
          this.toast.success(this.translate.instant('toast.modifier') );
        },err=>{
          this.disable=false;
                  this.err=true;
            if(err.status==400){
              this.msg=this.translate.instant('toast.echec');
           console.log(err);
            }
        })
        
      }
      reset(){
        this.mag.ListAffiliationByIdMagasin(this.id,this.idprod).subscribe(res=>{
          this.caissesaff=res
          this.dataSource = new MatTableDataSource(  this.caissesaff);
          this.dataSource.paginator = this.paginator
         this.dataSource.sort = this.sort;
         this.sort.disableClear = true
        })
      }
}
