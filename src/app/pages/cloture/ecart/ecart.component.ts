import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ClotureService } from 'app/pages/services/cloture.service';
import { FormatNumberPipe } from 'app/pages/format-number.pipe';

import { Observable } from 'rxjs';
import { TransactionService } from 'app/pages/services/transaction.service';
import { MagasinService } from 'app/pages/services/magasin.service';
import { startWith, map } from 'rxjs/operators';

import * as moment from 'moment';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MessageComponent } from 'app/pages/transaction-topup/message/message.component';

import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaginationService } from 'app/pages/services/pagination.service';

interface column {
  name: string,
  value: number
}
@Component({
  selector: 'app-ecart',
  templateUrl: './ecart.component.html',
  styleUrls: ['./ecart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcartComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filter: any = false;
  filterform: FormGroup;
  myControl: FormControl = new FormControl();
  Control: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;
  settings: any;
  gouvernorats: any;
  villes: any;
  zones: any;
  magasins: any;
  val = '';
  nbr_ligne: any;
  nbr_ecart: any;
  data: any;
  source: any;
  maxDate: any;
  Datejour: any;
  groupeby: column[] = [];
  isConnectionAvailableE: boolean = navigator.onLine;
  isserverAvailable: boolean = true;
  mySubscription: any;
  newarray = [];
  liste = [];
  listegroupage = [];
  resultatecartnul = [];
  date: any;
  currentDate = new Date();
  parametres: any
  adresse: any
  ville: any
  code: any
  tel: any
  rne: any
  id = 3
  active: boolean
  gouv: any
  emplacement: any;
  magasin: any
  mg: any
  gouver: any;
  vil: any;
  dateecart: any;
  flag: boolean = false;
  message: any;
  groupe: any = 1;
  checked: boolean = false;
  title: string = 'Liste des Ecarts';
  resultat: any;
  page_bol: boolean = false;
  scroll_bol: boolean = true;
  loading = false;
  current: any;
  row_nbr: number = 18;
  filtre: any;
  myfilter: string;
  displayedColumnsEcart: string[] = ['libelleMagasin', 'vcn', 'date', 'montant', 'refmpga', 'autorisation', 'ecart'];

  constructor(private fb: FormBuilder, private dialog: MatDialog, private pageService: PaginationService,
    private cdRef: ChangeDetectorRef, private router: Router, private Transaction: TransactionService,
    private mag: MagasinService, private closerv: ClotureService, private format: FormatNumberPipe, private translate: TranslateService) {
    window.addEventListener('online', () => {
      this.isConnectionAvailableE = true
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = true;
        }
      });
    });
    window.addEventListener('offline', () => {
      this.isConnectionAvailableE = false
    });
  }

  private filterData(source): void {
    source.filterPredicate = ((data, filter) => {
      // console.log(data, filter);

      const mag = !filter.magasin_ || data.libelleMagasin.toLowerCase().includes(filter.magasin_.toLowerCase());
      const gouv = !filter.gouvernorat || data.idGouvernorat == filter.gouvernorat;
      const ville = !filter.ville || data.idVille == filter.ville;
      const zone = !filter.zone_ || data.idZone == filter.zone_;
      return (
        mag &&
        gouv &&
        ville &&
        zone
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
      }
      this.source.sort = this.sort;
      this.filterData(this.source);
      const filter = {
        ...value,
      } as string;
      this.myfilter = filter;
      this.source.filter = filter;
      this.resultat = this.source.filteredData;
      this.nbr_ligne = this.resultat.length;
      this.nbr_ecart = 0;
      for (var i = 0; i < this.resultat.length; i++) {
        this.nbr_ecart = this.nbr_ecart + 1;
      }
      this.groupage(this.groupe);
    });
  }

  initFormControl() {
    this.filterform = this.fb.group({
      gouvernorat: [''],
      ville: [''],
      Date_: new FormControl('', Validators.compose([Validators.required])),
      magasin_: [''],
      zone_: ['']
    });
  }

  ngOnInit() {
    this.groupeby = [
      { name: this.translate.instant('transaction.recap.g1'), value: 1 },
      { name: this.translate.instant('transaction.attribute.n3'), value: 2 },
      { name: this.translate.instant('magasin.recap.g2'), value: 3 },
      { name: this.translate.instant('magasin.recap.g3'), value: 4 },
      { name: this.translate.instant('magasin.recap.g4'), value: 5 },
    ];
    this.initFormControl();
    this.watchFormChange();
    this.filtreE();

    this.current = moment(this.currentDate).format("DD/MM/YYYY");
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => val.length >= 1 ? this.doFilter(val) : [])
      );
  }

  filtreE() {
    this.Transaction.getParametre(this.id).subscribe(resultat => {
      this.parametres = resultat
      for (var i = 0; i < this.parametres.length; i++) {
        this.adresse = this.parametres[0].valeurDefaut
        this.ville = this.parametres[1].valeurDefaut
        this.code = this.parametres[2].valeurDefaut
        this.tel = this.parametres[3].valeurDefaut
        this.rne = this.parametres[4].valeurDefaut
      }
    })

    this.mag.getgouvernorat().subscribe(res => {
      this.gouvernorats = res;
    });

    this.Transaction.getZone().subscribe(res => {
      this.zones = res;
    })

    this.mag.filtremagasin(this.val, this.val, this.val).subscribe(res => {
      this.magasins = res;
    })

    this.date = new Date();
    // this.date.setDate(this.date.getDate() - 1);
    var datej = moment(this.date).format("YYYY/MM/DD");
    console.log(datej);
    this.nbr_ligne = 0;
    this.nbr_ecart = 0;
    this.loading = true;
    this.closerv.listeEcartFiltre(datej, this.val, this.val, this.val, this.val).subscribe(res => {
      console.log(res);
      this.resultat = res;
      this.filtre = res;
      this.loading = false;
      this.data = res;
      this.nbr_ligne = this.data.length;
      for (var i = 0; i < this.data.length; i++) {
        this.nbr_ecart = this.nbr_ecart + 1;
        // this.dateecart = moment(datej).format("DD/MM/YYYY")
        this.filtre[i].date = moment(this.filtre[i].date).format("DD/MM/YYYY")
        //this.filtre[i].montant = this.format.transform(this.filtre[i].montant)
      }

      this.source = new MatTableDataSource(this.filtre);
      this.source.paginator = this.paginator;
      this.source.sort = this.sort;
      this.filterData(this.source);
    }
      , err => {
        this.loading = false;
        this.isserverAvailable = false;
      })
  }

  getville() {
    this.mag.getvillebyid(this.filterform.value.gouvernorat).subscribe(res => {
      this.villes = res;
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

  show() {
    this.filter ? this.filter = false : this.filter = true;
  }

  doFilter(value: string): string[] {
    return this.magasins.map((x: any) => x.code).filter(option =>
      option.includes(value));
  }

  groupage(groupe) {
    this.newarray = [];
    this.liste = [];
    this.listegroupage = [];
    if (groupe == 2) {
      this.displayedColumnsEcart = ['libelleMagasin', 'nbr', 'vcn'];
      this.title = this.translate.instant('transaction.recap.groupeMag');
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
        var libelleMagasin: string = this.listegroupage[j].raison;
        var nbr = 0;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].libelleMagasin == libelleMagasin) {
            var vcn = this.resultat[k].vcn;
            // nombreCaisse=nombreCaisse+Number(this.data[k].nombreCaisse);
            // nombreCaissier=nombreCaissier+Number(this.data[k].nombreCaissier);
            nbr = nbr + 1;
          }
        }
        var object = { libelleMagasin, nbr, vcn };
        this.newarray.push(object);
        console.log(this.newarray);

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
      this.displayedColumnsEcart = ['ville', 'nbr', 'montant'];
      this.title = this.translate.instant('transaction.recap.groupeVille');
      for (var i = 0; i < this.resultat.length; i++) {
        var raison = this.resultat[i].ville;
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
        var ville: string = this.listegroupage[j].raison;
        var montant = 0;
        var nbr = 0;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].ville == ville) {
            montant = montant + Number(this.resultat[k].montant);
            nbr = nbr + 1;
          }
        }
        var object1 = { montant, ville, nbr };
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
    else if (groupe == 3) {
      this.displayedColumnsEcart = ['gouvernorat', 'nbr', 'montant'];
      this.title = this.translate.instant('transaction.recap.groupeGouv');
      for (var i = 0; i < this.resultat.length; i++) {
        var raison = this.resultat[i].gouvernorat;
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
        var gouvernorat: string = this.listegroupage[j].raison;
        var montant = 0;
        var nbr = 0;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].gouvernorat == gouvernorat) {
            montant = montant + Number(this.resultat[k].montant);
            nbr = nbr + 1;
          }
        }
        var object3 = { nbr, gouvernorat, montant };
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
    else if (groupe == 5) {
      this.displayedColumnsEcart = ['zone', 'nbr', 'montant'];
      this.title = this.translate.instant('transaction.recap.groupeZone');
      for (var i = 0; i < this.resultat.length; i++) {
        var raison = this.resultat[i].zone;
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
        var zone: string = this.listegroupage[j].raison;
        var montant = 0;
        var nbr = 0;
        for (var k = 0; k < this.resultat.length; k++) {
          if (this.resultat[k].zone == zone) {
            montant = montant + Number(this.resultat[k].montant);
            nbr = nbr + 1;
          }
        }
        var object2 = { zone, nbr, montant };
        this.newarray.push(object2);
        this.nbr_ligne = this.newarray.length;
        console.log(this.newarray);

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
      this.displayedColumnsEcart = ['libelleMagasin', 'vcn', 'date', 'montant', 'refmpga', 'autorisation', 'ecart'];
      this.title = this.translate.instant('ecart.bodycard');
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

  showecart(event) {
    this.resultatecartnul = [];
    this.nbr_ecart = 0;
    this.nbr_ligne = 0;
    if (event.target.checked === false) {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].ecart != 0 && this.data[i].ecart != null) {
          this.resultatecartnul.push(this.data[i])
        }
      }
    }
    else if (event.target.checked === true) {
      this.resultatecartnul = this.data;
    }
    this.nbr_ligne = this.resultatecartnul.length;
    for (var i = 0; i < this.resultatecartnul.length; i++) {
      this.nbr_ecart = this.resultatecartnul[i].ecart + this.nbr_ecart;
    }
    this.source = new MatTableDataSource(this.resultatecartnul);
  }
  Rechercher(value) {
    this.loading = true;
    this.active = false;
    if (value.Date_ == undefined || value.Date_ == "" || value.Date_ == "Invalid date") {
      value.Date_ = '';
      var datej = '';
    }
    else {
      var momentDateDebut = new Date(value.Date_); // Replace event.value with your date value
      datej = moment(momentDateDebut).format("YYYY/MM/DD");
    }
    this.closerv.listeEcartFiltre(datej, this.val, this.val, this.val, this.val).subscribe(res => {
      this.nbr_ligne = 0;
      console.log(res);

      this.nbr_ecart = 0;
      this.resultat = res;
      this.data = res;
      this.filtre = res;
      this.nbr_ligne = this.data.length;
      for (var i = 0; i < this.data.length; i++) {
        this.nbr_ecart = this.nbr_ecart + 1;
        this.resultat[i].date = moment(this.resultat[i].date).format("DD/MM/YYYY")
        // this.resultat[i].montant = this.format.transform(this.resultat[i].montant)
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    });
  }

  Print() {
    window.print();
  }

}