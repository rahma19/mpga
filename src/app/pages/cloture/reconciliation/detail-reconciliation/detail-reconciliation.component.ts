import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { ClotureService } from 'app/pages/services/cloture.service';
import { DetailEcart } from 'app/model/mpga/detailecart';
import * as moment from 'moment';

import { DetailEcartComponent } from '../detail-ecart/detail-ecart.component';
import { DetailMagasinComponent } from '../detail-magasin/detail-magasin.component';
import { Reconciliation } from 'app/model/mpga/reconciliation';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginationService } from 'app/pages/services/pagination.service';

@Component({
  selector: 'app-detail-reconciliation',
  templateUrl: './detail-reconciliation.component.html',
  styleUrls: ['./detail-reconciliation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailReconciliationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id: any;
  etat: string;
  mag: any;
  magActif: any;
  magRecon: any;
  magEcart: any;
  date: any;
  ecart: any;
  magNonrecon: any;
  row_nbr = 18;
  nbTran: any;
  MontantTran: any;
  settings: any;
  source: any;
  loading: boolean = false;
  isOpened = true;
  isOpened2 = false;
  openPop = true
  displayedColumnsHistoriques: string[] = ['dateHistorique', 'typeClotureJournee', 'nombreMagasinEcart', 'nombreMagasinNonReconcilie', 'motifReconciliation', 'user'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pageService: PaginationService,
    private dialog: MatDialog, private closerv: ClotureService, private format: FormatNumberPipe, private dialogRef: MatDialogRef<DetailReconciliationComponent>) { }

  ngOnInit() {
    this.id = this.data.idClotureJournee;
    this.loading = true;
    this.closerv.reconById(this.id).subscribe((res: Reconciliation) => {
      this.loading = false;
      this.date = moment(res.dateCloture).format("DD-MM-YYYY");
      this.etat = res.etatCloture;
      this.mag = res.nombreMagasin;
      this.magActif = res.nombreMagasinActif;
      this.magRecon = res.nombreMagasinReconcilie;
      this.nbTran = res.nombreTransactionReconcilie;
      this.MontantTran = this.format.transform(res.montantTransactionReconcilie);
      this.magNonrecon = res.nombreMagasinNonReconcilie;
      this.magEcart = res.nombreMagasinAyantEcart;
      this.ecart = res.nombreEcart;
      for (var i = 0; i < res.historiqueClotureJournee.length; i++) {
        res.historiqueClotureJournee[i].dateHistorique = moment(res.historiqueClotureJournee[i].dateHistorique).format('DD/MM/YYYY HH:mm');
      }
      this.source = new MatTableDataSource(res.historiqueClotureJournee);
      this.source.paginator = this.paginator;

    }, err => {
      this.loading = false;
    })
  }

  getrow_nbr() {
    setTimeout(() => this.pageService.getrow_nbr(this.source, this.paginator, this.sort, this.row_nbr))
  }

  detail() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "600px";
    dialogConfig.width = "auto";
    dialogConfig.height = "auto";
    dialogConfig.maxHeight = "95vh",
      dialogConfig.data = this.data;
    this.dialog.open(DetailEcartComponent, dialogConfig);
  }

  detailmag() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    dialogConfig.minWidth = "600px";
    dialogConfig.height = "auto";
    dialogConfig.minHeight = "550px";
    dialogConfig.maxHeight = "95vh";
    dialogConfig.hasBackdrop = false;
    let data = {
      id: this.id,
      date: this.date
    }
    dialogConfig.data = data;
    this.dialog.open(DetailMagasinComponent, dialogConfig);
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

}
