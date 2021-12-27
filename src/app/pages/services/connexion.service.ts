import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService implements OnDestroy {
  interval: any;
  count = 0;
  isConnectionAvailable: boolean = navigator.onLine;
  constructor() {
   }

  //  ngOnDestroy() {
  //   console.log('ngOnDestroy: cleaning up...');
  //   clearInterval(this.interval);
  // }
  ngOnDestroy(){
    console.log('ngOnDestroy: cleaning up...');
      window.removeEventListener('online', () => {
        this.isConnectionAvailable = true
       // this.filtreT();
    });
  
      window.removeEventListener('offline', () => {
        this.isConnectionAvailable = false
    });
  }
}
