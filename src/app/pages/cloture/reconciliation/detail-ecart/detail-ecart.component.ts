import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { ClotureService } from 'app/pages/services/cloture.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService } from 'app/pages/services/pagination.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-detail-ecart',
  templateUrl: './detail-ecart.component.html',
  styleUrls: ['./detail-ecart.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DetailEcartComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  codemagasin: any;
  vcn: any;
  refmpga: any;
  autorisation: any;
  montant: any;
  date: any;
  ecart: any;
  dateform: any;
  id: any;
  resultat: any;
  source: any;
  loading: boolean = false;
  isOpened = true;
  isOpened2 = false;
  openPop = true
  row_nbr = 10;
  displayedColumnsEcarts: string[] = ['date', 'codeMagasin', 'vcn', 'refmpga', 'autorisation', 'montant', 'typeAnomalie', 'ecart'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pageService: PaginationService,
    private closerv: ClotureService, private format: FormatNumberPipe, private dialogRef: MatDialogRef<DetailEcartComponent>) { }

  ngOnInit() {
    this.id = this.data.idClotureJournee;
    this.loading = true;
    this.closerv.ecartbyId(this.id).subscribe((res: any) => {
      console.log(res);
      this.resultat = res;
      this.loading = false;
      if (this.resultat.length != 0) {
        this.date = res[0].date;
        this.date = moment(this.date).format("DD-MM-YYYY");
        for (var i = 0; i < res.length; i++) {
          res[i].date = moment(res[i].date).format('DD/MM/YYYY HH:mm');
          res[i].montant = this.format.transform(res[i].montant);
        }
        this.source = new MatTableDataSource(res);
        this.source.paginator = this.paginator;
        this.source.sort = this.sort;

      }
    }, err => {
      this.loading = false;
    })
  }

  Fermer() {
    this.dialogRef.close();
  }

  getrow_nbr() {
    setTimeout(() => this.pageService.getrow_nbr(this.source, this.paginator, this.sort, this.row_nbr))
  }

  Mini() {
    this.openPop = false
    this.isOpened = false;
    this.dialogRef.updatePosition({
      top: '850px',
      right: '20px',
    })
    this.dialogRef.updateSize("600px", "auto");
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
