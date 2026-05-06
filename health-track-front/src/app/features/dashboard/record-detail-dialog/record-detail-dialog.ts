import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

interface HealthRecord {
  fecha: string;
  peso: number;
  imc: number;
  notes: string;
  pesoAnterior?: number;
  grasaCorporal?: number;
  masaMuscular?: number;
  pecho?: number;
  cintura?: number;
  cadera?: number;
  biceps?: number;
  muslo?: number;
  frecuenciaCardiaca?: number;
  presionSistolica?: number;
  presionDiastolica?: number;
}

@Component({
  selector: 'app-record-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './record-detail-dialog.html',
  styleUrl: './record-detail-dialog.scss',
})
export class RecordDetailDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public record: HealthRecord,
    private dialogRef: MatDialogRef<RecordDetailDialog>
  ) {}

  close() {
    this.dialogRef.close();
  }
}