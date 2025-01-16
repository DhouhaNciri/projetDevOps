import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { FullComponent } from './full/full.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RegisterTenantComponent } from './register-tenant/register-tenant.component';
import { RegisterOwnerComponent } from './register-owner/register-owner.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBarModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdateOwnerComponent } from './update-owner/update-owner.component';
import { PublicationComponent } from './publication/publication.component';
import { EditPublicationComponent } from './publication/edit-publication/edit-publication.component';
import { ProfilComponent } from './profil/profil.component';
import { DetailsComponent } from './publication/details/details.component';
import { AddHousingComponent } from './add-housing/add-housing.component';
import { MessagesComponent } from './components/messages/messages.component';
import { TaskComponent } from './task/task.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LogementComponent } from './logement/logement.component';
import { ChatComponent } from './chat/chat.component';
import { HistoriqueColocationComponent } from './historique-colocation/historique-colocation.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FullComponent,
    LoginComponent,
    RegisterTenantComponent,
    RegisterOwnerComponent,
    DashboardAdminComponent,
    TenantListComponent,
    OwnerListComponent,
    ConfirmationComponent,
    ForgotPasswordComponent,
    UpdateOwnerComponent,
    PublicationComponent,
    EditPublicationComponent,
    ProfilComponent,
    DetailsComponent,
    AddHousingComponent,
    MessagesComponent,
    TaskComponent,
    LogementComponent,
    ChatComponent,
    HistoriqueColocationComponent,
    
  
   
  ],
  imports: [
  
    BrowserModule,
   
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,       
    MatFormFieldModule  ,
    MatIconModule , 
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    MatBadgeModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
