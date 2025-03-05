import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { RegisterComponent } from './Components/register/register.component';
import { AccountComponent } from './Components/account/account.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'account/:id',
    component: AccountComponent,
    canActivate: [authGuard],
  }
];
