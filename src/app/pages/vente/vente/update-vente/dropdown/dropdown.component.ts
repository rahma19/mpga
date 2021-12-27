import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MagasinService } from 'app/pages/services/magasin.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements OnInit {
  @Input() value;
  liste:any;
  yourModelStore: any;
  listeImpre=[];
  constructor(private mag:MagasinService) { }

  ngOnInit(): void {
    this.mag.listeimpression().subscribe((res:any)=>{
      this.liste=res;
     // console.log('liste here !!!',this.liste);
      this.liste.forEach(element => {
        this.listeImpre.push({qrCode:element.idImpressionQr, libelle:element.libelle});
       // console.log('liste here second',this.listeImpre);
      });
    })
  }

}
