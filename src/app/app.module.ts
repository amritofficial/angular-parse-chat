import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { appRoutes } from './app-routing.module';
import { ParseService } from './shared/services/parse.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './shared/services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ParseService, AuthService, AuthGuard, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
