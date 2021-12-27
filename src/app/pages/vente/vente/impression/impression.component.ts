import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MagasinService } from 'app/pages/services/magasin.service';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { DetailMagasin } from 'app/model/mpga/detailmagasin';
import { TransactionService } from 'app/pages/services/transaction.service';


@Component({
  selector: 'app-impression',
  templateUrl: './impression.component.html',
  styleUrls: ['./impression.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ImpressionComponent implements OnInit {
  id:any;
//   gouvernorat:any;
// ville:any;

// code:any;
// etatMagsin:any;
// libelle:any;
// nombreCaisse:any;
// responsablemagasin:any;
// zoneGeographique:any;
resultat:any;
agents:any;
// rue:any;
// tel:any;
// fax:any;
// email:any;
detailmag= new DetailMagasin
parametres:any
adresse:any
ville:any
code:any
tel:any
rne:any
idmg=3
val=''
cheminImage:any = "../assets/aziza.png";
currentDate = new Date();
message:any;
  @ViewChild("printSection") printSectionRef: ElementRef;
  constructor(private changeDetector: ChangeDetectorRef,@Inject(MAT_DIALOG_DATA) public data:any,private transaction:TransactionService,private mag:MagasinService,private dialog:MatDialog, private format:FormatNumberPipe,private dialogRef: MatDialogRef<ImpressionComponent>) { }

  ngOnInit() {
    
    
    this.id=this.data.data;
    this. transaction.getParametre(this.idmg).subscribe(resultat=>{
      this.parametres=resultat
     // console.log(this.parametres)
      for(var i=0; i<this.parametres.length;i++){
       this.adresse=this.parametres[0].valeurDefaut
       this.ville=this.parametres[1].valeurDefaut
       this.code=this.parametres[2].valeurDefaut
       this.tel=this.parametres[3].valeurDefaut
       this.rne=this.parametres[4].valeurDefaut
      }
    })

    
    this.mag.getmagasinbyId(this.id).subscribe((res:DetailMagasin)=>{
     
      this.detailmag.code=res.code;
      this.detailmag.etatMagsin=res.etatMagsin;
      this.detailmag.libelle=res.libelle;
      this.detailmag.gouvernorat=res.gouvernorat;
      this.detailmag.ville=res.ville;
      this.detailmag.nombreCaisse=res.nombreCaisse;
      this.detailmag.zoneGeographique=res.zoneGeographique;
      this.detailmag.rue=res.rue;
      this.detailmag.fax=res.fax;
      this.detailmag.telephone=res.telephone;
      this.detailmag.email=res.email;
     // console.log(this.detailmag)
    })
    this.mag.listecaissebymagasin(this.id).subscribe((res:any)=>{
      this.resultat=res;
     // console.log('liste caisse  ',this.resultat);
    })
    this.mag.listeagentBymagasin(this.id).subscribe(res=>{
      this.agents=res;
     // console.log('liste agent  ',this.agents);
    })
  
  }
  OnPrint(data){
    // this.detailmag=data
    // window.print();
    // this.dialogRef.close();
  }
  OnClose(){
    this.dialogRef.close();
  }
// Impression(data){
 
//   this.detailmag= data
//   this.changeDetector.detectChanges(); // Trigger change detection
//   let printContents, popupWin;
//   if (this.printSectionRef && this.printSectionRef.nativeElement){
//     printContents = this.printSectionRef.nativeElement.innerHTML;
  
  
//   }
  
  
//  }

// Impression(data) {
//   this.detailmag=data
//   console.log(data)
//   let printContents = document.getElementById("detmagasinprint").innerHTML;
//   document.write(printContents);
//   // let originalContents = document.getElementById("affichmagasin").innerHTML;

//   // document.body.innerHTML = printContents;

//   window.print();
// //  document.getElementById("affichmagasin").innerHTML = originalContents;
 
// }



printrow(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
 
  popupWin.document.write(`
  <html>
       <head>
         
          <style>
    
@media print{
    #pass{

         margin-right: 10px;
        font-size: 20px;
     }
     #bdgmagasinprint{
        background-color:rgb(179, 180, 180)!important;
         margin-left: 40%;
         color: black !important;
     }
     #espleft{
         
         margin-left: 10px;
         margin-right: 10px;
         font-weight: bold;
         font-size: 20px;
     }
     #detailmagasin{
        
        width: 99% !important;
        margin: auto;
        margin-top: 50px;
     }
    //  #detailmagasin >h5{
    //     font-family: cursive;
    //  }
     #tablemagasin{
        border: solid 1.5px;
        width: 90%;
      
        margin-left: 5%;
        margin-top: 3%;
        margin-bottom: 7%;
        border-color: rgb(55, 63, 31);
    }
    #tablemagasin thead>tr>th,#tablemagasin tbody>tr>td{
        border: solid 1px;
        border-color: rgb(35, 154, 175);
       
        padding-left: 5px !important;
      
    }
    
    #botlogmag{
        height: 150px;
      }
    
     
      #botlabamag{
        font-size: 20px;
        
          }
          #botdateprintmag{
            text-align: right;
          }
          #titmag{
              margin-left: 10px;
          }
          #botlabadressvilmg{
            font-size: 20px;
         padding-left: 10px;
          }
      
    
}
          </style>
        </head>
        <body> <img id="botlogmag" [src]="cheminImage" alt="logo" class="col-3"/> ${printContents}</body>
      
        
  </html>`
  );
  
   popupWin.print();
  // popupWin.document.close();
 popupWin.close()
 this.dialogRef.close()
}





}

