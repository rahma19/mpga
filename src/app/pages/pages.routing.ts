import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';


export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'pages', pathMatch: 'full' },
            { path: 'transaction' ,  
            //loadChildren: 'app/pages/transaction-topup/transaction-topup.module#TransactionTopupModule'
            loadChildren: () => import('app/pages/transaction-topup/transaction-topup.module').then(m => m.TransactionTopupModule),
            //data: { breadcrumb: 'Transactions' }
        },
            { path: 'password' ,
            loadChildren: () => import('app/pages/password/password.module').then(m => m.PasswordModule),
            data: { breadcrumb: 'Mot de passe' }},
            { path: 'profile' ,  
            loadChildren: () => import('app/pages/profile/profile.module').then(m => m.ProfileModule),
           // data: { breadcrumb: 'Compte' }
        },
            { path: 'magasin' ,  
            //loadChildren: 'app/pages/vente/vente.module#VenteModule',
            loadChildren: () => import('app/pages/vente/vente.module').then(m => m.VenteModule),
           // data: { breadcrumb: 'Magasins'} 
        },
            {path:'cloture', 
            //loadChildren: 'app/pages/cloture/cloture.module#ClotureModule',
            loadChildren: () => import('app/pages/cloture/cloture.module').then(m => m.ClotureModule),
          //  data: { breadcrumb: 'Cloture' }
        },
            {path:'parametre', 
            //loadChildren: 'app/pages/parametre/parametre.module#ParametreModule',
            loadChildren: () => import('app/pages/parametre/parametre.module').then(m => m.ParametreModule),
          //  data: { breadcrumb: 'Paramètre' }
        },
        {path:'agent', 
            //loadChildren: 'app/pages/parametre/parametre.module#ParametreModule',
            loadChildren: () => import('app/pages/agent/agent.module').then(m => m.AgentModule),
          //  data: { breadcrumb: 'Paramètre' }
        },
            
        {path:'configuration', 
        
        loadChildren: () => import('app/pages/configuration/configuration.module').then(m => m.ConfigurationModule),
     
    },  
    {path:'service_paiement', 
        
    loadChildren: () => import('app/pages/paiement/paiement.module').then(m => m.PaiementModule),
 
},  
{path:'tpe', 
        
loadChildren: () => import('app/pages/tpe/tpe.module').then(m => m.TpeModule),

},  


        ]

    }
];

export const routing: ModuleWithProviders<any> = RouterModule.forChild(routes);