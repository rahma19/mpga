import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parametre } from 'app/model/mpga/parametre';
import { ParametreService } from 'app/pages/services/parametre.service';

@Component({
  selector: 'app-detail-parametre',
  templateUrl: './detail-parametre.component.html',
  styleUrls: ['./detail-parametre.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailParametreComponent implements OnInit {
  id:any;
  code_param:any;
  type_param:any;
  valeur_param:any;
  description_param:any;
  categ:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef: MatDialogRef<DetailParametreComponent>,private param:ParametreService) { }

  ngOnInit(): void {
    this.id=this.data.data;
    this.param.getparametreById(this.id).subscribe((res:Parametre)=>{
      this.code_param=res.code;
      this.type_param=res.typologie;
      this.valeur_param=res.valeurDefaut;
      this.description_param=res.description;
      this.categ=res.categorie;
    })
  }
  Fermer(){
    this.dialogRef.close();
   }
}
