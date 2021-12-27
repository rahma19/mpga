import { Menu } from './menu.model';

export const verticalMenuItems = [
        new Menu(1, 'Transactions', null, null, 'help', null, true, 0,["Administrateur","Chef de projet"]), 
        new Menu(12, 'Liste transactions','/pages/transaction/transaction', null, '', null, false, 1,["Administrateur","Chef de projet"]),
        new Menu(13, 'Consultation transaction','/pages/transaction/consultertransaction', null, '', null, false, 1,["Administrateur","Chef de projet"]),
        new Menu(2, 'Magasins', '/pages/magasin/magasin', null, '', null, false, 0,["Administrateur","Chef de projet"]),
        new Menu(3, 'Services de Paiement', null, null, 'help', null, true, 0,["Administrateur","Chef de projet"]), 
        new Menu(31, 'Etablissemets Financiers','/pages/service_paiement/service_paiement', null, '', null, false, 3,["Administrateur","Chef de projet"]),
        new Menu(4, 'Configuration', null, null, 'help', null, true, 0,["Administrateur","Chef de projet"]), 
        new Menu(41,  'TPE','/pages/tpe/tpe', null, '', null, false, 4,["Administrateur","Chef de projet"]),
        new Menu(42, 'EMV QR Code','/pages/configuration/configuration', null, '', null, false, 4,["Administrateur","Chef de projet"]),
       
      
        new Menu(5, 'Clôture journée', null, null, 'help', null, true, 0,["Administrateur","Chef de projet"]), 
        new Menu(51, 'Réconciliation','/pages/cloture/reconciliation', null, '', null, false, 5,["Administrateur","Chef de projet"]),
        new Menu(52, 'Ecart', '/pages/cloture/ecart', null, '', null, false, 5,["Administrateur","Chef de projet"]),
       
      
        // new Menu(4, 'Agent réseau', null, null, 'help', null, true, 0,["Administrateur","Chef de projet"]), 
        // new Menu(41, 'Liste des agents','/pages/agent/agent', null, '', null, false, 4,["Administrateur","Chef de projet"]),
        // new Menu(42, 'Mouvement des agents', '/pages/agent/mouvement', null, '', null, false, 4,["Administrateur","Chef de projet"]),
       // new Menu(43, 'Paramètres agent', '/pages/agent/parametres', null, '', null, false, 4,["Administrateur","Chef de projet"]),
    //    new Menu(6, 'TPE','/pages/tpe/tpe', null, '', null, false, 0,["Administrateur","Chef de projet"]), 
        new Menu(6, 'Paramètres','/pages/parametre/parametre', null, '', null, false, 0,["Administrateur","Chef de projet"]), 
]
export const verticalmenuitems = [
    // new Menu(1, 'Transactions','/pages/transaction-topup/htopup', null, '', null, false, 0,["Administrateur","Chef de projet"]),
    // new Menu(2, 'Affilies', '/pages/affilie/affilie', null, '', null, false, 0,["Administrateur","Chef de projet"]),
    // new Menu(3, 'Points de vente', '/pages/vente/vente', null, '', null, false, 0,["Administrateur","Chef de projet"]),
    // new Menu(4, 'Gestionnaire de parc', '/pages/gestionnaire/gestionnaire', null, '', null, false, 0,["Administrateur","Chef de projet"]),
    // new Menu(5, 'Gestion Terminaux', null, null, 'help', null, true, 0,["Administrateur","Chef de projet"]),
    // new Menu(51, 'Terminaux','/pages/terminal/terminal', null, '', null, false, 5,["Administrateur","Chef de projet"]),
    // new Menu(6, 'Gestion financière', null,null, 'help', null, true, 0,["Administrateur","Chef de projet"]),
    // new Menu(61, 'Mes mouvements', '/pages/gestionfinanciere/gestionfinanciere', null, '', null, false, 6,["Administrateur","Chef de projet"]),
    // new Menu(62, 'Mes encaissements', '/pages/gestionfinanciere/encaissement', null, '', null, false, 6,["Administrateur","Chef de projet"]),
    // new Menu(7, 'Cloture', '/pages/cloturejournee/cloturejournee', null, '', null, false, 0,["Administrateur","Chef de projet"]),
]
export const verticalaffitems = [
    // new Menu(1, 'Transactions','/pages/transaction-topup/htopup', null, '', null, false, 0,["Administrateur","Chef de projet"]),
    // new Menu(2, 'Points de vente', '/pages/vente/vente', null, '', null, false, 0,["Administrateur","Chef de projet"]),
]
export const verticalventeitems = [
    //new Menu(1, 'Transactions','/pages/transaction-topup/htopup', null, '', null, false, 0,["Administrateur","Chef de projet"]),
]
export const horizontalMenuItems = [
    new Menu(1, 'Dashboard','/pages/dashboard', null, 'tachometer', null, false, 0,["Administrateur","Responsable affilie"]),

    new Menu(2, 'Gestion des clients', null, null, 'user-circle', null, true, 0,["Administrateur","Responsable affilie"]),
    new Menu(20, 'Clients','/pages/gestionclient/clients', null, 'address-card', null, false, 2,["Administrateur","Responsable affilie"]),
    new Menu(21, 'Groupes','/pages/gestionclient/groupes', null, 'users', null, false, 2,["Administrateur","Responsable affilie"]),
    new Menu(22, 'Porteurs', '/pages/gestionclient/porteurs', null, 'user', null, false, 2,["Administrateur","Responsable affilie"]),
    new Menu(3, 'Gestion des comptes', '/pages/gestioncomptes', null, null, null, true, 0,["Administrateur","Responsable affilie"]),
    new Menu(23, 'Comptes','/pages/gestioncomptes/comptes', null, 'fa-coins', null, false, 3,["Administrateur","Responsable affilie"]),
    new Menu(4, 'Gestion des Cartes','/pages/gestioncartes', null, null, null, true, 0,["Administrateur","Responsable affilie"]),
    new Menu(24, 'Cartes', '/pages/gestioncartes/cartes', null, 'fa-credit-card', null, false, 4,["Administrateur","Responsable affilie"])
]
