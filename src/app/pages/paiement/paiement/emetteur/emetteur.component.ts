import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailEmetteurComponent } from './detail-emetteur/detail-emetteur.component';

@Component({
  selector: 'app-emetteur',
  templateUrl: './emetteur.component.html',
  styleUrls: ['./emetteur.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmetteurComponent implements OnInit {
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  nom:any
  objectdata=[{nomproduit:"produit1",canal:"canal1",qr:"rrrtrtrrt",bin:null,acquereur:"acquéreur1",etat:true},
  {nomproduit:"produit2",canal:"canal2",qr:null,bin:'bbbbbb',acquereur:"acquéreur2",etat:false}]
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private dialogRef:MatDialogRef<EmetteurComponent>,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.nom=this.data.nomCommercial

  }
  Fermer(){
    this.dialogRef.close()
  }
  Mini()
  {
  
  this.openPop=false
  this.isOpened=false ;
  this.dialogRef.updatePosition({
  top:'850px',
  right: '20px',
  })
  this.dialogRef.updateSize("800px", "auto");
  this.isOpened2=false ;
  }
  
  Maxi()
  { this.openPop=false
  this.isOpened2=true;
  console.log(this.isOpened2)
  this.dialogRef.updatePosition({
  
  })
  this.dialogRef.updateSize("800px", "550px");
  this.isOpened=true;
  }

  affichcecontenu(data:any){
    console.log(data)
    const dialogConfig= new MatDialogConfig;
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="800px";
      dialogConfig.height="550px";
      dialogConfig.maxHeight="550px"
      dialogConfig.hasBackdrop=false
    dialogConfig.data=data
     this.dialog.open(DetailEmetteurComponent,dialogConfig);
    
      
    
      }
}
