import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { TranslateService } from '@ngx-translate/core';
//import { environment } from 'environments/environment'
@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  dictionaire = {
      'Transactions':{
        'fr':'Transactions', 'en':'Transactions'
      },
      'Dashboard':{
        'fr':'Tableau de bord', 'en':'Dashboard'
      },
      'Daily recap':{
        'fr':'Récapitulatif journalier', 'en':'Daily recap'
      },
      'Monthly recap':{
        'fr':'Récapitulatif mensuel', 'en':'Monthly recap'
      },
      'My statistics':{
        'fr': 'Mes statistiques', 'en':'My statistics'
      },
     
      'Clôture journée':{
        'fr': 'Clôture journée', 'en':'Day close'
      },
      'Réconciliation':{
        'fr': 'Réconciliation', 'en':'Reconciliation'
      },
      'Réconciliation manuelle':{
        'fr': 'Réconciliation manuelle', 'en':'Reconciliation'
      },
      'Ecart':{
        'fr': 'Ecart', 'en':'Difference'
      },
      'Etat Mensuel':{
        'fr': 'Etat Mensuel', 'en':'Monthly State'
      },
    
      'Mes Transactions':{
        'fr': 'Mes Transactions', 'en':'Mes Transactions'
      },
      'Liste transactions':{
        'fr': 'Liste transactions', 'en':'Transaction list'
      },
      'Consultation transaction':{
        'fr': 'Consultation transaction', 'en':'Consultation transaction'
      },
      'Magasins':{
        'fr': 'Magasins', 'en':'Stores'
      },
      'Paramètres':{
        'fr': 'Paramètres', 'en':'Settings'
      },
      'Liste des Transactions':{
        'fr': 'Liste des Transactions', 'en':'List of Transactions'
      },
      'Recherche Transaction':{
        'fr': 'Recherche Transaction', 'en':'Search transaction'
      },
      'Agent réseau':{
        'fr': 'Agent réseau', 'en':'Network Agent'
      },
      'Liste des agents':{
        'fr': 'Liste des agents', 'en':'List of agents'
      },
      'Mouvement des agents':{
        'fr': 'Mouvement des agents', 'en':'Movement of agents'
      },
      'Paramètres agent':{
        'fr': 'Paramètres agent', 'en':'Agent settings'
      },
      'Configuration':{
        'fr': 'Configuration', 'en':'Configuration'
      },
      'EMV QR Code':{
        'fr': 'EMV QR Code', 'en':'EMV QR Code'
      },
   
      'Services de Paiement':{
        'fr': 'Services de Paiement', 'en':'Payment Services'
      },
      'Etablissemets Financiers':{
        'fr': 'Etablissemets Financiers', 'en':'Financial Establishments'
      },
      'TPE':{
        'fr': 'TPE', 'en':'TPE'
      },
  }
  constructor(private http: HttpClient, private translate: TranslateService) { }
  getlang(value: string) {
   if(environment.language == null || environment.language == undefined){
     environment.language = 'fr'
   }
  // return this.translate.instant(value)
    return this.dictionaire[value][environment.language]
  }
}
