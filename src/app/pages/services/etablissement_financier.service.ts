import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class EtablissementFinancierService {
    constructor(private http:HttpClient,private appConfigService: AppconfigService) { }
    BaseUrl = this.appConfigService.apiBaseUrl;
    
//  ListEmetteur(id){
//      return this.http.get(this.BaseUrl+'/ListProduitFinancierByIdCategorie?id_categorie='+id)
//  }
// ListCategoriesEtablissement(){
//   return this.http.get(this.BaseUrl+'/ListCategorieEtablissementFinancier')
// }
// ListCategoriesProduits(){
//   return this.http.get(this.BaseUrl+'/ListCategorieProduitFinancier')
// }
// CanalPaiement(){
//   return this.http.get(this.BaseUrl+'/ListCanalPaiement')
// }
// AssociationProduit_canal(){
//   return this.http.get(this.BaseUrl+'/ListEtablissementFinancier')
// }
// UpdateCategorieEtablissement(form){
//   return this.http.put(this.BaseUrl+'/UpdateCategorieEtablissementFinancier',form)
// }
// UpdateCategorieProduitFinancier(form){
//   return this.http.put(this.BaseUrl+'/UpdateCategorieProduitFinancier',form)
// }
// UpdateCanalPaiement(form){
//   return this.http.put(this.BaseUrl+'/UpdateCanalPaiement',form)
// }
}