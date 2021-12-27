import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parametre } from 'app/model/mpga/parametre';
import { ParametreService } from 'app/pages/services/parametre.service';

@Component({
  selector: 'app-update-parametre',
  templateUrl: './update-parametre.component.html',
  styleUrls: ['./update-parametre.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateParametreComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<UpdateParametreComponent>,private fb:FormBuilder,private param:ParametreService) { }

  ngOnInit(): void {
  }
  changer(){
      this.dialogRef.close(1);
    
  }
  Fermer(){
    this.dialogRef.close();
    }
}
