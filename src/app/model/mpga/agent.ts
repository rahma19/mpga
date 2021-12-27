export class Agent{
    
    public idAgent:number
    public matricule: string
    public nom: string
    public prenom: string
    public mobile: string
    public email: string
    public categorieAgent: string
    public idCategorieAgent: number
    public idMagasin:number
    public magasin:string
    public zone:string
    public etatAgent:string
    public idEtatAgent:number
    public listHistoriqueMouvementAgent=[];
  constructor(){}
}