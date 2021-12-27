import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditProfileComponent>) { }

  ngOnInit() {
  }
  Fermer(){
    this.dialogRef.close();
      }
}
