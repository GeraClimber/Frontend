import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainComponent } from './Components/main/main.component';
import { RegisterComponent } from './Components/register/register.component';

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
      }
];
