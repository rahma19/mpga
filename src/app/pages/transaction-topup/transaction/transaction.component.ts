import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NavigationEnd, Router } from '@angular/router';
import { config, Observable } from 'rxjs';
import { ExcelService } from 'app/pages/Export/excel.service';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';
import { TransactionService } from 'app/pages/services/transaction.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { startWith, map } from 'rxjs/operators';
import { LanguagePipe } from 'app/pages/shared/language.pipe';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginationService } from 'app/pages/services/pagination.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { DetailTransactionComponent } from '../detail-transaction/detail-transaction.component';
import { PaiementService } from 'app/pages/services/paiement.service';

interface column {
  name: string,
  value: number
}
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  contextMenuPosition = { a: '0px', b: '0px' };
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  filteredOptions: Observable<string[]>;
  filter = false;
  filterform: FormGroup;
  myControl: FormControl = new FormControl();
  source: any;
  data: any;
  date: any;
  cr1: any;
  cr3: any;
  cr4: any;
  val = '';
  maxDate: any = new Date();
  minDate: any = new Date();
  nbr_transaction: any;
  nbr_ligne: any;
  montant_t: any;
  montanttotal: any;
  groupeby: column[] = []
  listener: any;
  mySubscription: any;
  liste = [];
  listegroupage = [];
  montantpargroupe: number;
  newarray = [];
  nbr: number;
  etablissements: any
  wallets: any;
  etatTran: any;
  etatRecon: any;
  etatLett: any;
  zones: any;
  etab_finan: any;
  montantmin: any;
  montantmax: any;
  magasins: any;
  active: boolean;
  etab: any
  waltransaction: any;
  datfin: any;
  datdeb: any;
  currentDate = new Date();
  magasin: any;
  checked: boolean = false;
  check: boolean = false;
  groupe: any;
  title: string;
  resultat: any;
  zone: any;
  page_bol: boolean = false;
  scroll_bol: boolean = true;
  loading = false;
  isConnectionAvailable: boolean = navigator.onLine;
  isserverAvailable: boolean = true;
  listetest = [];
  isValid: any;
  row_nbr: number = 18;
  displayedColumnsTransactions: string[] = ['dateTransaction', 'refMpga', 'libelleMagasin', 'autorisation', 'montant', 'libelleEtablissementFinancier', 'libelleWallet', 'canalTransaction', 'etatTransaction'];
  myfilter: string;
  filtre: any;
  dataTrans: any;
  canals: Object;
  categCanals: Object;

  constructor(private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private format: FormatNumberPipe,
    private pageService: PaginationService,
    private Transaction: TransactionService,
    private Paiement: PaiementService,
    private mag: MagasinService,
    private excelService: ExcelService,
    private translate: TranslateService) {
    window.addEventListener('online', () => {
      this.isConnectionAvailable = true
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = true;
        }
      });
    });
    window.addEventListener('offline', () => {
      this.isConnectionAvailable = false
    });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }

  private filterData(source): void {
    source.filterPredicate = ((data, filter) => {
      const etaTrans = !filter.etat_trans || data.idEtatTransaction == filter.etat_trans;
      const etab = !filter.etablissement?.nomCommercial || data.libelleEtablissementFinancier == filter.etablissement?.nomCommercial;
      const wallet = !filter.wallet || data.libelleWallet == filter.wallet;
      const magasin = !filter.magasin_ || data.libelleMagasin.toLowerCase().includes(filter.magasin_.toLowerCase());
      const min = !filter.montant_min || data.montant >= filter.montant_min;
      const max = !filter.montant_max || data.montant <= filter.montant_max;
      const etatRec = !filter.etat_recon || data.idEtatReconciliation == filter.etat_recon;
      const etaLet = !filter.etat_lettrage || data.idEtatLettrage == filter.etat_lettrage;
      const zone = !filter.zone_ || data.idZone == filter.zone_;
      const canalPaiement = !filter.canalPaiement_ || data.idCanalPaiement == filter.canalPaiement_;
      const categCanalPaiement = !filter.categcanalPaiement_ || data.idCategorieCanalPaiement == filter.categcanalPaiement_;

      return (
        etaTrans &&
        etab &&
        wallet &&
        magasin &&
        min &&
        max &&
        etatRec &&
        etaLet &&
        zone &&
        canalPaiement &&
        categCanalPaiement
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
      this.nbr_transaction = this.resultat.length;
      this.nbr_ligne = this.resultat.length;
      this.montant_t = 0;
      for (var i = 0; i < this.resultat.length; i++) {
        var mm = Number(this.resultat[i].montant);
        this.montant_t = mm + this.montant_t;
      }
      this.montanttotal = this.format.transform(this.montant_t);
      this.groupage(this.groupe);
    });

  }

  private initFormControl() {
    this.filterform = this.fb.group({
      etablissement: [''],
      wallet: [''],
      produit: [''],
      magasin_: [''],
      montant_min: [''],
      montant_max: [''],
      etat_trans: [''],
      etat_recon: [''],
      etat_lettrage: [''],
      Date_D: [new Date()],
      Date_F: [new Date()],
      zone_: [''],
      categcanalPaiement_: [''],
      canalPaiement_: ['']
    })
  }

  ngOnInit() {
    this.groupeby = [
      { name: this.translate.instant('transaction.recap.g1'), value: 1 },
      { name: this.translate.instant('transaction.recap.g2'), value: 2 },
      { name: this.translate.instant('transaction.recap.g3'), value: 3 },
      { name: this.translate.instant('modifierEtablissement.column0'), value: 4 },
      { name: this.translate.instant('transaction.attribute.n6'), value: 5 },
      { name: this.translate.instant('modifierEtablissement.column1'), value: 6 }
    ]

    this.title = this.translate.instant('transaction.bodycard');
    this.initFormControl();
    this.watchFormChange();
    this.date = moment(this.currentDate).format("DD/MM/YYYY");
    this.filtreT();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this.doFilter(val) : [])
      );
  }

  filtreT() {
    var dd = moment(this.currentDate).format("YYYY/MM/DD");
    this.nbr_transaction = 0;
    this.nbr_ligne = 0;
    this.montant_t = 0;

    this.Transaction.getEtablissement().subscribe(res => {
      this.etablissements = res;
    })
    this.Transaction.etatTransaction().subscribe(res => {
      this.etatTran = res;
      console.log(res);

    })
    this.Transaction.etatReconciliation().subscribe(res => {
      this.etatRecon = res;
    })
    this.Transaction.etatLettrage().subscribe(res => {
      this.etatLett = res;
    })
    this.Transaction.getZone().subscribe(res => {
      this.zones = res;
    })
    this.Paiement.listCategCanalPaiement().subscribe(res => {
      this.categCanals = res;

    })

    this.mag.filtremagasin(this.val, this.val, this.val).subscribe(res => {
      this.magasins = res;
    })
    this.loading = true;
    this.Transaction.getTransactionFiltre(this.val, this.val, this.filterform.value.Date_D, dd, this.val, this.val, this.val, this.val, this.val, this.val, this.val).subscribe(res => {
      this.resultat = res;
      console.log(res);
      this.filtre = res;
      this.data = res;
      this.nbr_transaction = this.data.length;
      this.nbr_ligne = this.data.length;
      for (var i = 0; i < this.data.length; i++) {
        var mm = Number(this.data[i].montant);
        //this.filtre[i].montant = this.format.transform(Number(this.data[i].montant));
        this.montant_t = mm + this.montant_t;
        this.filtre[i].dateTransaction = moment(this.data[i].dateTransaction).format('DD/MM/YYYY HH:mm');
        // if (this.filtre[i].idEtatReconciliation == '2') { this.filtre[i].etaRec = this.translate.instant('transaction.column_Oui'); } else { this.filtre[i].etaRec = this.translate.instant('transaction.column_Non'); }
        // if (this.filtre[i].idEtatLettrage == '2') { this.filtre[i].etaLet = this.translate.instant('transaction.column_Oui'); } else { this.filtre[i].etaLet = this.translate.instant('transaction.column_Non'); }
      }
      if (this.montant_t == 0) {
        this.montanttotal = 0;
      }
      else { this.montanttotal = this.format.transform(this.montant_t); }
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

  groupage(groupe) {
    this.newarray = [];
    this.liste = [];
    this.listegroupage = [];
    if (groupe == 2) {
      this.displayedColumnsTransactions = ['libelleMagasin', 'nombre', 'montant'];
      this.title = this.translate.instant('transaction.groupbymagasin');
      for (var i = 0; i < this.resultat.length; i++) {
        var raison = this.resultat[i].libelleMagasin;
        var obj = { raison };
        this.liste.push(obj);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj => obj.raison === o.raison)) {
          unique.push(o);
        }
        return unique;
      }, []);
      for (var j = 0; j < this.listegroupage.length; j++) {
        this.montantpargroupe = 0;
        var nbr = 0;
        var libelleMagasin: string = this.listegroupage[j].raison;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].libelleMagasin == libelleMagasin) {
            this.montantpargroupe = this.montantpargroupe + Number(this.resultat[k].montant);
            nbr = nbr + 1;
          }
        }
        var montant = this.montantpargroupe//this.format.transform(Number(this.montantpargroupe));
        var object = { nbr, libelleMagasin, montant };
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
      this.displayedColumnsTransactions = ['libelleEtablissementFinancier', 'nombre', 'montant'];
      this.title = this.translate.instant('transaction.groupbyetab');
      for (var i = 0; i < this.resultat.length; i++) {
        var raison = this.resultat[i].libelleEtablissementFinancier;
        var obj2 = { raison };
        this.liste.push(obj2);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj => obj.raison === o.raison)) {
          unique.push(o);
        }
        return unique;
      }, []);
      for (var j = 0; j < this.listegroupage.length; j++) {
        this.montantpargroupe = 0;
        nbr = 0;
        var libelleEtablissementFinancier: string = this.listegroupage[j].raison;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].libelleEtablissementFinancier == libelleEtablissementFinancier) {
            this.montantpargroupe = this.montantpargroupe + Number(this.resultat[k].montant);
            nbr = nbr + 1;
          }
        }
        var montant = this.montantpargroupe //this.format.transform(Number(this.montantpargroupe));
        var object1 = { nbr, libelleEtablissementFinancier, montant };
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
    else if (groupe == 4) {
      this.displayedColumnsTransactions = ['libelleWallet', 'nombre', 'montant'];
      this.title = this.translate.instant('transaction.groupbywallet');
      for (var i = 0; i < this.resultat.length; i++) {
        var raison = this.resultat[i].libelleWallet;
        var obj2 = { raison };
        this.liste.push(obj2);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj => obj.raison === o.raison)) {
          unique.push(o);
        }
        return unique;
      }, []);
      for (var j = 0; j < this.listegroupage.length; j++) {
        this.montantpargroupe = 0;
        var nbr = 0;
        var libelleWallet: string = this.listegroupage[j].raison;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].libelleWallet == libelleWallet) {
            this.montantpargroupe = this.montantpargroupe + Number(this.resultat[k].montant);
            nbr = nbr + 1;
          }
        }
        var montant = this.montantpargroupe//this.format.transform(Number(this.montantpargroupe));
        var object2 = { nbr, montant, libelleWallet };
        this.newarray.push(object2);
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
    else if (groupe == 5) {
      this.displayedColumnsTransactions = ['etatTransaction', 'nombre', 'montant'];
      this.title = this.translate.instant('transaction.groupebyetat');
      for (var i = 0; i < this.resultat.length; i++) {
        var raison = this.resultat[i].etatTransaction;
        var obj2 = { raison };
        this.liste.push(obj2);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj => obj.raison === o.raison)) {
          unique.push(o);
        }
        return unique;
      }, []);
      for (var j = 0; j < this.listegroupage.length; j++) {
        this.montantpargroupe = 0;
        var nbr = 0;
        var etatTransaction: string = this.listegroupage[j].raison;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].etatTransaction == etatTransaction) {
            this.montantpargroupe = this.montantpargroupe + Number(this.resultat[k].montant);
            nbr = nbr + 1;
          }
        }
        var montant = this.montantpargroupe//this.format.transform(Number(this.montantpargroupe));
        var object3 = { nbr, montant, etatTransaction };
        this.newarray.push(object3);
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
    else if (groupe == 6) {
      this.displayedColumnsTransactions = ['canalTransaction', 'nombre', 'montant'];
      this.title = this.translate.instant('transaction.groupebycanal');
      for (var i = 0; i < this.resultat.length; i++) {
        var raison = this.resultat[i].idCanalPaiement;
        var obj2 = { raison };
        this.liste.push(obj2);
      }
      this.listegroupage = this.liste.reduce((unique, o) => {
        if (!unique.some(obj => obj.raison === o.raison)) {
          unique.push(o);
        }
        return unique;
      }, []);
      for (var j = 0; j < this.listegroupage.length; j++) {
        this.montantpargroupe = 0;
        var nbr = 0;
        var idCanalPaiement: string = this.listegroupage[j].raison;
        var canalPaiement;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].idCanalPaiement == idCanalPaiement) {
            canalPaiement = this.resultat[k].canalPaiement;
            this.montantpargroupe = this.montantpargroupe + Number(this.resultat[k].montant);
            nbr = nbr + 1;
          }
        }
        var montant = this.montantpargroupe//this.format.transform(Number(this.montantpargroupe));
        var obj3 = { nbr, montant, canalPaiement };
        this.newarray.push(obj3);
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
      this.displayedColumnsTransactions = ['dateTransaction', 'refMpga', 'libelleMagasin', 'autorisation', 'montant', 'libelleEtablissementFinancier', 'libelleWallet', 'canalTransaction', 'etatTransaction'];
      this.title = this.translate.instant('transaction.bodycard');
      this.checked = false;
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

  getcanal() {
    let value = this.filterform.value.categcanalPaiement_;

    this.canals = []
    if (value != '') {
      this.Paiement.ListCanalPaiementByIdCategorie(value).subscribe(res => {
        this.canals = res;
      })
    }
  }


  getwallet() {
    let value = this.filterform.value.etablissement;
    this.wallets = []
    if (value != '') {
      this.Transaction.listewallet(value.idEtablissementFinancier).subscribe(res => {
        this.wallets = res;
      })
    }
  }

  updatemontantmin() {
    if (this.filterform.value.montant_min != undefined && this.filterform.value.montant_min != '') {
      if (this.filterform.value.montant_min.indexOf(',') == -1) {
        this.filterform.value.montant_min = this.format.transform(this.filterform.value.montant_min);
      }
    }
  }

  resetAutoInput(event) {
    this.isValid = event.option.value;
  }

  updatemontantmax() {
    if (this.filterform.value.montant_max != undefined && this.filterform.value.monantmontant_max != '') {
      if (this.filterform.value.montant_max.indexOf(',') == -1) {
        this.filterform.value.montant_max = this.format.transform(this.filterform.value.monantmontant_max);
      }
    }
  }

  doFilter(value: string): string[] {
    return this.magasins.map((x: any) => x.libelle).filter(option =>
      option.toLowerCase().includes(value.toLowerCase()));
  }

  blurInput() {
    setTimeout(() => {
      if (!this.isValid || this.isValid !== this.myControl.value) {
        this.myControl.setValue('');
        this.isValid = '';
      }
    }, 500)
  }

  Rechercher(value, check) {
    console.log(check);

    this.loading = true;
    this.checked = false;
    this.active = false;
    var datedebut;
    var datefin;
    if (value.Date_D == undefined || value.Date_D == "" || value.Date_D == "Invalid date") {
      value.Date_D = '';
      datedebut = '';
    }
    else if (check == true) {
      var momentDateDebut = new Date(this.currentDate);
      this.maxDate = momentDateDebut;
      datedebut = moment(momentDateDebut).format("YYYY-MM-DD");
    }
    else {
      var momentDateDebut = new Date(value.Date_D);
      datedebut = moment(momentDateDebut).format("YYYY-MM-DD");
    }
    if (value.Date_F == undefined || value.Date_F == "" || value.Date_F == "Invalid date") {
      value.Date_F = '';
      datefin = '';
    }
    else if (check == true) {
      var momentDateFin = new Date(this.currentDate);
      this.minDate = momentDateFin;
      datefin = moment(momentDateFin).format("YYYY-MM-DD");
    }
    else {
      var momentDateFin = new Date(value.Date_F);
      datefin = moment(momentDateFin).format("YYYY-MM-DD");
    }
    console.log(datedebut, datefin);

    this.Transaction.getTransactionFiltre('', '', '', datedebut, datefin, '', '', '', '', '', '').subscribe(res => {
      this.nbr_transaction = 0;
      this.nbr_ligne = 0;
      this.montant_t = 0;
      this.loading = false;
      console.log(res);

      this.data = res
      this.filtre = res;
      this.nbr_transaction = this.data.length;
      this.nbr_ligne = this.data.length;
      for (var i = 0; i < this.data.length; i++) {
        var mm = Number(this.data[i].montant);
        this.montant_t = mm + this.montant_t;
        // this.data[i].montant = this.format.transform(this.data[i].montant)
        this.data[i].dateTransaction = moment(this.data[i].dateTransaction).format('DD/MM/YYYY HH:mm');
        if (this.data[i].idEtatReconciliation == '2') { this.data[i].etaRec = this.translate.instant('transaction.column_Oui'); } else { this.data[i].etaRec = this.translate.instant('transaction.column_Non'); }
        if (this.data[i].idEtatLettrage == '2') { this.data[i].etaLet = this.translate.instant('transaction.column_Oui'); } else { this.data[i].etaLet = this.translate.instant('transaction.column_Non'); }
      }
      if (this.montant_t == 0) {
        this.montanttotal = 0;
      }
      else { this.montanttotal = this.format.transform(this.montant_t); }
      this.source = new MatTableDataSource(this.data);
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
    this.check = false;
  }

  ngOnDestroy(): void {
  }

  onDestroy() {
    window.removeEventListener('online', () => {
      this.isConnectionAvailable = true
      this.filtreT();
    });
    window.removeEventListener('offline', () => {
      this.isConnectionAvailable = false
    });
  }

  show() {
    this.filter ? this.filter = false : this.filter = true;
  }

  Print() {
    window.print();
  }

  menuTrans(event: MouseEvent, liste) {
    this.dataTrans = liste;
    event.preventDefault();
    this.contextMenuPosition.a = event.clientX + 'px';
    this.contextMenuPosition.b = event.clientY + 'px';
    this.contextMenu.menuData = { liste: liste };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  detailTransa() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.height = '400px';
    dialogConfig.hasBackdrop = false;
    // dialogConfig.maxHeight = '600px';
    dialogConfig.data = this.dataTrans;


    const diag = this.dialog.open(DetailTransactionComponent, dialogConfig);
  }

}