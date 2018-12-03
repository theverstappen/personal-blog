import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MasterComponent } from './components/master/master.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  MasterComponent,
                                  HomeComponent
];