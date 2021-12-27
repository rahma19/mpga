 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppconfigService } from './appconfig.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {
  // URL1:string="http://10.12.113.117:2001";
  // URL2:string="http://10.12.113.151:2002";
  // URL3:string="http://10.12.113.117:2003";
  // url4:string="http://10.12.113.150:2004";
  // url6:string="http://10.12.113.150:2006";
  oldbase:string="http://196.203.219.35:2005";
  URLgetway:string="http://196.203.219.34:15005";
  constructor(private http:HttpClient,private appConfigService: AppconfigService) { }
  BaseUrl = this.appConfigService.apiBaseUrl;

  getgouvernorat(){
    return this.http.get(this.BaseUrl+'/ListGouvernorat');
  }
  getvillebyid(id){
    return this.http.get(this.BaseUrl+'/ListVilleByIdGouvernorat?id_gouvernorat='+id);
  }
  getpostalbyid(id){
    return this.http.get(this.BaseUrl+'/GetCodePostalByIdVille?id_ville='+id);
  }
  getetatmagasin(){
    return this.http.get(this.BaseUrl+'/ListEtatMagasin');
  }
  filtremagasin(val2,val3,val4){
    return this.http.get(this.BaseUrl+'/ListMagasinFiltre?code_magasin='+val2+'&id_etat='+val3+'&id_wallet='+val4).pipe(
      retry(3)
    );
  }
  getmagasinbyId(id){
    return this.http.get(this.BaseUrl+'/GetMagasinById?Id_Magasin='+id);
  }
  changeretatmagasin(form){
    return this.http.put(this.BaseUrl+'/ChangeEtatMagasin',form);
  }
  agentbycategorie(val:any){
    return this.http.get(this.BaseUrl+'/ListAgentsByIdCategorie?id_categorie='+val)
  }
  addmagasin(form){
    return this.http.post(this.BaseUrl+'/AddMagasin',form);
  }
  listecaissebymagasin(id){
    return this.http.get(this.BaseUrl+'/ListCaisseByIdMagasin?id_magasin='+id);
  }
  updateCaisse(form){
    return this.http.put(this.BaseUrl+'/UpdateCaisse',form);
  }
  updatemagasin(form){
    return this.http.put(this.BaseUrl+'/UpdateMagasin',form);
  }
  listeagentBymagasin(id){
    return this.http.get(this.BaseUrl+'/ListAgentByIdMagasin?id_magasin='+id);
  }
  getrespzonebyIdzone(id){
    return this.http.get(this.BaseUrl+'/GetZoneGeographiqueById?id_zone='+id);
  }
  listeimpression(){
    return this.http.get(this.BaseUrl+'/ListImpressionQrCode');
  }
  changeEtatWallet(form:any){
    return this.http.put(this.BaseUrl+'/ChangeEtatMagasinWallet',form);
  }
}
