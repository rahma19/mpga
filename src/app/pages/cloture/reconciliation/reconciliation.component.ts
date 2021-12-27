import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClotureService } from 'app/pages/services/cloture.service';
import * as moment from 'moment';
import { NavigationEnd, Router } from '@angular/router';
import { ClotureManuelComponent } from './cloture-manuel/cloture-manuel.component';
import { TranslateService } from '@ngx-translate/core';
import { PaiementService } from 'app/pages/services/paiement.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginationService } from 'app/pages/services/pagination.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { DetailReconciliationComponent } from './detail-reconciliation/detail-reconciliation.component';

interface column {
  name: string,
  value: number
}

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class ReconciliationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  contextMenuPosition = { a: '0px', b: '0px' };
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  filter: any = false;
  filterform: FormGroup;
  settings: any;
  source: any;
  isConnectionAvailableR: boolean = navigator.onLine;
  isserverAvailable: boolean = true;
  mySubscription: any;
  val = '';
  resultat: any;
  dd: any = new Date();
  dataRecons: any;
  df: any;
  nbr_ligne: any;
  nbr_ecart: any;
  resultatecartnul = [];
  etatnul: any;
  newarray = [];
  liste = [];
  listegroupage = [];
  active: boolean
  currentDate = new Date();
  dfin: any;
  db: any;
  flag: boolean = false;
  page_bol: boolean = false;
  scroll_bol: boolean = true;
  data: any;
  check: boolean = true;
  loading = false;
  date: any;
  row_nbr: number = 18;
  idwall: any = ''
  wallets: any
  groupeby: column[] = [];
  nbmagreseau: number
  nbmgactif: number
  nbtransaction: number
  montanttransac: number;
  nbmpga: number
  montantmpga: number
  nbwallet: number
  montantwallet: number
  nbecart: number
  nbr: number;
  title: string = this.translate.instant('recon.bodycard');
  groupe: any = 1;
  filtre: any;
  myfilter: string;
  displayedColumnsReconc: string[] = ['dateCloture', 'produitFinancier', 'nombreMagasinReseau', 'nombreMagasinActif', 'nombreTransactionReconcilie', 'montantTransactionReconcilie', 'nombreTransactionMpga', 'montantTransactionMpga', 'nombreTransactionWallet', 'montantTransactionWallet', 'nombreEcart', 'etatClotureJournee'];

  constructor(private fb: FormBuilder, private dialog: MatDialog,
    private router: Router, private format: FormatNumberPipe,
    private pageService: PaginationService, private closerv: ClotureService,
    private translate: TranslateService, private paiement: PaiementService) {
    window.addEventListener('online', () => {
      this.isConnectionAvailableR = true
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = true;
        }
      });
    });
    window.addEventListener('offline', () => {
      this.isConnectionAvailableR = false
    });
  }

  private filterData(source): void {
    source.filterPredicate = ((data, filter) => {
      const etaTrans = !filter.idwallet || data.idProduitFinancier == filter.idwallet;
      return (
        etaTrans
      );
    }) as (PeriodicElement, string) => boolean;
  }

  private watchFormChange() {
    this.filterform.valueChanges.subscribe((value) => {
      this.source = new MatTableDataSource(this.filtre);
      if (this.scroll_bol == true) {
        setTimeout(() => (this.source.paginator = this.paginator));
      } else {
        this.source.paginator = null;
      } this.source.sort = this.sort;

      this.filterData(this.source);
      const filter = {
        ...value,
      } as string;
      this.myfilter = filter;
      this.source.filter = filter;
      this.resultat = this.source.filteredData;
      this.nbr_ecart = 0;
      this.nbr_ligne = this.resultat.length;
      for (var i = 0; i < this.resultat.length; i++) {
        this.nbr_ecart = this.resultat[i].nombreEcart + this.nbr_ecart;
      }
      this.groupage(this.groupe);
    });
  }

  private initFormControl() {
    this.filterform = this.fb.group({
      idwallet: [''],
      Date_D: [''],
      Date_F: [''],
    })
  }
  ngOnInit() {
    this.groupeby = [
      { name: this.translate.instant('transaction.recap.g1'), value: 1 },
      { name: this.translate.instant('modifierEtablissement.column0'), value: 2 },
      { name: this.translate.instant('transaction.attribute.n0'), value: 3 },
    ];
    this.initFormControl();
    this.watchFormChange();
    this.filtreR();
    this.date = moment(this.currentDate).format("DD/MM/YYYY");
    this.paiement.ListWallet().subscribe(res => {
      this.wallets = res
    })
  }

  filtreR() {
    var momentDateDebut = new Date(this.currentDate);
    var dd = moment(momentDateDebut).format("YYYY-MM-DD");
    this.loading = true;
    this.closerv.listecloture(dd, dd, this.val).subscribe(res => {
      this.nbr_ligne = 0;
      this.nbr_ecart = 0;
      this.resultat = res;
      this.filtre = res;
      this.data = res;
      this.nbr_ligne = this.data.length;
      for (var i = 0; i < this.data.length; i++) {
        this.nbr_ecart = this.data[i].nombreEcart + this.nbr_ecart;
        // this.filtre[i].montantTransactionWallet = this.format.transform(this.filtre[i].montantTransactionWallet)
        // this.filtre[i].montantTransactionReconcilie = this.format.transform(this.filtre[i].montantTransactionReconcilie)
        // this.filtre[i].montantTransactionMpga = this.format.transform(this.filtre[i].montantTransactionMpga)
        this.filtre[i].dateCloture = moment(this.filtre[i].dateCloture).format("DD/MM/YYYY")
      }
      this.loading = false;
      this.source = new MatTableDataSource(this.filtre);
      if (this.scroll_bol == true) {
        setTimeout(() => this.source.paginator = this.paginator);

      } else { this.source.paginator = null; }
      this.source.sort = this.sort;
      this.filterData(this.source);
      this.source.filter = this.myfilter

    }, err => {
      this.loading = false;
      this.isserverAvailable = false;
    })
  }

  scroll() {
    this.scroll_bol = false;
    this.page_bol = true;
    this.pageService.scroll(this.source);
  }

  page() {
    this.scroll_bol = true;
    this.page_bol = false;
    setTimeout(() => this.pageService.page(this.source, this.paginator, this.sort))
  }

  getrow_nbr() {
    setTimeout(() => this.pageService.getrow_nbr(this.source, this.paginator, this.sort, this.row_nbr))
  }

  showecart(event) {
    this.resultatecartnul = [];
    this.nbr_ecart = 0;
    this.nbr_ligne = 0;
    if (event.target.checked === false) {
      this.check = false;
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].nombreEcart != 0 && this.data[i].nombreEcart != null) {
          this.resultatecartnul.push(this.data[i])
        }
      }
      this.resultat = this.resultatecartnul;
    }
    else if (event.target.checked === true) {
      this.check = true;
      this.resultat = this.data;
    }
    this.nbr_ligne = this.resultat.length;
    for (var i = 0; i < this.resultat.length; i++) {
      this.nbr_ecart = this.resultat[i].nombreEcart + this.nbr_ecart;
    }
    this.source = new MatTableDataSource(this.resultat);
  }

  show() {
    this.filter ? this.filter = false : this.filter = true;
  }

  Rechercher(value) {
    this.loading = true;
    this.active = false;
    var datedebut;
    var datefin;
    if (value.Date_D == undefined || value.Date_D == "" || value.Date_D == "Invalid date") {
      value.Date_D = '';
      datedebut = '';
    }
    else {
      var momentDateDebut = new Date(value.Date_D);
      datedebut = moment(momentDateDebut).format("YYYY-MM-DD");
    }
    if (value.Date_F == undefined || value.Date_F == "" || value.Date_F == "Invalid date") {
      value.Date_F = '';
      datefin = '';
    }
    else {
      var momentDateFin = new Date(value.Date_F);
      datefin = moment(momentDateFin).format("YYYY-MM-DD");
    }
    this.closerv.listecloture(datedebut, datefin, this.val).subscribe(res => {
      this.nbr_ligne = 0;
      this.nbr_ecart = 0;
      this.data = res;
      console.log(res);

      this.resultat = res;
      this.filtre = res;
      this.nbr_ligne = this.resultat.length;
      for (var i = 0; i < this.resultat.length; i++) {
        this.nbr_ecart = this.resultat[i].nombreEcart + this.nbr_ecart;
        // this.resultat[i].montantTransactionWallet = this.format.transform(this.resultat[i].montantTransactionWallet)
        // this.resultat[i].montantTransactionReconcilie = this.format.transform(this.resultat[i].montantTransactionReconcilie)
        // this.resultat[i].montantTransactionMpga = this.format.transform(this.resultat[i].montantTransactionMpga)
        this.resultat[i].dateCloture = moment(this.resultat[i].dateCloture).format("DD/MM/YYYY")
      }
      this.loading = false;
      this.source = new MatTableDataSource(this.resultat);
      if (this.scroll_bol == true) {
        setTimeout(() => (this.source.paginator = this.paginator));
      } else {
        this.source.paginator = null;
      }
      this.source.sort = this.sort;
      this.filterData(this.source);
      this.source.filter = this.myfilter;
      this.resultat = this.source.filteredData;
      this.groupage(this.groupe);
    }, err => {
      this.loading = false;
      this.isserverAvailable = false;
    })
    this.active = true
  }

  Print() {
    window.print();
  }

  cloture() {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.height = '200px';
    dialogConfig.maxHeight = "200px";
    this.dialog.open(ClotureManuelComponent, dialogConfig).afterClosed()
      .subscribe(item => {
        if (item == 1) {
          this.ngOnInit();
        }
      })
  }

  menuRecons(event: MouseEvent, liste) {
    this.dataRecons = liste;
    event.preventDefault();
    this.contextMenuPosition.a = event.clientX + 'px';
    this.contextMenuPosition.b = event.clientY + 'px';
    this.contextMenu.menuData = { liste: liste };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  detailRecons() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    dialogConfig.minWidth = "500px";
    dialogConfig.hasBackdrop = false;
    // dialogConfig.maxHeight = '600px';
    dialogConfig.data = this.dataRecons;


    const diag = this.dialog.open(DetailReconciliationComponent, dialogConfig);
  }

  groupage(groupe) {
    this.newarray = [];
    this.liste = [];
    this.listegroupage = [];
    if (groupe == 2) {
      this.displayedColumnsReconc = ['produitFinancier', 'nombre', 'nombreMagasinReseau', 'nombreMagasinActif', 'nombreTransactionReconcilie', 'montantTransactionReconcilie', 'nombreTransactionMpga', 'montantTransactionMpga', 'nombreTransactionWallet', 'montantTransactionWallet', 'nombreEcart'];
      this.title = this.translate.instant('transaction.groupbymagasin');
      for (var i = 0; i < this.resultat.length; i++) {
        var wallet = this.resultat[i].produitFinancier;
        var obj = { wallet };
        this.liste.push(obj);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj => obj.wallet === o.wallet)) {
          unique.push(o);
        }
        return unique;
      }, []);
      for (var j = 0; j < this.listegroupage.length; j++) {
        this.nbmagreseau = 0;
        this.nbmgactif = 0
        this.nbtransaction = 0
        this.montanttransac = 0
        this.nbmpga = 0
        this.montantmpga = 0
        this.nbwallet = 0
        this.montantwallet = 0
        this.nbecart = 0
        this.nbr = 0;
        var produitFinancier: string = this.listegroupage[j].wallet;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].produitFinancier == produitFinancier) {
            this.nbmagreseau = this.nbmagreseau + Number(this.resultat[k].nombreMagasinReseau);
            this.nbmgactif = this.nbmgactif + Number(this.resultat[k].nombreMagasinActif);
            this.nbtransaction = this.nbtransaction + Number(this.resultat[k].nombreTransactionReconcilie);
            this.montanttransac = this.montanttransac + Number(this.resultat[k].montantTransactionReconcilie);
            this.nbmpga = this.nbmpga + Number(this.resultat[k].nombreTransactionMpga);
            this.montantmpga = this.montantmpga + Number(this.resultat[k].montantTransactionMpga);
            this.nbwallet = this.nbwallet + Number(this.resultat[k].nombreTransactionWallet);
            this.montantwallet = this.montantwallet + Number(this.resultat[k].montantTransactionWallet);
            this.nbecart = this.nbecart + Number(this.resultat[k].nombreEcart);
            this.nbr = this.nbr + 1;
          }
        }
        var nombreMagasinReseau = Number(this.nbmagreseau);
        var nombre = this.nbr;
        var nombreMagasinActif = Number(this.nbmgactif);
        var nombreTransactionReconcilie = Number(this.nbtransaction);
        var montantTransactionReconcilie = Number(this.montanttransac);
        var nombreTransactionMpga = Number(this.nbmpga);
        var montantTransactionMpga = Number(this.montantmpga);
        var nombreTransactionWallet = Number(this.nbwallet);
        var montantTransactionWallet = Number(this.montantwallet);
        var nombreEcart = Number(this.nbecart);
        var object = {
          produitFinancier, nombre, nombreMagasinReseau, nombreMagasinActif, nombreTransactionReconcilie,
          montantTransactionReconcilie, nombreTransactionMpga, montantTransactionMpga, nombreTransactionWallet,
          montantTransactionWallet, nombreEcart
        };
        this.newarray.push(object);
        this.nbr_ligne = this.newarray.length;
      }
      this.data = this.newarray;
      this.source = new MatTableDataSource(this.data);
      if (this.scroll_bol == true) {
        setTimeout(() => (this.source.paginator = this.paginator));
      } else {
        this.source.paginator = null;
      } this.source.sort = this.sort;
    }
    else if (groupe == 3) {
      console.log(this.resultat);

      this.displayedColumnsReconc = ['dateCloture', 'nombre', 'nombreMagasinReseau', 'nombreMagasinActif', 'nombreTransactionReconcilie', 'montantTransactionReconcilie', 'nombreTransactionMpga', 'montantTransactionMpga', 'nombreTransactionWallet', 'montantTransactionWallet', 'nombreEcart'];
      this.title = this.translate.instant('transaction.groupbydate');
      for (var i = 0; i < this.resultat.length; i++) {
        var date = this.resultat[i].dateCloture;
        var obj1 = { date };
        this.liste.push(obj1);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj => obj.date === o.date)) {
          unique.push(o);
        }
        return unique;
      }, []);
      for (var j = 0; j < this.listegroupage.length; j++) {
        this.nbmagreseau = 0;
        this.nbmgactif = 0
        this.nbtransaction = 0
        this.montanttransac = 0
        this.nbmpga = 0
        this.montantmpga = 0
        this.nbwallet = 0
        this.montantwallet = 0
        this.nbecart = 0
        this.nbr = 0;
        var dateCloture: string = this.listegroupage[j].date;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].dateCloture == dateCloture) {
            this.nbmagreseau = this.nbmagreseau + Number(this.resultat[k].nombreMagasinReseau);
            this.nbmgactif = this.nbmgactif + Number(this.resultat[k].nombreMagasinActif);
            this.nbtransaction = this.nbtransaction + Number(this.resultat[k].nombreTransactionReconcilie);
            this.montanttransac = this.montanttransac + Number(this.resultat[k].montantTransactionReconcilie);
            this.nbmpga = this.nbmpga + Number(this.resultat[k].nombreTransactionMpga);
            this.montantmpga = this.montantmpga + Number(this.resultat[k].montantTransactionMpga);
            this.nbwallet = this.nbwallet + Number(this.resultat[k].nombreTransactionWallet);
            this.montantwallet = this.montantwallet + Number(this.resultat[k].montantTransactionWallet);
            this.nbecart = this.nbecart + Number(this.resultat[k].nombreEcart);
            this.nbr = this.nbr + 1;
          }
        }
        var nombreMagasinReseau = Number(this.nbmagreseau);
        var nombre = this.nbr;
        var nombreMagasinActif = Number(this.nbmgactif);
        var nombreTransactionReconcilie = Number(this.nbtransaction);
        var montantTransactionReconcilie = Number(this.montanttransac);
        var nombreTransactionMpga = Number(this.nbmpga);
        var montantTransactionMpga = Number(this.montantmpga);
        var nombreTransactionWallet = Number(this.nbwallet);
        var montantTransactionWallet = Number(this.montantwallet);
        var nombreEcart = Number(this.nbecart);
        var object1 = {
          dateCloture, nombre, nombreMagasinReseau, nombreMagasinActif, nombreTransactionReconcilie,
          montantTransactionReconcilie, nombreTransactionMpga, montantTransactionMpga, nombreTransactionWallet,
          montantTransactionWallet, nombreEcart
        };
        this.newarray.push(object1);
        this.nbr_ligne = this.newarray.length;
      }
      this.data = this.newarray;
      this.source = new MatTableDataSource(this.data);
      if (this.scroll_bol == true) {
        setTimeout(() => (this.source.paginator = this.paginator));
      } else {
        this.source.paginator = null;
      } this.source.sort = this.sort;
    }
    else if (groupe == 1) {
      this.displayedColumnsReconc = ['dateCloture', 'produitFinancier', 'nombreMagasinReseau', 'nombreMagasinActif', 'nombreTransactionReconcilie', 'montantTransactionReconcilie', 'nombreTransactionMpga', 'montantTransactionMpga', 'nombreTransactionWallet', 'montantTransactionWallet', 'nombreEcart', 'etatClotureJournee'];
      this.title = this.translate.instant('recon.bodycard');
      this.data = this.resultat;
      this.source = new MatTableDataSource(this.data);
      if (this.scroll_bol == true) {
        setTimeout(() => (this.source.paginator = this.paginator));
      } else {
        this.source.paginator = null;
      } this.source.sort = this.sort;
      this.nbr_ligne = this.data.length;
    }

  }
}
