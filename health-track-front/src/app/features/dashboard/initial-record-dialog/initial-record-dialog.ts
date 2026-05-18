import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HealthRecord } from '../../../core/services/health-record';
import { CreateFirstRecordRequest } from '../../../core/models/request/createFirstRecord-request';

@Component({
  selector: 'app-initial-record-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './initial-record-dialog.html',
  styleUrl: './initial-record-dialog.scss',
})

export class InitialRecordDialog {

  form!: FormGroup;

  constructor(
    private healthRecordService: HealthRecord,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InitialRecordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {
    this.form = this.fb.group({
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      height: [null, [Validators.required, Validators.min(1)]],
      peso: [null, [Validators.required, Validators.min(1)]],
      bodyFat: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      muscleMass: [null, [Validators.required, Validators.min(1)]],
      levelActivity: ['', Validators.required],
      objective: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {

      const weight: number = this.form.value.peso;
      const height: number = this.form.value.height;
      const heightInMeters = height / 100;
      const imc = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
      const today = new Date();
      const fecha = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

      const record: CreateFirstRecordRequest = {
        gender: this.form.value.gender,
        age: this.form.value.age,
        height: height,
        peso: weight,
        bodyFat: this.form.value.bodyFat,
        muscleMass: this.form.value.muscleMass,
        levelActivity: this.form.value.levelActivity,
        objective: this.form.value.objective,
      };

      this.healthRecordService.createFirstRecord(this.data.userId, record).subscribe({
        next: () => {
          this.dialogRef.close({
            fecha,
            peso: weight,
            altura: height,
            imc,
            bodyFat: this.form.value.bodyFat,
            muscleMass: this.form.value.muscleMass,
            levelActivity: this.form.value.levelActivity,
            objective: this.form.value.objective,
            nivelActividad: this.form.value.levelActivity,
            objetivo: this.form.value.objective,
            notes: 'Registro inicial',
          });

          this.dialogRef.close();
        },
        error: (err) => {
          console.error("No se ha podido crear el primer registro", err);
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
