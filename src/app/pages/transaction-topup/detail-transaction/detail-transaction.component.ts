import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private format: FormatNumberPipe,
    private dialogRef: MatDialogRef<DetailTransactionComponent>,
    private transaService: TransactionService) { }

  ngOnInit(): void {
    this.id = this.data.idTransaction;
    this.loading = true;
    this.transaService.getTransactionById(this.id).pipe(take(1)).subscribe((res: any) => {
      console.log(res);
      this.date = moment(res.dateTransaction).format("DD-MM-YYYY");
      this.montant = this.format.transform(res.montant);
      this.refMPGA = res.refMpga;
      this.etatTransaction = res.etatTransaction;
      this.libelleMagasin = res.libelleMagasin;
      this.etab = res.libelleEtablissementFinancier;
      this.libelleWallet = res.libelleWallet;
      this.codeCaisse = res.codeCaisse;
      this.autorisation = res.autorisation;
      this.etatLettrage = res.etatLettrage;
      this.etatReconciliation = res.etatReconciliation;
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
