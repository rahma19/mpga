export class DetailTrans {

  public autorisation: string;
  public codeCaisse: string;
  public dateLettrage: string;
  public dateReconciliation: string;
  public dateTransaction: string;
  public etatLettrage: string;
  public etatReconciliation: string;
  public etatTransaction: string;
  public idTransaction: number;
  public libelleCaissier: string;
  public libelleEtablissementFinancier: string;
  public libelleMagasin: string;
  public libelleWallet: string;
  public montant: any;
  public numeroTicket: string;
  public refMpga: string
  public idEtatReconciliation: number;
  public idEtatLettrage: number;
  public typeReconciliation: string;
  public listHistoriques: Array<{ commentaire: string, dateHistorique: any, etatTransaction: string, user: string, date: string }>

  constructor() { }
}