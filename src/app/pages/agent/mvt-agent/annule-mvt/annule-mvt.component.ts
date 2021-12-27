import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgentService } from 'app/pages/services/agent.service';

@Component({
  selector: 'app-annule-mvt',
  templateUrl: './annule-mvt.component.html',
  styleUrls: ['./annule-mvt.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AnnuleMvtComponent implements OnInit {
idMvt:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialog:MatDialog,private agent:AgentService,private dialogRef: MatDialogRef<AnnuleMvtComponent>) { }

  ngOnInit(): void {
    this.idMvt=this.data.data;
  }
  Fermer(){
    this.dialogRef.close();
   }
   changer(){
    var obj={idMouvementAgent:this.idMvt};
    this.agent.annulerMvt(obj).subscribe(res=>{
      this.dialogRef.close('1');
     }, err => {
        this.dialogRef.close('0');
    })
    }
}
