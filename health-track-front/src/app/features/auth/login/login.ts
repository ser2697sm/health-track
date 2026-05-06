import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { email, form, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  hidePassword = true;

  form;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(event: Event) {
    //Evita el comportamiento por defecto del formulario HTML 
    //que es recargar la pagina al hacer submit
    event.preventDefault();

    //Comprueba si el formulario no es válido
    if (this.form.invalid) {
      //Marca todos los campos como “tocados”.
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);

    const request = {
      email: this.form.value.email!,
      password: this.form.value.password!
    }

    this.authService.login(request).subscribe({
      next: (response) => {
        //Guardar el token
        localStorage.setItem('token', response.token)
        // de momento directo a usuarios
        this.router.navigate(['/admin/users']);
      },
      error: (error) => {
        console.error('Error en login', error);
      }
    });
  }
}
