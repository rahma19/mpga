import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { PaginationService } from 'app/pages/services/pagination.service';
import { PaiementService } from 'app/pages/services/paiement.service';
import { ChangerEtatComponent } from 'app/pages/vente/vente/changer-etat/changer-etat.component';
import { UpdateVenteComponent } from 'app/pages/vente/vente/update-vente/update-vente.component';

import { finalize } from 'rxjs/operators';

import { AddBinComponent } from './add-bin/add-bin.component';
import { AddEtablissementComponent } from './add-etablissement/add-etablissement.component';
import { AffNokComponent } from './aff-nok/aff-nok.component';
import { AjouterCanalComponent } from './ajouter-canal/ajouter-canal.component';
import { DetailBinComponent } from './detail-bin/detail-bin.component';
import { EmetteurComponent } from './emetteur/emetteur.component';
import { ModifierBinComponent } from './modifier-bin/modifier-bin.component';
import { SupprimerBinComponent } from './supprimer-bin/supprimer-bin.component';
import { UpdateEtablissementComponent } from './update-etablissement/update-etablissement.component';
interface column {
  name: string,
  value: number
}

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PaiementComponent implements OnInit {
  isConnectionAvailable: boolean = navigator.onLine;
  isserverAvailable: boolean = true;
  mySubscription: any;
  filterform: FormGroup
  filter: any = false;
  settings: any;
  source: any;
  val = '';

  loading: any = false;;
  row_nbr: number = 18;
  row_nbrAff: number = 18;
  page_bol: boolean = false;
  scroll_bol: boolean = true;
  data: any
  level: any;
  groupe: any;
  groupeby: column[] = []

  liste = [];
  listegroupage = [];
  title: string = 'Liste des BIN';
  newarray = [];
  nbr: number;
  resultat: any
  nbr_ligne: any
  nbr_bin: any
  acquereur: any = ''
  emetteur: any = ''

  couleur1: any
  couleur2: any
  couleur4: any
  couleur3: any
  etablissements: any
  modifetab = true
  contextMenuPosition = { x: '0px', y: '0px' };
  add: boolean = true
  isLoginDialogOpen: boolean = false
  emetteurs: any
  statistique = {
    nbligne: 19,
    nbbin: 0,
  };
  resdata: any = []
  myfiltre: any
  dataSource = new MatTableDataSource<any>();
  affsource = new MatTableDataSource<any>();
  @ViewChild('triggerbin') triggerbin: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) contextMenuBin: MatMenuTrigger;
  contextMenuBinPosition = { a: '0px', b: '0px' };
  displayedColumnsAff: string[] = ['etablissement', 'produitFinancier', 'nbr_affiliation_Ok', 'nbr_affiliation_NonOk'];
  displayedColumns: string[] = ['nomPlageBin', 'debutPlageBin', 'finPlageBin', 'emetteur', 'acquereur'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) pag: MatPaginator;
  @ViewChild(MatSort) sorrt: MatSort;

  dataAff: any;
  nbrEtab: any;
  magFerme: any;
  magOuvert: any;
  nbrProduit: any;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private router: Router, private paiement: PaiementService,
    private changeDetector: ChangeDetectorRef, private pageservice: PaginationService) {
    window.addEventListener('offline', () => {
      this.isConnectionAvailable = false
      //alert('Problème de connexion');
    });
    window.addEventListener('online', () => {
      this.isConnectionAvailable = true
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {

          this.router.navigated = true;
        }
      });

    });
  }
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  ngOnInit(): void {
    this.loading = true;
    this.groupeby = [

      { name: 'bin.groupage.g1', value: 1 },
      { name: 'bin.groupage.g2', value: 2 },
      { name: 'bin.groupage.g3', value: 3 },
    ]
    this.initFormControl()
    this.watchFormChange();
    this.paiement.ListEmetteur().subscribe(res => {
      this.emetteurs = res
    })
    this.loading = true;

    this.paiement.listAffMonetique().subscribe((res: any) => {
      this.affsource = new MatTableDataSource(res.list_affiliationProduit);
      if (this.scroll_bol == true) {
        setTimeout(() => this.affsource.paginator = this.pag);
      } else {
        this.affsource.paginator = null;
      }
      this.sort.disableClear = true
      this.affsource.sort = this.sorrt;
      this.nbrEtab = res.nbr_etablissement;
      this.nbrProduit = res.nbr_produit;
      this.magFerme = res.nbr_magasin_ferme;
      this.magOuvert = res.nbr_magasin_ouvert;
      this.loading = false
    })
    this.loading = true;

    this.paiement.listebinfiltre(this.val, this.val).subscribe((res) => {
      this.data = res
      this.loading = false
      console.log(this.data)
      this.resultat = res;
      this.countStat(this.resultat);
      this.dataSource = new MatTableDataSource(this.resultat);
      // if (this.scroll_bol == true) {
      //   setTimeout(() => this.dataSource.paginator = this.paginator);
      // } else { this.dataSource.paginator = null; }
      this.sort.disableClear = true
      this.dataSource.sort = this.sort;
      this.filterData(this.dataSource);
      this.dataSource.filter = this.myfiltre
      this.resdata = this.dataSource.filteredData;
      this.groupage(this.groupe)
    })

    this.loading = true
    this.paiement.ListEtablissementFinancier().subscribe(res => {
      this.etablissements = res
      this.loading = false
    })
  }


  show() {

    this.filter ? this.filter = false : this.filter = true;


  }
  Rechercher(value) {
    this.loading = true;
    this.nbr_ligne = 0
    this.nbr_bin = 0
    this.paiement.listebinfiltre('', '').subscribe((res: any) => {
      this.data = res
      this.resultat = res;

      this.loading = false
      this.resultat = res;
      this.countStat(this.resultat);
      this.dataSource = new MatTableDataSource(this.resultat);


      if (this.scroll_bol == true) {
        setTimeout(() => this.dataSource.paginator = this.paginator);

      } else { this.dataSource.paginator = null; }
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true
      this.filterData(this.dataSource);
      this.dataSource.filter = this.myfiltre

      this.resdata = this.dataSource.filteredData;
      console.log(this.resdata);
      this.groupage(this.groupe)


    })

  }
  Add() {
    this.add = false
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";

    dialogConfig.hasBackdrop = false;
    // dialogConfig.maxHeight="80%";


    this.dialog.open(AddBinComponent, dialogConfig).afterClosed().subscribe(item => {
      this.add = true

      if (item == 1) {
        this.ngOnInit();
      }
    })


  }

  scroll() {
    this.scroll_bol = false;
    this.page_bol = true;
    this.pageservice.scroll(this.dataSource);
  }
  page() {
    this.scroll_bol = true;
    this.page_bol = false;
    setTimeout(() => this.pageservice.page(this.dataSource, this.paginator, this.sort))
  }
  getrow_nbr() {
    setTimeout(() => this.pageservice.getrow_nbr(this.dataSource, this.paginator, this.sort, this.row_nbr))
  }

  scrollAff() {
    this.scroll_bol = false;
    this.page_bol = true;
    this.pageservice.scroll(this.affsource);
  }
  pageAff() {
    this.scroll_bol = true;
    this.page_bol = false;
    setTimeout(() => this.pageservice.page(this.affsource, this.pag, this.sorrt))
  }
  getrow_nbrAff() {
    setTimeout(() => this.pageservice.getrow_nbr(this.affsource, this.pag, this.sorrt, this.row_nbrAff))
  }

  groupage(groupe) {
    this.newarray = [];
    this.liste = [];
    this.listegroupage = [];

    this.page_bol = false;
    this.scroll_bol = true;

    if (groupe == 2) {
      this.displayedColumns = ['emetteur', 'nombre', 'calcul'];

      for (var i = 0; i < this.resdata.length; i++) {
        var emet = this.resdata[i].emetteur;
        var obj3 = { emet };
        this.liste.push(obj3);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj3 => obj3.emet === o.emet)) {
          unique.push(o);
        }
        return unique;
      }, []);
      this.nbr_ligne = this.listegroupage.length
      for (var j = 0; j < this.listegroupage.length; j++) {

        this.nbr = 0;
        let pourcentage = 0
        let calcul = pourcentage.toString()
        var eme: string = this.listegroupage[j].emet;
        console.log(eme);
        for (var k = 0; k < this.resdata.length; k++) {
          console.log(eme);
          if (this.resdata[k].emetteur == eme) {
            this.nbr = this.nbr + 1;
            pourcentage = (this.nbr / this.statistique.nbbin) * 100

            calcul = pourcentage.toFixed(2)

            if (pourcentage == 100) {
              calcul = pourcentage.toFixed()

            }
          }
        }



        var nombre = this.nbr;
        console.log(nombre)

        var emetteur = eme;


        var object = { emetteur, nombre, calcul };
        this.newarray.push(object);

      }
      this.data = this.newarray;
      this.statistique.nbligne = this.data.length;
      this.dataSource = new MatTableDataSource(this.data);
      if (this.scroll_bol) {
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      } else {
        this.dataSource.paginator = null;
      }
      this.dataSource.sort = this.sort;



    }
    else if (groupe == 3) {
      this.displayedColumns = ['acquereur', 'nombre', 'calcul'];
      for (var i = 0; i < this.resdata.length; i++) {
        var aq = this.resdata[i].acquereur;
        var obj = { aq };
        this.liste.push(obj);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj => obj.aq === o.aq)) {
          unique.push(o);
        }
        return unique;
      }, []);
      this.nbr_ligne = this.listegroupage.length
      for (var j = 0; j < this.listegroupage.length; j++) {
        let pourcentage = 0
        let calcul = pourcentage.toString()
        this.nbr = 0;
        var acq: string = this.listegroupage[j].aq;
        console.log(acq);
        for (var k = 0; k < this.resdata.length; k++) {
          console.log(acq);
          if (this.resdata[k].acquereur == acq) {
            this.nbr = this.nbr + 1;
            pourcentage = (this.nbr / this.statistique.nbbin) * 100

            calcul = pourcentage.toFixed(2)

            if (pourcentage == 100) {
              calcul = pourcentage.toFixed()

            }
          }
        }




        var nombre = this.nbr;



        var acquereur = acq;

        var object1 = { nombre, acquereur, calcul };
        this.newarray.push(object1);

      }
      this.data = this.newarray;
      this.statistique.nbligne = this.data.length;
      this.dataSource = new MatTableDataSource(this.data);
      if (this.scroll_bol) {
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      } else {
        this.dataSource.paginator = null;
      }
      this.dataSource.sort = this.sort;


    }


    else if (groupe == 1) {
      this.displayedColumns = ['nomPlageBin', 'debutPlageBin', 'finPlageBin', 'emetteur', 'acquereur'];
      this.data = this.resdata;
      this.dataSource = new MatTableDataSource(this.data);
      this.statistique.nbligne = this.data.length
      if (this.scroll_bol) {
        setTimeout(() => this.dataSource.paginator = this.paginator);
      } else { this.dataSource.paginator = null; }
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true

    }

  }






  Addetablissement() {

    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.hasBackdrop = false;
    this.dialog.open(AddEtablissementComponent, dialogConfig).afterClosed().subscribe(item => {

      if (item == 1) {
        this.ngOnInit();
      }
    })
  }



  viewprofile(liste) {

    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = liste;
    dialogConfig.hasBackdrop = false;
    this.dialog.open(UpdateEtablissementComponent, dialogConfig).afterClosed().subscribe((item) => {



      if (item == 1) {

        this.ngOnInit()
      }

    })
  }
  onContextMenu(event: MouseEvent, liste, i) {
    // this.id=liste
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { "liste": liste, "i": i };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
  ajouterCanal(v) {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px";
    dialogConfig.data = v;
    dialogConfig.hasBackdrop = false;
    this.dialog.open(AjouterCanalComponent, dialogConfig).afterClosed().subscribe(item => {
      if (item == 1) {

        this.ngOnInit();
      }
    });
  }

  viewemetteur(liste) {

    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.height = "550px";
    dialogConfig.maxHeight = "95vh";

    dialogConfig.data = liste;
    dialogConfig.hasBackdrop = false;
    this.dialog.open(EmetteurComponent, dialogConfig).afterClosed().subscribe(() => {

    })
  }

  private initFormControl() {
    this.filterform = this.fb.group({
      emetteur_bin: [''],
      acquereur_bin: [''],
    })
  }
  filterData(source) {



    this.dataSource.filterPredicate = ((data, filter) => {


      const emetteur_bin = !filter.emetteur_bin || data.idEmetteur == filter.emetteur_bin;
      const acquereur_bin = !filter.acquereur_bin || data.idAcquereur == filter.acquereur_bin;


      return emetteur_bin && acquereur_bin
    }) as (PeriodicElement, string) => boolean;
  }


  private watchFormChange() {



    this.filterform.valueChanges.subscribe(value => {
      this.dataSource = new MatTableDataSource(this.resultat);
      if (this.scroll_bol == true) {
        setTimeout(() => this.dataSource.paginator = this.paginator);
      } else { this.dataSource.paginator = null; }
      this.dataSource.sort = this.sort;
      this.sort.disableClear = true
      this.filterData(this.dataSource);


      const filter = {
        ...value,

      } as string;
      this.dataSource.filter = filter;
      this.myfiltre = filter
      this.resdata = this.dataSource.filteredData;
      console.log(this.resdata);

      this.countStat(this.resdata);
      this.groupage(this.groupe)


    });


  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();


  }
  private countStat(bin) {
    let nbrligne = 0;
    let nbbin = 0


    bin.forEach((element) => {
      nbrligne = bin.length
      nbbin = bin.length

    });
    this.statistique.nbligne = nbrligne;
    this.statistique.nbbin = nbbin

  }
  onRightClick(event: MouseEvent, item) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();
    this.liste = item

    // console.log(item);

    // we record the mouse position in our object
    this.contextMenuBinPosition.a = event.clientX + 'px';
    this.contextMenuBinPosition.b = event.clientY + 'px';

    // we open the menu
    // we pass to the menu the information about our object
    this.contextMenuBin.menuData = { "item": item }
    this.contextMenuBin.menu.focusFirstItem('mouse');
    // we open the menu
    this.triggerbin.openMenu();

  }
  supprimer(item) {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.minWidth = "500px"

    dialogConfig.hasBackdrop = false;

    dialogConfig.data = this.liste;
    const diag = this.dialog.open(SupprimerBinComponent, dialogConfig);

    diag.afterClosed().subscribe(item => {
      // console.log(item);
      if (item == 1) {
        this.ngOnInit();
      }
    })
  }
  detail(item) {

    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    // dialogConfig.height="350px";
    // dialogConfig.maxWidth="900px"
    dialogConfig.hasBackdrop = false;
    dialogConfig.data = this.liste;
    const diag = this.dialog.open(DetailBinComponent, dialogConfig);

    diag.afterClosed().subscribe(item => {

    })
  }
  modifier(item) {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.width = "600px";
    // dialogConfig.height = "550px";
    dialogConfig.hasBackdrop = false;
    // dialogConfig.maxHeight = "550px"
    dialogConfig.data = this.liste;
    const diag = this.dialog.open(ModifierBinComponent, dialogConfig);

    diag.afterClosed().subscribe(item => {
      // console.log(item);
      if (item == 1) {
        this.ngOnInit();
      }
    })
  }

  menuAff(event: MouseEvent, liste) {
    this.dataAff = liste;
    event.preventDefault();
    this.contextMenuBinPosition.a = event.clientX + 'px';
    this.contextMenuBinPosition.b = event.clientY + 'px';
    this.contextMenu.menuData = { liste: liste };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  detailAff() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.height = 'auto';
    dialogConfig.hasBackdrop = false;
    // dialogConfig.maxHeight = '600px';
    dialogConfig.data = this.dataAff;


    const diag = this.dialog.open(AffNokComponent, dialogConfig);
  }

}
