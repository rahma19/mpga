import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppconfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient,private appConfigService: AppconfigService) { }
  baseUrl = this.appConfigService.apiBaseUrl;
  updateservice(formData){
    return this.http.put(this.baseUrl+'/UpdateMagasinWallet',formData);

  }
}
