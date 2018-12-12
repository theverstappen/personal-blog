import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MasterComponent } from './components/master/master.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { TestComponent } from './components/test/test.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';


const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: 'blog',
        pathMatch: 'full'
      },
      {
        path: 'blog',
        component: HomeComponent,
      },
    ]
  },
  {
    path: 'blog/:link',
    component: MasterComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: SinglePostComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: MasterComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: 'admin/add-post',
    component: MasterComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: AddPostComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: 'admin/edit-post',
    component: MasterComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: EditPostComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: 'test',
    component: MasterComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: TestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  MasterComponent,
  HomeComponent,
  LoginComponent,
  AdminComponent,
  TestComponent,
  AddPostComponent,
  EditPostComponent,
  SinglePostComponent
];