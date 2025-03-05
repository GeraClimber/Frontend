import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../Services/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  imports: [
    MatCardModule,
    AsyncPipe, 
    CommonModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  authService = inject(AuthService);
  accountDetail$ = this.authService.getDetail();

}
