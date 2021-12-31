import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { PaiementService } from 'app/pages/services/paiement.service';
import { TransactionService } from 'app/pages/services/transaction.service';
import { CaisseAffComponent } from 'app/pages/vente/vente/affiliation/caisse-aff/caisse-aff.component';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { PaiementComponent } from '../paiement.component';

@Component({
  selector: 'app-aff-nok',
  templateUrl: './aff-nok.component.html',
  styleUrls: ['./aff-nok.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AffNokComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  id: any;
  isOpened = true;
  isOpened2 = false;
  aff: any;
  list: any[] = [];
  openPop = true
  row_nbrAff = 8;
  displayedColumnsAff: string[] = ['codemagasin', 'nommagasin', 'Affiliation', 'AffCode'];
  source = new MatTableDataSource<any>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,
    private format: FormatNumberPipe, private toast: ToastrService,
    private translate: TranslateService,
    private dialogRef: MatDialogRef<AffNokComponent>,
    private Paiement: PaiementService) { }

  ngOnInit(): void {

    this.Paiement.listAfNonOk(this.data.id_produit_financier).pipe(take(1)).subscribe((res: any) => {
      this.source = new MatTableDataSource(res);
      console.log(this.data, res);

      this.source.paginator = this.paginator;
      this.source.sort = this.sort;
    })

  }

  Fermer() {
    this.dialogRef.close();
  }

  Mini() {
    this.openPop = false
    this.isOpened = false;
    this.dialogRef.updatePosition({
      top: '850px',
      right: '20px',
    })
    this.dialogRef.updateSize("auto", "auto");
    this.isOpened2 = false;
  }

  Maxi() {
    this.openPop = false
    this.isOpened2 = true;
    console.log(this.isOpened2)
    this.dialogRef.updatePosition({

    })
    this.dialogRef.updateSize("auto", "auto");
    this.isOpened = true;
  }

  onSubmit() {
    this.list = [];
    for (let i = 0; i < this.source.data.length; i++) {
      if (this.source.data[i].affiliationMonetique != undefined) {
        let obj = {
          "idMagasin": this.source.data[i].idmagasin,
          "idMagasinWallet": 0,
          "affiliationMonetique": this.source.data[i].affiliationMonetique,
          "idProduitFinancier": this.data.id_produit_financier
        }
        this.list.push(obj);
      }
    }
    if (this.list.length != 0) {
      this.Paiement.AddUpdateListWalet(this.list).pipe(take(1)).subscribe(res => {
        this.Fermer();
        this.toast.success(this.translate.instant('toast.ajouter'));
      })
    }
    else {
      this.toast.success(this.translate.instant('toast.listAffvide'));

    }
  }

  reset() {
    this.ngOnInit();
  }

  detail(dataAff) {


    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "700px";
    dialogConfig.hasBackdrop = false;
    let data = {
      code: dataAff.codemagasin,
      libelle: dataAff.nommagasin,
      idMagasin: dataAff.idmagasin,

    }
    let item = {
      id_produit_financier: this.data.id_produit_financier,
      affiliation_magasin: dataAff.affiliation_magasin,
      nom_commercial: this.data.etablissement,
      produit_financier: this.data.produitFinancier,

    }
    let obj = { data: data, item: item };
    console.log(obj);

    dialogConfig.data = obj;
    const diag = this.dialog.open(CaisseAffComponent, dialogConfig);

    diag.afterClosed().subscribe(item => {
      if (item == 1) {
        this.ngOnInit();
      }
    })
  }

}
