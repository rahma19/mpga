import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http:HttpClient,private appConfigService: AppconfigService) { }
  BaseUrl = this.appConfigService.apiBaseUrl;
  filtreagent(val1,val2,val3){
    return this.http.get(this.BaseUrl+'/ListAgentFiltre?id_magasin='+val1+'&id_categorie='+val2+'&id_zone='+val3).pipe(
      retry(3)
    );
  }
listegategorieAgent(){
  return this.http.get(this.BaseUrl+'/ListCategorieAgent');
}
addAgent(form:any){
  return this.http.post(this.BaseUrl+'/AddAgent',form);
}
updateAgent(form:any){
  return this.http.put(this.BaseUrl+'/UpdateAgent',form);
}
getAgentById(id:any){
  return this.http.get(this.BaseUrl+'/GetAgentById?Id_Agent='+id);
}
listMvtAgent(){
  return this.http.get(this.BaseUrl+'/ListMouvementAgent');
}
listTypeMvt(){
  return this.http.get(this.BaseUrl+'/ListTypeMouvementAgent');
}
addMvt(form:any){
  return this.http.post(this.BaseUrl+'/AddMouvementAgent',form);
}
updateMvt(form:any){
  return this.http.put(this.BaseUrl+'/UpdateMouvementAgent',form);
}
annulerMvt(form:any){
  return this.http.put(this.BaseUrl+'/AnnulerMouvementAgent',form);
}
getMvtById(id:any){
  return this.http.get(this.BaseUrl+'/GetMouvementAgentById?Id_MouvementAgent='+id);
}
}
