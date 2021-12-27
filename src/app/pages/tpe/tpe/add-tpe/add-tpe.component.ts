import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DetailTpe } from 'app/model/detail_tpe';
import { AddPos } from 'app/model/mpga/add_pos';
import { TpeService } from 'app/pages/services/tpe.service';
import { ToastrService } from 'ngx-toastr';
import { DetailsFileComponent } from '../details-file/details-file.component';

@Component({
  selector: 'app-add-tpe',
  templateUrl: './add-tpe.component.html',
  styleUrls: ['./add-tpe.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddTpeComponent implements OnInit {
  tpeform: FormGroup;
  models:any;
  proprietaires:any;
  resultat:any;
  serie:any;
  model:any;
  prop:any;
  marques:any
  marque:any
  versapp:any
  value:any
  detailmodel:any
  nbrcarac:any
  format:any
  errorserie:boolean=false
  msg:string
  isConnectionAvailableMU: boolean = navigator.onLine;
  formradio:FormGroup
  csvArr = []; 
  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  
  fichier:any=''
  ajouter=new AddPos
  mode:any
  isOpened= true ;
isOpened2=false ;
openPop=true
detailsfile:boolean=true

listtpe:Array<{numeroSerie: string;versionApplication: string;idModeleTpe:number;idProprietaireTpe:number}>=[]

  constructor(private dialogRef: MatDialogRef<AddTpeComponent>,private servicetpe:TpeService,private dialog:MatDialog,private fb:FormBuilder,private toast: ToastrService) {
    window.addEventListener('offline', () => {
      this.isConnectionAvailableMU = false
      this.dialogRef.close()
  }); 
   }

  ngOnInit(): void {

    this.formradio=this.fb.group({
      add:['']
    })

    this.tpeform = this.fb.group({
      numeroSerie:new FormControl(''),
      // numeroSerie:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[^\\s][a-zA-Z0-9]+"),Validators.minLength(this.nbrcarac)])),
      idModeleTpe: new FormControl('', Validators.compose([Validators.required])),
      idProprietaireTpe:new FormControl('', Validators.compose([Validators.required])),
      marque_tpe:new FormControl('', Validators.compose([Validators.required])),
      versionApplication: new FormControl('', Validators.compose([Validators.required,Validators.pattern("([0-9]{2}.?){2}")]))
    });
    
    this.servicetpe.getProprietaire().subscribe(res=>{
      this.proprietaires=res;
      console.log(this.proprietaires)
    })
    this.servicetpe.getMarque().subscribe(res=>{
      this.marques=res;
      console.log(this.marques)
    })
    this.tpeform.controls['numeroSerie'].disable()
  }
  Fermer(){
    
    this.dialogRef.close();
  }
  onSubmit(){
    if(this.mode==1 ){
    if(this.tpeform.invalid){
      this.tpeform.get('numeroSerie').markAllAsTouched()
      this.tpeform.get('idModeleTpe').markAllAsTouched()
      this.tpeform.get('idProprietaireTpe').markAllAsTouched()
      this.tpeform.get('versionApplication').markAllAsTouched()
      this.tpeform.get('marque_tpe').markAllAsTouched()
    }
  
    if(this.tpeform.valid){
      this.listtpe.push({numeroSerie: this.serie,versionApplication: this.versapp,idModeleTpe: this.model,idProprietaireTpe:this.prop})

  
      this.ajouter.list_tpe= this.listtpe
  this.servicetpe.addTpe(this.ajouter).subscribe(res=>{
    this.resultat=res;
     this.dialogRef.close("1");
      this.toast.success("TPE a été ajouté avec succès"); 
      this.ngOnInit() 
    }, err => {
     this.resultat=err;
     if(err.status==903){
      this.errorserie=true;
      this.msg="Numéro serie existe déjà"
    }
    else{
     this.dialogRef.close("0");
      this.toast.error("L'ajout a échoué !");
      console.log(err);
    }
  })
  }
}

if(this.mode==2){
  // this.listpos.push({numeroSerie: this.serie,versionApplication: this.version,idModelePos:this.model})
  // console.log(this.listpos)
  // this.ajouter.listPos= this.listpos
  console.log(this.ajouter)

  this.servicetpe.addTpe(this.ajouter).subscribe(res=>{
    this.dialogRef.close("1")
    this.toast.success("TPE a été ajouté avec succès")
    this.ngOnInit()
  },err=>{
    if(err.status==903){
      this.errorserie=true;
      this.msg="Numéro serie existe déjà"
    }
    else{
    this.dialogRef.close("0")
    this.toast.error("L'ajout a échoué !")
    console.log(err)
    }
  })
}
  }
  GetErrorNumSerie(){
    return this.tpeform.get('numeroSerie').hasError('required') ? 'champ Obligatoire ' :
    this.tpeform.get('numeroSerie').hasError('pattern') ? 'invalid! que des lettres et des chiffres' :
    this.tpeform.get('numeroSerie').hasError('minlength') ? 'invalid! il faut '+ this.nbrcarac+' caractéres' :
    this.tpeform.get('numeroSerie').hasError('maxlength') ? 'invalid! max ' + this.nbrcarac+' caractéres' :'';
  }
  GetErrorversion(){
    return this.tpeform.get('versionApplication').hasError('required') ? 'champ Obligatoire ':
    this.tpeform.get('versionApplication').hasError('pattern') ? 'que des chiffres exp 01.01':'';
  }
  reset(){
    this.tpeform.reset()
  }
  OnchangeModel(event:any){
    this.value=event;
    console.log( this.value)
    this.servicetpe.ListModelByIdMarque( this.value).subscribe(res=>{
      this.models=res;
      console.log(this.models)
    })
  }
  modelChange(event:any){
    console.log(this.model)
    this.serie=''
   this.servicetpe.GetModelById(this.model).subscribe(res=>{
    this.tpeform.controls['numeroSerie'].enable()
   
     this.detailmodel=res
     console.log(this.detailmodel)
      this.nbrcarac=this.detailmodel.nombreCaractereNumeroSerie
      // this.format=this.detailmodel.formatNumeroSerie
      this.format="text"
      console.log(this.format)
     console.log(this.nbrcarac)
     this.tpeform.controls['numeroSerie'].setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9]*$/),Validators.minLength(this.nbrcarac),Validators.maxLength(this.nbrcarac)]);              
   })
  
  }
  Numserie(event){
    console.log(this.nbrcarac)
    
  //   this.tpeform = this.fb.group({
  //   numeroSerie:new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[^\\s][a-zA-Z0-9]+"),Validators.minLength(this.nbrcarac)]))
  
  // })
  }

  detail(){
    this.detailsfile=false
    const dialogConfig= new MatDialogConfig;
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="690px";
    dialogConfig.height="500px";
    dialogConfig.maxHeight ="500px";
  dialogConfig.data=this.csvArr
  dialogConfig.hasBackdrop = false;
  const diag=  this.dialog.open(DetailsFileComponent,dialogConfig);
  
    diag.afterClosed().subscribe(() => {
    
  this.detailsfile=true
         this.ngOnInit();
     
    })
    
  }
  
  
  
  
       getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
  
  
        
  
      {
        for (let i = 1; i < csvRecordsArray.length; i++) {  
          let curruntRecord = (<any>csvRecordsArray[i]).split(";");  
          if (curruntRecord.length == headerLength) {  
            // let csvRecord: CSVRecord = new CSVRecord();  
             let csvRecord:Array<{numeroSerie:string,versionApplication:string,idModeleTpe:number,idProprietaireTpe:number}>=[]

          //   csvRecord.numeroSerie = curruntRecord[0];  
          //   csvRecord.versionApplication = curruntRecord[1];  
          //  csvRecord.idModelePos = curruntRecord[2]; 
          
            this.csvArr.push({numeroSerie:curruntRecord[0],versionApplication:curruntRecord[1],idModeleTpe:curruntRecord[2],idProprietaireTpe:curruntRecord[3]});    
            console.log(this.csvArr)   
          }  
          this.ajouter.list_tpe=this.csvArr
        
        
          for(var j=0;j<this.csvArr.length;j++){
            console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',this.csvArr[j]);
  //        
          }
  //        
          console.log(this.csvArr);
          this.ajouter.list_tpe=this.csvArr
          console.log(this.ajouter)
         
        
           
              
        
        
      }
    
        return this.csvArr;
        
        
      }  
  }
  
  
  uploadListener($event: any): void {  

    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<any>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }
  
  
  isValidCSVFile(file: any) {  
    this.fichier= file.name
   console.log(this.fichier)
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<any>csvRecordsArr[0]).split(";");  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } 
  
  Mini()
{

this.openPop=false
this.isOpened=false ;
this.dialogRef.updatePosition({
top:'850px',
right: '20px',
})
this.dialogRef.updateSize("600px", "auto");
this.isOpened2=false ;
}

Maxi()
{ this.openPop=false
this.isOpened2=true;
console.log(this.isOpened2)
this.dialogRef.updatePosition({

})
this.dialogRef.updateSize("600px", "300px");
this.isOpened=true;
}
}
