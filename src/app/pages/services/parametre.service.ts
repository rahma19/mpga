import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  constructor(private http:HttpClient,private appConfigService: AppconfigService) { }
  BaseUrl = this.appConfigService.apiBaseUrl;
  getparametreglobaux(){
    return this.http.get(this.BaseUrl+'/ListParametresGlobaux');
  }
  getparametreById(id:any){
    return this.http.get(this.BaseUrl+'/GetParametreGlobal?Id_Parametre_Global='+id);
  }
  updateparametre(form:any){
    return this.http.put(this.BaseUrl+'/UpdateParametreGlobal',form);
  }
  getlistecategorie(){
    return this.http.get(this.BaseUrl+'/ListCategorieParametresGlobaux');
  }
  etatcloture(){
    return this.http.get(this.BaseUrl+'/ListEtatClotureJournee');
  }
  etatecart(){
    return this.http.get(this.BaseUrl+'/ListEtatAnomalie');
  }
  updateEcartEtat(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatAnomalie',form);
  }
  updateReconciliationtEtat(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatClotureJournee',form);
  }
  updateEtatMouvement(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatMouvementAgent',form);
  }
  updateEtatCaisse(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatCaisse',form);
  }
  updateEtatCategorieAgent(form:any){
    return this.http.put(this.BaseUrl+'/UpdateCategorieAgent',form);
  }
  updateAgentEtat(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatAgent',form);
  }
  etatmouvement(){
    return this.http.get(this.BaseUrl+'/ListEtatMouvementAgent');
  }
  etatAgent(){
    return this.http.get(this.BaseUrl+'/ListEtatAgent');
  }
  etatmagasin(){
    return this.http.get(this.BaseUrl+'/ListEtatMagasin');
  }
  updateEtatmagasin(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatMagasin',form);
  }
  updateEtatCodeerreur(form:any){
    return this.http.put(this.BaseUrl+'/UpdateCodeErreur',form);
  }
  etatcaisse(){
    return this.http.get(this.BaseUrl+'/ListEtatCaisse');
  }
  categorieAgent(){
    return this.http.get(this.BaseUrl+'/ListCategorieAgent');
  }
  codeerreur(){
    return this.http.get(this.BaseUrl+'/ListCodeErreur');
  }
  // EtatWallet(){
  //   return this.http.get(this.BaseUrl+'/ListEtatWallet');
  // }
  EtatWallet(){
    return this.http.get(this.BaseUrl+'/ListEtatProduitFinancier');
  }
  updateEtatWallet(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatProduitFinancier',form);
  }
  // updateEtatWallet(form:any){
  //   return this.http.put(this.BaseUrl+'/UpdateEtatWallet',form);
  // }
  EtatLettrage(){
    return this.http.get(this.BaseUrl+'/ListEtatLettrage');
  }
  updateEtatLettrage(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatLettrage',form);
  }
  EtatReconcilliation(){
    return this.http.get(this.BaseUrl+'/ListEtatReconciliation');
  }
  updateEtatReconcilliation(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatReconciliation',form);
  }
  EtatTransaction(){
    return this.http.get(this.BaseUrl+'/ListEtatTransaction');
  }
  updateEtatTransaction(form:any){
    return this.http.put(this.BaseUrl+'/UpdateEtatTransaction',form);
  }
  UtilisateurSysteme(){
    return this.http.get(this.BaseUrl+'/ListUtilisateurSysteme');
  }
  updateUtilisateurSysteme(form:any){
    return this.http.put(this.BaseUrl+'/UpdateUtilisateurSysteme',form);
  }
}
