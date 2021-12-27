import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  res:any;
  nombre:any;
  number:any;
  dernombre:any;
  resultat:any;
  exp:number;
  
    private _NbChiffre: number;
    private _habillage: boolean;
    private _localhabillage: string;
    private _ValHabbilage: string;
    public set localhabillage(value: string) {
      this._localhabillage = value;
    }
    public set ValHabbilage(value: string) {
      this._ValHabbilage = value;
    }
    public set habillage(value: boolean) {
      this._habillage = value;
    }
    public set NbChiffre(value: number) {
      this._NbChiffre = value;
    }
  
  constructor(){
    this._NbChiffre=3;
    this._habillage = true;
    this._localhabillage='aprés';
    this._ValHabbilage="";
  }
  
    transform(value: number): string {
      var puissance=Math.pow(10,this._NbChiffre);
      var str1 = Math.floor(value/puissance);
      var str2 = (value%puissance);
    
      var str3=this.padLeft(str2.toString(),'0',this._NbChiffre);
  this.dernombre=new Intl.NumberFormat('tn', {
    minimumIntegerDigits:1,minimumFractionDigits:3,maximumFractionDigits:3
  }).format(Number(str1));
  //console.log(this.dernombre)
  this.nombre =this.dernombre.replace(',000',''); 
  //if(this.res!=null || this.res!=undefined)
  if(this._NbChiffre!=0)
  {this.resultat=this.nombre+','+str3}
  else{this.resultat=this.nombre}
  /*else if(this.res==0){
    this.resultat=this.nombre+','+;}*/
  if (this.resultat !== undefined && this.resultat !== null && this._habillage==true && this._localhabillage=='aprés')
  {
    return this.resultat.concat(' ',this._ValHabbilage);
  }
  else if (this.resultat !== undefined && this.resultat !== null && this._habillage==true && this._localhabillage=='avant') 
  {return this._ValHabbilage+' '.concat(this.resultat);}
  else if (this.resultat !== undefined && this.resultat !== null && this._habillage==false) 
  { return this.resultat;}
  
    }
  
    private padLeft(text:string, padChar:string, size:number): string {
      return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
  }

}
