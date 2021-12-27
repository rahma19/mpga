import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppconfigService } from './appconfig.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClotureService {
 // url7:string="http://10.12.113.150:2007";
 oldbase:string="http://196.203.219.35:2005";
 URLgetway:string="http://196.203.219.34:15005";
 // URLgetway:string="http://196.203.219.35:2005";
  constructor(private http:HttpClient,private appConfigService: AppconfigService) { }
  BaseUrl = this.appConfigService.apiBaseUrl;

  listecloture(d1,d2,wallet){
    return this.http.get(this.BaseUrl+'/ListClotureJourneeFiltre?date_debut='+d1+'&date_fin='+d2+'&id_produit_financier='+wallet).pipe(
      retry(3)
    );
  }
  listeEcartFiltre(val1,val2,val3,val4,val5){
    return this.http.get(this.BaseUrl+'/ListEcartFiltre?date='+val1+'&code_magasin='+val2+'&id_zone='+val3+'&id_gouvernorat='+val4+'&id_ville='+val5).pipe(
      retry(3)
    );
  }
  ecartbyId(id){
    return this.http.get(this.BaseUrl+'/ListEcartByIdCloture?id_cloture='+id);
  }
  cloturemanuel(var1:any,val2:any){
    return this.http.get(this.BaseUrl+'/ClotureJournee?date_cloture='+var1+'&id_type_cloture=2&motif_reconciliation_manuelle='+val2);
  }
  reconById(id:any){
    return this.http.get(this.BaseUrl+'/GetClotureJourneeById?Id_ClotureJournee='+id);
  }
  magasinByIdrecon(id:any){
    return this.http.get(this.BaseUrl+'/ListMagasinNonReconcilieByIdCloture?id_cloture='+id);
  }
  validercloture(id:any){
    return this.http.get(this.BaseUrl+'/ValiderClotureJournee?Id_ClotureJournee='+id);
  }
  getEcartDetail(id:any){
    return this.http.get(this.BaseUrl+'/GetEcartById?Id_Ecart='+id);
  }
 
}
