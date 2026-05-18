import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../../core/services/user';
import { CreateUserRequest } from '../../../../core/models/request/createUser-request';

@Component({
  selector: 'app-user-create-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule

  ],
  templateUrl: './user-create-dialog.html',
  styleUrl: './user-create-dialog.scss',
})
export class UserCreateDialog {

  form;
  constructor(
    private userService: User,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserCreateDialog>
  ) {
    this.form = this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      secondName: [''],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]]
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  //Creacion de un usuario nuevo
  createUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: CreateUserRequest = this.form.getRawValue();

    this.userService.createNewUser(request).subscribe({
      next: (response) => {
        this.dialogRef.close(true) // solo si va bien
      },
      error: (error) => {
        console.error('Error creando usuario', error);
      }
    })
  }

}
