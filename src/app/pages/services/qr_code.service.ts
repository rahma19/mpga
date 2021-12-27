import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {
    constructor(private http:HttpClient,private appConfigService: AppconfigService) { }
    BaseUrl = this.appConfigService.apiBaseUrl;
    
 ListObjectData(){
     return this.http.get(this.BaseUrl+'/ListDataObjectRoot')
 }
 ListObjectDataTemplate(id){
   return this.http.get(this.BaseUrl+'/ListDataObjectTemplateByIdDataObject?id_data_object='+id)
 }
 ListDataObjectAffect(id){
   return this.http.get(this.BaseUrl+'/ListDataObjectByIdProduitFinancier?id_produit_financier='+id)
 }
 Affect(obj){
   return this.http.post(this.BaseUrl+'/AffectationDataObjectProduitFinancier',obj)
 }
 GenererQR(form){
  return this.http.post(this.BaseUrl+'/GenererQrCode',form)
 }

}