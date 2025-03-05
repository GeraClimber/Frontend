import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
//import { AsyncPipe, CommonModule } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { RoleService } from '../../Services/role.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { ValidationError } from '../../Interfaces/validation-error';
import { Role } from '../../Interfaces/role';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [
    MatInputModule,
    MatCardModule,
    RouterLink,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    //AsyncPipe,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {
  roleService = inject(RoleService);
  authService = inject(AuthService);
  matSnackbar = inject(MatSnackBar);
  roles$!: Observable<Role[]>;
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  router = inject(Router);
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;
  errors!: ValidationError[];

  
  register() {

    const roles = this.registerForm.get('roles')?.value || [];

    const registrationData = {
      ...this.registerForm.value,
      roles: null,
    };

    this.authService.register(registrationData).subscribe({
      next: (response) => {
        console.log(response);

        this.matSnackbar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          this.errors = err!.error;
          this.matSnackbar.open('Validations error', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
      complete: () => console.log('Register success'),
    });
    
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        fullName: ['', Validators.required],
        roles: [''],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator, // Новый стандарт
      } as AbstractControlOptions // Приведение к правильному типу
    );

    //this.roles$ = this.roleService.getRoles();
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
