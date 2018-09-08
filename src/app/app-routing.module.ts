import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ChatComponent } from './chat/chat.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'chat', pathMatch: 'full' },
            { path: 'chat', component: ChatComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
]