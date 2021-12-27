import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { TestPipe } from 'app/pages/shared/test.pipe';
import { TransactionService } from 'app/pages/services/transaction.service';
import { DetailTrans } from 'app/model/mpga/detailtrans';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transaction-test',
  templateUrl: './transaction-test.component.html',
  styleUrls: ['./transaction-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TransactionTestComponent implements OnInit {
  filterform: FormGroup;
  myControl: FormControl = new FormControl();
  filter: any = false;
  settings: any;
  data: boolean = false;
  identifiant: any;
  autorisation: string = "-------------";
  codeCaisse: string = "-------------";
  dateLettrage: any = "--/--/----  -- : --";
  dateReconciliation: any = "--/--/----  -- : --";
  dateTransaction: any = "--/--/----  -- : --";
  etatLettrage: string = "-------------";
  etatReconciliation: string = "-------------";
  etatTransaction: string = "-------------";
  idTransaction: number;
  libelleCaissier: string = "-------------";
  libelleEtablissementFinancier: string = "-------------";
  libelleMagasin: string = "-------------";
  libelleWallet: string = "-------------";
  montant: any = "-------------";
  numeroTicket: string = "-------------";
  refMpga: string = "-------------";
  idlettrage: any = "-------------";
  idreconciliation: any = "-------------";
  active: boolean
  currentDate = new Date();
  id = 3
  parametres: any
  adresse: any = "-------------";
  ville: any = "-------------";
  code: any = "-------------";
  tel: any = "-------------";
  rne: any = "-------------";
  detail = new DetailTrans
  resultat: any;
  message: any;
  critere: any = "-------------";
  loading = false;
  check = false;
  date: any;
  mySubscription: any;
  typerecons: string = "-------------";
  isConnectionAvailable: boolean = navigator.onLine;

  constructor(private fb: FormBuilder, private dialog: MatDialog,
    private router: Router, private format: TestPipe,
    private Transaction: TransactionService, private translate: TranslateService) {
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

  ngOnInit() {
    this.date = moment(this.currentDate).format("DD/MM/YYYY");
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
    this.filterform = this.fb.group({
      critere_rech: [''],
      ident_critere: new FormControl('', Validators.compose([Validators.required])),
    })
  }

  Rechercher(value) {
    this.active = false;
    this.data = false;
    if (value.critere_rech == 0) {
      this.loading = true;
      this.Transaction.ConsulterTransactionref(value.ident_critere).subscribe((res: DetailTrans) => {
        this.getDetails(res);
        this.autorisation = res.autorisation;
        this.codeCaisse = res.codeCaisse;
        this.idlettrage = res.idEtatLettrage;
        if (this.idlettrage == 2) {
          this.dateLettrage = res.dateLettrage;
          this.dateLettrage = moment(this.dateLettrage).format("DD/MM/YYYY HH:mm");
        }
        this.idreconciliation = res.idEtatReconciliation;
        if (this.idreconciliation == 2) {
          this.dateReconciliation = res.dateReconciliation;
          this.dateReconciliation = moment(this.dateReconciliation).format("DD/MM/YYYY HH:mm");
        }
        this.typerecons = res.typeReconciliation;
        this.dateTransaction = res.dateTransaction;
        this.dateTransaction = moment(this.dateTransaction).format("DD/MM/YYYY HH:mm");
        this.etatTransaction = res.etatTransaction;
        this.libelleCaissier = res.libelleCaissier;
        this.libelleEtablissementFinancier = res.libelleEtablissementFinancier;
        this.libelleMagasin = res.libelleMagasin;
        this.libelleWallet = res.libelleWallet;
        this.montant = res.montant;
        this.montant = this.format.transform(this.montant);
        this.numeroTicket = res.numeroTicket;
        this.refMpga = res.refMpga;
        this.active = true
      }, err => {
        if (err.status == 900) {
          this.initData();
        }
        this.loading = false;
      })
    }
    else if (value.critere_rech == 1) {
      this.loading = true;
      this.Transaction.ConsulterTransactionauto(value.ident_critere).subscribe((res: DetailTrans) => {
        this.getDetails(res);
        this.typerecons = res.typeReconciliation;
        this.autorisation = res.autorisation;
        this.codeCaisse = res.codeCaisse;
        this.dateLettrage = res.dateLettrage;
        this.dateReconciliation = res.dateReconciliation;
        this.dateTransaction = res.dateTransaction;
        this.etatTransaction = res.etatTransaction;
        this.libelleCaissier = res.libelleCaissier;
        this.libelleEtablissementFinancier = res.libelleEtablissementFinancier;
        this.libelleMagasin = res.libelleMagasin;
        this.libelleWallet = res.libelleWallet;
        this.montant = res.montant;
        this.montant = this.format.transform(this.montant);
        this.numeroTicket = res.numeroTicket;
        this.refMpga = res.refMpga;
        this.active = true
      }, err => {
        if (err.status == 900) {
          this.initData();
        }
        this.loading = false;
      })
    }
  }

  getDetails(res) {
    this.resultat = res;
    this.loading = false;
    this.detail.refMpga = res.refMpga
    this.detail.autorisation = res.autorisation
    this.detail.libelleEtablissementFinancier = res.libelleEtablissementFinancier
    this.detail.libelleWallet = res.libelleWallet
    this.detail.libelleMagasin = res.libelleMagasin
    this.detail.libelleCaissier = res.libelleCaissier
    this.detail.montant = res.montant
    this.detail.montant = this.format.transform(this.detail.montant)
    this.detail.numeroTicket = res.numeroTicket
    this.detail.codeCaisse = res.codeCaisse
    this.detail.etatTransaction = res.etatTransaction
    this.detail.idEtatReconciliation = res.idEtatReconciliation
    this.detail.idEtatLettrage = res.idEtatLettrage
    this.detail.dateLettrage = res.dateLettrage
    this.detail.dateReconciliation = res.dateReconciliation
    this.detail.dateTransaction = res.dateTransaction
    this.detail.listHistoriques = res.listHistoriques
    for (var i = 0; i < this.detail.listHistoriques.length; i++) {
      this.detail.listHistoriques[i].date = this.detail.listHistoriques[i].dateHistorique.substring(10, 0)
      this.detail.listHistoriques[i].date = moment(this.detail.listHistoriques[i].date).format("DD/MM/YYYY")
    }
    this.detail.dateTransaction = moment(this.detail.dateTransaction).format("DD/MM/YYYY HH:mm")
    this.detail.dateReconciliation = moment(this.detail.dateTransaction).format("DD/MM/YYYY HH:mm")
    this.data = true;
  }

  initData() {
    this.autorisation = "-------------";
    this.codeCaisse = "-------------";
    this.dateLettrage = "--/--/----  -- : --";
    this.dateReconciliation = "--/--/----  -- : --";
    this.dateTransaction = "--/--/----  -- : --";
    this.etatLettrage = "-------------";
    this.etatReconciliation = "-------------";
    this.etatTransaction = "-------------";
    this.libelleCaissier = "-------------";
    this.libelleEtablissementFinancier = "-------------";
    this.libelleMagasin = "-------------";
    this.libelleWallet = "-------------";
    this.montant = "-------------";
    this.numeroTicket = "-------------";
    this.refMpga = "-------------";
    this.idlettrage = "-------------";
    this.idreconciliation = "-------------";
    this.adresse = "-------------";
    this.ville = "-------------";
    this.code = "-------------";
    this.tel = "-------------";
    this.rne = "-------------";
    this.critere = "-------------";
    this.typerecons = "-------------";
  }

  show() {
    this.filter ? this.filter = false : this.filter = true;
  }

  Print() {
    window.print();
  }

}
