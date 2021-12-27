import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-errormsg',
  templateUrl: './errormsg.component.html',
  styleUrls: ['./errormsg.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ErrormsgComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ErrormsgComponent>) { }

  ngOnInit() {
  }
  Fermer(){
    this.dialogRef.close();
   }
}
