import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
//import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeService } from '../../Services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    RouterLink,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    private readonly themeService: ThemeService
  ) {
   this.theme = this.themeService.getThemeFromLocalStorage();
  }
  theme: string;
  router = inject(Router);

  async changeTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.getThemeFromLocalStorage();
  }

}
