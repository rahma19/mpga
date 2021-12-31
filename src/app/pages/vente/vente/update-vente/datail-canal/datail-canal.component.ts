import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { EtablissementFinancierService } from 'app/pages/services/etablissement_financier.service';

@Component({
  selector: 'app-datail-canal',
  templateUrl: './datail-canal.component.html',
  styleUrls: ['./datail-canal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatailCanalComponent implements OnInit {
  isConnectionAvailableMA: boolean = navigator.onLine;
  isOpened = true;
  isOpened2 = false;
  id: any
  cannaux: any
  code: any
  nom: any
  etablifi: any
  produitfin: any
  affMagasin: any
  constructor(private dialogRef: MatDialogRef<DatailCanalComponent>, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private translate: TranslateService, private Etabli: EtablissementFinancierService) {
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMA = false
      this.dialogRef.close()
    });
  }

  ngOnInit(): void {
    console.log(this.data);


    if (this.data.item.idWallet != undefined) {
      this.id = this.data.item.idWallet
      this.etablifi = this.data.item.etablissemnt
      this.produitfin = this.data.item.nomWallet
      this.affMagasin = this.data.item.affiliationMonetique
      this.code = this.data.data.code
      this.nom = this.data.data.libelle
    }
    if (this.data.item.id_produit_financier != undefined) {
      this.id = this.data.item.id_produit_financier
      this.etablifi = this.data.item.nom_commercial
      this.produitfin = this.data.item.produit_financier
      this.affMagasin = this.data.item.affiliation_magasin
      this.code = this.data.data.code
      this.nom = this.data.data.libelle
    }
    console.log(this.id);

    this.Etabli.ListCanalByProduit(this.id).subscribe(res => {
      this.cannaux = res
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
    this.dialogRef.updateSize("700px", "auto");
    this.isOpened = true;
  }
}
