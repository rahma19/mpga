import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-commentaire',
  templateUrl: './detail-commentaire.component.html',
  styleUrls: ['./detail-commentaire.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailCommentaireComponent implements OnInit {
libelle:any
commentaire:any
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<DetailCommentaireComponent>) { }

  ngOnInit(): void {
    // console.log(this.data)
    this.libelle=this.data.designation
    this.commentaire=this.data.commentaire
  }
  Fermer(){
    this.dialogRef.close()
  }
}
