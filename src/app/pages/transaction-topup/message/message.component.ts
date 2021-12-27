import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {
aff:any;
isConnectionAvailableMsg: boolean = navigator.onLine; 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<MessageComponent>) {
      window.addEventListener('offline', () => {
      this.isConnectionAvailableMsg = false
      this.dialogRef.close()
  });
   }

  ngOnInit() {
    this.aff=this.data;
  }
  Fermer(){
    this.dialogRef.close();
   }
}
