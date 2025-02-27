import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    MatInputModule,
    MatCardModule,
    RouterLink,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  
  register() {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
