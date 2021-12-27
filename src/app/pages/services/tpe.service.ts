import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class TpeService {

  constructor(private http:HttpClient,private appConfigService: AppconfigService) { }
  baseUrl = this.appConfigService.apiBaseUrl;
 
  getTpe() {
    return this.http.get(this.baseUrl + '/ListTpe')
  }
  listeTpefiltre(val1,val2,val3,val4,val5){
    return this.http.get(this.baseUrl+'/ListTpeFiltre?numero_serie='+val1+'&id_marque='+val2+'&id_modele='+val3+'&id_etat='+val4+'&id_magasin='+val5);
  }
  getMarque(){
    return this.http.get(this.baseUrl+'/ListMarque');
  }
  getModel(){
    return this.http.get(this.baseUrl+'/ListModel');
  }
  getProprietaire(){
    return this.http.get(this.baseUrl+'/ListProprietaire');
  }
  
  ListEtatTpe(){
    return this.http.get(this.baseUrl+'/ListEtatTpe');
  }
  addTpe(form){
    return this.http.post(this.baseUrl+'/AddTpe',form);
  }
  updateTpe(form){
    return this.http.put(this.baseUrl+'/UpdateTpe',form);
  }
  detailTpe(id){
    return this.http.get(this.baseUrl+'/GetTpeById?id_tpe='+id);
  }
  listetpeNonAffecter(){
    return this.http.get(this.baseUrl+'/ListTpeNonAffecter');
  }
  changeEtat(id){
    return this.http.get(this.baseUrl+'/ChangeEtatTpe?id_tpe='+id);
  }
  ListModelByIdMarque(id){
    return this.http.get(this.baseUrl+'/ListModelByIdMarque?IdMarque='+id)
  }
GetModelById(id){
  return this.http.get(this.baseUrl+'/GetModeleTpeById?id_modele_tpe='+id)
}
ListOs(){
  return this.http.get(this.baseUrl+'/ListOsTpe')
}
ListCategorie(){
  return this.http.get(this.baseUrl+'/ListCategorieTpe')
}
UpdateMarque(form){
  return this.http.put(this.baseUrl+'/UpdateMarqueTpe',form)
}
UpdateCategorie(form){
  return this.http.put(this.baseUrl+'/UpdateCategorieTpe',form)
}
UpdateOS(form){
  return this.http.put(this.baseUrl+'/UpdateOsTpe',form)
}
UpdateProprietaire(form){
  return this.http.put(this.baseUrl+'/UpdateProprietaireTpe',form)
}
UpdateEtatTPE(form){
  return this.http.put(this.baseUrl+'/UpdateEtatTpe',form)
}
UpdateModeleTPE(form){
  return this.http.put(this.baseUrl+'/UpdateModeleTpe',form)
}
}
