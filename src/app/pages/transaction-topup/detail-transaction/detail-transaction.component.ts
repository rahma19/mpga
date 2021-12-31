import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { TransactionService } from 'app/pages/services/transaction.service';
import moment from 'moment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail-transaction',
  templateUrl: './detail-transaction.component.html',
  styleUrls: ['./detail-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailTransactionComponent implements OnInit {
  id: any;
  isOpened = true;
  isOpened2 = false;
  openPop = true
  loading = false;
  date: string;
  montant: string;
  refMPGA: any;
  etatTransaction: any;
  libelleMagasin: any;
  libelleWallet: any;
  etab: any;
  codeCaisse: any;
  autorisation: any;
  etatReconciliation: any;
  etatLettrage: any;
  numTicket: any;
  caisse: any;
  canalPai: any;
  couleurEtatTransaction: any;
  couleurEtatReconciliation: any;
  couleurEtatLettrage: any;
  dateRec: any;
  dateLet: any;
  displayedColumnsHistoriques: string[] = ['etatTransaction', 'dateHistorique', 'user'];
  source: any[] = [];
  row_nbr = 10;
  idEtatTransaction: any;
  motifErreur: any;
  codeErreur: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private format: FormatNumberPipe, private translate: TranslateService,
    private dialogRef: MatDialogRef<DetailTransactionComponent>,
    private transaService: TransactionService) { }

  ngOnInit(): void {
    this.id = this.data.idTransaction;
    this.loading = true;
    this.transaService.getTransactionById(this.id).pipe(take(1)).subscribe((res: any) => {
      console.log(res);
      this.date = moment(res.dateTransaction).format("DD-MM-YYYY HH:mm");
      this.dateRec = moment(res.dateReconciliation).format("DD-MM-YYYY HH:mm");
      this.dateLet = moment(res.dateLettrage).format("DD-MM-YYYY HH:mm");
      this.montant = this.format.transform(res.montant);
      this.refMPGA = res.refMpga;
      this.codeErreur = res.codeErreur;
      this.motifErreur = res.motifErreur;
      this.etatTransaction = res.etatTransaction;
      this.couleurEtatTransaction = res.couleurEtatTransaction;
      this.idEtatTransaction = res.idEtatTransaction;
      this.libelleMagasin = res.libelleMagasin;
      this.etab = res.libelleEtablissementFinancier;
      this.libelleWallet = res.libelleWallet;
      this.codeCaisse = res.codeCaisse;
      this.numTicket = res.numeroTicket;
      this.canalPai = res.canalPaiement;
      this.caisse = res.libelleCaissier;
      this.autorisation = res.autorisation;
      this.etatLettrage = res.etatLettrage;
      this.couleurEtatLettrage = res.couleurEtatLettrage;
      this.couleurEtatReconciliation = res.couleurEtatReconciliation;
      this.etatReconciliation = res.etatReconciliation;
      for (var i = 0; i < res.listHistoriques.length; i++) {
        res.listHistoriques[i].dateHistorique = moment(res.listHistoriques[i].dateHistorique).format('DD/MM/YYYY HH:mm:ss');
        if (res.listHistoriques[i].idEtatReconciliation == '2') { this.etatReconciliation = this.translate.instant('transaction.column_Oui'); } else { this.etatReconciliation = this.translate.instant('transaction.column_Non'); }
        if (res.listHistoriques[i].idEtatLettrage == '2') { this.etatLettrage = this.translate.instant('transaction.column_Oui'); } else { this.etatLettrage = this.translate.instant('transaction.column_Non'); }

      }
      this.source = res.listHistoriques

      this.loading = false;
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

}
