import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppconfigService } from './appconfig.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private appConfig: any;
  //BaseUrl: string;
  // URL:string="http://10.12.113.150:2001";
  // URL2:string="http://10.12.113.150:2002";
  // URL3:string="http://10.12.113.150:2003";
  oldbase: string = "http://196.203.219.35:2005";
  URLgetway: string = "http://196.203.219.34:15005";
  baseUrl: string = "http://196.203.219.36:1555";
  transUrl: string = "http://10.12.113.152:15213/Transaction";

  constructor(private http: HttpClient, private appConfigService: AppconfigService) { }

  BaseUrl = this.appConfigService.apiBaseUrl;
  //account  
  updatePassword(formData) {
    return this.http.put(this.baseUrl + '/UpdatePassword', formData);

  }
  GetAccount() {
    return this.http.get(this.baseUrl + '/GetAccount')
  }
  updateAccount(formData) {
    return this.http.put(this.baseUrl + '/UpdateAccount', formData);
  }
  userLevel() {
    return this.http.get(this.baseUrl + '/GetUserClaims');
  }
  //account
  getEtablissement() {
    return this.http.get(this.BaseUrl + '/ListEtablissementFinancier');
  }
  // listewallet(id:any=''){
  //   return this.http.get(this.BaseUrl+'/ListWalletFiltre?id_etablissement_financier='+id);
  // }
  listewallet(id: any = '') {
    return this.http.get(this.BaseUrl + '/ListProduitFinancierFiltre?id_etablissement_financier=' + id);
  }
  walletbymagasin(id) {
    return this.http.get(this.BaseUrl + '/ListWalletByIdMagasin?id_magasin=' + id);
  }
  etatTransaction() {
    return this.http.get(this.BaseUrl + '/ListEtatTransaction');
  }
  etatReconciliation() {
    return this.http.get(this.BaseUrl + '/ListEtatReconciliation');
  }
  etatLettrage() {
    return this.http.get(this.BaseUrl + '/ListEtatLettrage');
  }
  getTransactionFiltre(val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11) {
    return this.http.get(this.BaseUrl + '/ListTransactionFiltre?etablissement_financier=' + val1 + '&wallet=' + val2 + '&magasin=' + val3 + '&date_debut=' + val4 + '&date_fin=' + val5 + '&montant_inf=' + val6 + '&montant_sup=' + val7 + '&id_etat_transaction=' + val8 + '&id_etat_lettrage=' + val9 + '&id_etat_reconciliation=' + val10 + '&zone=' + val11).pipe(
      retry(3)
    );
  }
  ConsulterTransactionref(ref: any) {
    return this.http.get(this.BaseUrl + '/GetTransactionByRefMPGA?ref_mpga=' + ref);
  }
  ConsulterTransactionauto(auto: any) {
    return this.http.get(this.BaseUrl + '/GetTransactionByAutorisation?autorisation=' + auto);
  }
  getZone() {
    return this.http.get(this.BaseUrl + '/ListZoneGeographique');
  }
  getParametre(idcatg: any) {
    return this.http.get(this.BaseUrl + '/ListParametreByIdCategorie?id_categorie=' + idcatg);
  }

  getTransactionById(id) {
    return this.http.get(`${this.transUrl}/GetTransactionByIdTransaction?id_transaction=${id}&user_level=` + - 1);

  }

}

