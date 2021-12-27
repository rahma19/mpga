import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http: HttpClient, private appConfigService: AppconfigService) { }
  baseUrl = this.appConfigService.apiBaseUrl;

  ListProduitFinancietByCat(id) {
    return this.http.get(this.baseUrl + '/ListProduitFinancierByIdCategorie?id_categorie=' + id)
  }
  ListCategoriesEtablissement() {
    return this.http.get(this.baseUrl + '/ListCategorieEtablissementFinancier')
  }
  ListCategoriesProduits() {
    return this.http.get(this.baseUrl + '/ListCategorieProduitFinancier')
  }
  CanalPaiement() {
    return this.http.get(this.baseUrl + '/ListCanalPaiement')
  }
  // AssociationProduit_canal(){
  //  return this.http.get(this.baseUrl+'/')
  // }
  UpdateCategorieEtablissement(form) {
    return this.http.put(this.baseUrl + '/UpdateCategorieEtablissementFinancier', form)
  }
  UpdateCategorieProduitFinancier(form) {
    return this.http.put(this.baseUrl + '/UpdateCategorieProduitFinancier', form)
  }
  UpdateCanalPaiement(form) {
    return this.http.put(this.baseUrl + '/UpdateCanalPaiement', form)
  }
  listebinfiltre(val1, val2) {
    return this.http.get(this.baseUrl + '/ListBinFiltre?id_emetteur=' + val1 + '&id_acquereur=' + val2);
  }

  AddBin(form) {
    return this.http.post(this.baseUrl + '/AddBin', form);
  }
  GetBin(id) {
    return this.http.get(this.baseUrl + '/GetBinById?IdBin=' + id)
  }
  UpdateBin(form) {
    return this.http.put(this.baseUrl + '/UpdateBin', form);
  }
  DeleteBin(id) {
    return this.http.delete(this.baseUrl + '/DeleteBin?IdBin=' + id)
  }
  ListEtablissementFinancier() {
    return this.http.get(this.baseUrl + '/ListEtablissementFinancier')
  }
  AddEtablissement(form) {
    return this.http.post(this.baseUrl + '/AddEtablissementFinancier', form)
  }
  ListTypeIdentification() {
    return this.http.get(this.baseUrl + '/ListTypeIdentification')
  }
  UpdateEtablissement(form) {
    return this.http.put(this.baseUrl + '/UpdateEtablissementFinancier', form)
  }
  ListProduitByEtablissement(id) {
    return this.http.get(this.baseUrl + '/ListProduitFinancierByIdEtablissementFinancier?id_etablissement=' + id)
  }
  AffectationCanalPaiementProduit(form) {
    return this.http.post(this.baseUrl + '/AffectationCanalPaiementProduitFinancier', form)
  }
  getCanatProduitById(produit, canal) {
    return this.http.get(this.baseUrl + '/GetCanalPaiementProduitFinancierById?id_produit_financier=' + produit + '&id_canal_paiment=' + canal)
  }
  ListEmetteur() {
    return this.http.get(this.baseUrl + '/ListEmetteur')
  }
  ListWallet(id: any = '') {
    return this.http.get(this.baseUrl + '/ListProduitFinancierFiltre?id_etablissement_financier=' + id)
  }
  listAfNonOk(id) {
    return this.http.get(this.baseUrl + "/ListAffiliationNonOk?id_produit=" + id + "&user_level=-1")
  }
  listAffMonetique() {
    return this.http.get(this.baseUrl + "/ListAffiliationMonetique?user_level=-1")
  }
}
