import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClotureService } from 'app/pages/services/cloture.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-cloture-manuel',
  templateUrl: './cloture-manuel.component.html',
  styleUrls: ['./cloture-manuel.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ClotureManuelComponent implements OnInit {
  date: any;
  observ: any;
  loading = false;
  isOpened = true;
  isOpened2 = false;
  openPop = true

  constructor(private closerv: ClotureService, private dialogRef: MatDialogRef<ClotureManuelComponent>, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  Fermer() {
    this.dialogRef.close(0);
  }

  onSubmit(Date, observ) {
    const jour = moment(this.date).format("YYYY/MM/DD");
    // this.loading = true;
    this.dialogRef.close();
    this.closerv.cloturemanuel(jour, observ).subscribe(res => {
      //  this.loading = false;
      this.toast.success("Réconciliation manuelle a étè terminé avec succes", "", { timeOut: 10000 });
    }, err => {
      this.toast.error("ERREUR", "", { timeOut: 5000 });
    })
  }

  Mini() {
    this.openPop = false
    this.isOpened = false;
    this.dialogRef.updatePosition({
      top: '850px',
      right: '20px',
    })
    this.dialogRef.updateSize("500px", "auto");
    this.isOpened2 = false;
  }

  Maxi() {
    this.openPop = false
    this.isOpened2 = true;
    console.log(this.isOpened2)
    this.dialogRef.updatePosition({
    })
    this.dialogRef.updateSize("500px", "200px");
    this.isOpened = true;
  }

}
