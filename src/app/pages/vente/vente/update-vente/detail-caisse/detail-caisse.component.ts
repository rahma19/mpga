import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { EtablissementFinancierService } from 'app/pages/services/etablissement_financier.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { PaiementService } from 'app/pages/services/paiement.service';

@Component({
  selector: 'app-detail-caisse',
  templateUrl: './detail-caisse.component.html',
  styleUrls: ['./detail-caisse.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailCaisseComponent implements OnInit {
  isConnectionAvailableMA: boolean = navigator.onLine; 
  isOpened= true ;
  isOpened2=false ;
  openPop=true
  code:any
  nom:any
  etablifi:any
  produitfin:any
  displayedColumns: string[] = ['libelle','idCaisseEtablissement','affiliation'];
  dataSource = new MatTableDataSource<any>()
  id:any
  caissesaff:any
  idprod:any
  affMagasin:any
  listWalletCaisse=[]
  listWaletCaisseFiltre=[]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialogRef: MatDialogRef<DetailCaisseComponent > ,private dialog:MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any,
    private mag:MagasinService,private translate:TranslateService,
    private etabli:EtablissementFinancierService,private paiement:PaiementService) { 
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMA = false
      this.dialogRef.close()
  });
    }
  ngOnInit(): void {
    
   console.log(this.data);
   
    this.code=this.data.data.code
    this.nom=this.data.data.libelle
   this.etablifi= this.data.item.etablissemnt
    this.produitfin=this.data.item.nomWallet
    this.id=this.data.data.idMagasin
    this.idprod=this.data.item.idWallet
  this.affMagasin=this.data.item.affiliationMonetique
    
    this.mag.ListAffiliationByIdMagasin(this.id,this.idprod).subscribe(res=>{
      this.caissesaff=res
      // console.log(this.caissesaff);
      
      this.dataSource = new MatTableDataSource(  this.caissesaff);
      this.dataSource.paginator = this.paginator
     this.dataSource.sort = this.sort;
     this.sort.disableClear = true
    })
  }
  Fermer(){
    this.dialogRef.close();
      }
      Mini(){ 
        this.isOpened=false ;
          this.dialogRef.updatePosition({
            bottom:'15px',
            right: '15px', 
          })
          this.dialogRef.updateSize("350px", "auto");
          this.isOpened2=false ;
        }
        
        Maxi(){ 
          this.isOpened2=true;
          console.log(this.isOpened2)
          this.dialogRef.updatePosition({
            
          })
          this.dialogRef.updateSize("700px", "auto");
          this.isOpened=true;
        }

}
