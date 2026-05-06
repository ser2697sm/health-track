import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-record-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './create-record-dialog.html',
  styleUrl: './create-record-dialog.scss',
})
export class CreateRecordDialog {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateRecordDialog>
  ) {
    this.form = this.fb.group({
      peso: ['', [Validators.required, Validators.min(1)]],
      grasaCorporal: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      masaMuscular: ['', [Validators.required, Validators.min(1)]],
      pecho: ['', [Validators.required, Validators.min(1)]],
      cintura: ['', [Validators.required, Validators.min(1)]],
      cadera: ['', [Validators.required, Validators.min(1)]],
      biceps: ['', [Validators.required, Validators.min(1)]],
      muslo: ['', [Validators.required, Validators.min(1)]],
      frecuenciaCardiaca: ['', [Validators.min(1)]],
      presionSistolica: ['', [Validators.min(1)]],
      presionDiastolica: ['', [Validators.min(1)]],
      notes: [''],
    });
  }

  save() {
    if (this.form.valid) {
      const today = new Date();
      const fecha = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      
      const weight = this.form.value.peso;
      const height = 175;
      const imc = weight / ((height / 100) ** 2);
      
      const record = {
        fecha,
        peso: weight,
        imc: parseFloat(imc.toFixed(1)),
        pesoAnterior: 72.5,
        grasaCorporal: this.form.value.grasaCorporal,
        masaMuscular: this.form.value.masaMuscular,
        pecho: this.form.value.pecho,
        cintura: this.form.value.cintura,
        cadera: this.form.value.cadera,
        biceps: this.form.value.biceps,
        muslo: this.form.value.muslo,
        frecuenciaCardiaca: this.form.value.frecuenciaCardiaca || 72,
        presionSistolica: this.form.value.presionSistolica || 120,
        presionDiastolica: this.form.value.presionDiastolica || 80,
        notes: this.form.value.notes || 'Nuevo registro',
      };
      
      this.dialogRef.close(record);
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}