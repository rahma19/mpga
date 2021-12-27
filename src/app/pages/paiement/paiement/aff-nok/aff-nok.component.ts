import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { PaiementService } from 'app/pages/services/paiement.service';
import { TransactionService } from 'app/pages/services/transaction.service';
import moment from 'moment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-aff-nok',
  templateUrl: './aff-nok.component.html',
  styleUrls: ['./aff-nok.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AffNokComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  id: any;
  isOpened = true;
  isOpened2 = false;
  openPop = true
  loading = false;
  check = false;
  row_nbrAff = 10;
  displayedColumnsAff: string[] = ['codemagasin', 'nommagasin', 'Affiliation'];
  source = new MatTableDataSource<any>();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private format: FormatNumberPipe,
    private dialogRef: MatDialogRef<AffNokComponent>,
    private Paiement: PaiementService) { }

  ngOnInit(): void {

    this.loading = true;
    this.Paiement.listAfNonOk(this.data.idProduitFinancier).pipe(take(1)).subscribe((res: any) => {
      this.source = new MatTableDataSource(res);
      this.source.paginator = this.paginator;
      this.source.sort = this.sort;
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

  show() {
    this.check = !this.check;
  }

  submit(row) {
    console.log(row);

    console.log(this.source.filteredData);

  }
}
