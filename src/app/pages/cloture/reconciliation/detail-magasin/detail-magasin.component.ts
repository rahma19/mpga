import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClotureService } from 'app/pages/services/cloture.service';
import { PaginationService } from 'app/pages/services/pagination.service';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-magasin',
  templateUrl: './detail-magasin.component.html',
  styleUrls: ['./detail-magasin.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DetailMagasinComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  loading: boolean = false;
  id: any;
  date: any;
  source: any;
  isOpened = true;
  isOpened2 = false;
  openPop = true
  row_nbr = 10;
  displayedColumnsMagasin: string[] = ['codeMagasin', 'libelleMagasin', 'vcn', 'motif'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pageService: PaginationService, private closerv: ClotureService, private dialogRef: MatDialogRef<DetailMagasinComponent>) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.date = this.data.date;
    this.date = moment(this.date).format("DD-MM-YYYY");
    this.loading = true;
    this.closerv.magasinByIdrecon(this.id).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.source = new MatTableDataSource(res);
      this.source.paginator = this.paginator;
      this.source.sort = this.sort;

    }, err => {
      this.loading = false;
    })
  }

  getrow_nbr() {
    setTimeout(() => this.pageService.getrow_nbr(this.source, this.paginator, this.sort, this.row_nbr))
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
    this.dialogRef.updateSize("650px", "auto");
    this.isOpened2 = false;
  }

  Maxi() {
    this.openPop = false
    this.isOpened2 = true;
    console.log(this.isOpened2)
    this.dialogRef.updatePosition({
    })
    this.dialogRef.updateSize("650px", "550px");
    this.isOpened = true;
  }

}
