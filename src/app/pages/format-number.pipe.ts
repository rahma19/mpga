import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
res:any;
nombre:any;
number:any;
dernombre:any;
resultat:any;
exp:number;
test:string;

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

  transform(value: any): string {
    // this.test=value.toString();
    
    // this.test=this.test.replace('.',',');
    // console.log('TEST string',this.test);
    // else{
    var puissance=Math.pow(10,this._NbChiffre);
    var str1 = Math.floor(value/puissance);
    var str2 = (value%puissance);
  
    var str3=this.padLeft(str2.toString(),'0',this._NbChiffre);
    // console.log("str1");console.log(str1);
    // console.log("str 2");console.log(str2);
    // console.log("str 3");console.log(str3);
  
 //this.exp=value/(Math.pow(10,this._NbChiffre));
 //console.log(this.exp);
// this.res=value%(Math.pow(10,this._NbChiffre));
//var res=this.exp.toString().split('.');
//this.res=res[1];
 //console.log(this.res)
 //var part=this.exp.toString().split('.');
//console.log(part[0]);
/*this.number= part[0].toString().replace( this.res.toString(),'');
console.log(this.number)*/
this.dernombre=new Intl.NumberFormat('tn', {
  minimumIntegerDigits:1,minimumFractionDigits:3,maximumFractionDigits:3
}).format(Number(str1));
//console.log("this.dernombre");console.log(this.dernombre);
const agent = window.navigator.userAgent.toLowerCase()
if(agent.indexOf('edge') > -1){
this.nombre =this.dernombre.replace('.000',''); 
}
else{
  this.nombre =this.dernombre.replace(',000','');
}
//console.log("this.nombre");console.log(this.nombre);
//if(this.res!=null || this.res!=undefined)

if(this._NbChiffre!=0)
{
//  console.log("this._NbChiffre!=0");
  this.resultat=this.nombre+','+str3
}
else{
 // console.log("this._NbChiffre==0");
  this.resultat=this.nombre
}
/*else if(this.res==0){
  this.resultat=this.nombre+','+;}*/
if (this.resultat !== undefined && this.resultat !== null && this._habillage==true && this._localhabillage=='aprés')
{
 // console.log("this._localhabillage==aprés");
  return this.resultat.concat(' ',this._ValHabbilage);
}
else if (this.resultat !== undefined && this.resultat !== null && this._habillage==true && this._localhabillage=='avant') 
{
 // console.log("this._localhabillage==avant");
  
  return this._ValHabbilage+' '.concat(this.resultat);}
else if (this.resultat !== undefined && this.resultat !== null && this._habillage==false) 
{
 // console.log("this._habillage==false");
  
  return this.resultat;}

  }
//}

  private padLeft(text:string, padChar:string, size:number): string {
    return (String(padChar).repeat(size) + text).substr( (size * -1), size) ;
}
}
