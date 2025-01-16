import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './full/full.component';
import { LoginComponent } from './login/login.component';
import { RegisterTenantComponent } from './register-tenant/register-tenant.component';
import { RegisterOwnerComponent } from './register-owner/register-owner.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { AdminauthguardService } from './services/adminauthguard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdateOwnerComponent } from './update-owner/update-owner.component';
import {PublicationComponent} from './publication/publication.component';
import { ProfilComponent } from './profil/profil.component';
import { TaskComponent } from './task/task.component';
import { LogementComponent } from './logement/logement.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
     { path: 'registerTenant', component: RegisterTenantComponent },
     { path: 'registerOwner', component: RegisterOwnerComponent },
     { path: 'forgotPassword', component: ForgotPasswordComponent },
     { path: 'publication', component: PublicationComponent },
     { path: 'profil', component: ProfilComponent },
     { path: 'tasks', component: TaskComponent },
     { path: 'logement', component: LogementComponent },
     { path: 'chat', component: ChatComponent },

]
},
{
  path: 'dashboard', component:DashboardAdminComponent,
  // canActivate:[AdminauthguardService],
  children: [
    { path: 'listtenant', component: TenantListComponent },
    { path: 'listStudent', component: OwnerListComponent },
    { path: 'updateStudent/:id', component: UpdateOwnerComponent },
  
    

]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
