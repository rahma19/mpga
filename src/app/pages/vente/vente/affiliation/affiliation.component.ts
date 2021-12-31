import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { EtablissementFinancierService } from 'app/pages/services/etablissement_financier.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { PaiementService } from 'app/pages/services/paiement.service';
import { FormMessage, FormUtils, TYPE_MESSAGE } from 'app/pages/shared/forms.utils';
import { ToastrService } from 'ngx-toastr';
import { DatailCanalComponent } from '../update-vente/datail-canal/datail-canal.component';
import { CaisseAffComponent } from './caisse-aff/caisse-aff.component';

@Component({
  selector: 'app-affiliation',
  templateUrl: './affiliation.component.html',
  styleUrls: ['./affiliation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AffiliationComponent implements OnInit {
  msg: any;
  err: boolean = false;
  disable: boolean = false;
  public Type_Message = TYPE_MESSAGE;
  Messages: FormMessage[]
  isConnectionAvailableMA: boolean = navigator.onLine;
  isOpened = true;
  isOpened2 = false;
  openPop = true
  code: any
  nom: any
  id: any
  idFinancier: any
  etalissementMagasin: any
  listWallet = []
  listWaletFiltre = []
  displayedColumns: string[] = ['nom_commercial', 'produit_financier', 'affiliation_magasin', 'etat_affilation_caisse', 'listCanalPaiement'];
  dataSource = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialogRef: MatDialogRef<AffiliationComponent>, private dialog: MatDialog,
    private fb: FormBuilder, private toast: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any,
    private mag: MagasinService, private formUtils: FormUtils, private translate: TranslateService,
    private Etabli: EtablissementFinancierService, private paiement: PaiementService) {
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMA = false
      this.dialogRef.close()
    });
  }

  ngOnInit(): void {


    this.code = this.data.code
    this.nom = this.data.libelle
    this.id = this.data.idMagasin
    this.idFinancier = this.data.id_produit_financier


    this.Etabli.ListEtatblissementByIdMagasin(this.id).subscribe(res => {
      this.etalissementMagasin = res
      console.log(res);

      this.dataSource = new MatTableDataSource(this.etalissementMagasin);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true
    })
  }
  Fermer() {
    this.dialogRef.close();
  }
  Mini() {
    this.isOpened = false;
    this.dialogRef.updatePosition({
      bottom: '15px',
      right: '15px',
    })
    this.dialogRef.updateSize("350px", "auto");
    this.isOpened2 = false;
  }

  Maxi() {
    this.isOpened2 = true;
    console.log(this.isOpened2)
    this.dialogRef.updatePosition({

    })
    this.dialogRef.updateSize("850px", "auto");
    this.isOpened = true;
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
  onSubmit() {


    this.disable = true;
    for (var i = 0; i < this.dataSource.data.length; i++) {
      let obj = {
        idMagasin: this.id,
        idMagasinWallet: this.dataSource.data[i].id_magasin_wallet,
        affiliationMonetique: this.dataSource.data[i].affiliation_magasin,
        idProduitFinancier: this.dataSource.data[i].id_produit_financier
      }
      this.listWallet.push(obj);
    }



    for (var j = 0; j < this.listWallet.length; j++) {
      if (this.listWallet[j].affiliationMonetique != null) {
        this.listWaletFiltre.push(this.listWallet[j])
      }

    }
    let obj2 = this.listWaletFiltre
    // console.log("rr",obj2);

    this.paiement.AddUpdateListWalet(obj2).subscribe(res => {
      this.dialogRef.close('1');
      this.toast.success(this.translate.instant('toast.modifier'));
    }, err => {
      this.disable = false;
      this.err = true;
      if (err.status == 400) {
        this.msg = this.translate.instant('toast.echec');
        console.log(err);
      }
    })


  }
  reset() {
    this.Etabli.ListEtatblissementByIdMagasin(this.id).subscribe(res => {
      this.etalissementMagasin = res
      this.dataSource = new MatTableDataSource(this.etalissementMagasin);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true
    })
  }
  detail(item) {


    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "700px";
    dialogConfig.hasBackdrop = false;
    let obj = { data: this.data, item: item };
    dialogConfig.data = obj;
    const diag = this.dialog.open(CaisseAffComponent, dialogConfig);

    diag.afterClosed().subscribe(item => {
      if (item == 1) {
        this.ngOnInit();
      }
    })
  }
  changeaffiche(etat: boolean) {
    if (etat == true) { return this.translate.instant('affiliation.column6'); }
    else {
      return this.translate.instant('affiliation.column5');
    }
  }
  

  detailCanal(item){


    const dialogConfig= new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="700px";
     dialogConfig.hasBackdrop = false;
     let obj={data:this.data,item:item};
    dialogConfig.data=obj;
  const diag=  this.dialog.open( DatailCanalComponent,dialogConfig);
  
    diag.afterClosed().subscribe(item => {
      if(item==1){
        this.ngOnInit();
     }
    })
  }
}
