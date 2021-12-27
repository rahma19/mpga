import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeAgentComponent } from './liste-agent/liste-agent.component';
import { MvtAgentComponent } from './mvt-agent/mvt-agent.component';
import { ParamAgentComponent } from './param-agent/param-agent.component';



const routes: Routes = [
  {
    path: 'agent',
    component: ListeAgentComponent,
    data: {
      breadcrumb: 'Liste agent'
    }
  },
  {
    path: 'mouvement',
    component: MvtAgentComponent,
    data: {
      breadcrumb: 'Mouvement agent'
    }
  },
  {
    path: 'parametres',
    component: ParamAgentComponent,
    data: {
      breadcrumb: 'Paramètres agent'
    }
  }
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AgentRouting { }