import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RecordDetailDialog } from '../record-detail-dialog/record-detail-dialog';
import { CreateRecordDialog } from '../create-record-dialog/create-record-dialog';

interface UserResponse {
  uuid: string;
  firstName: string;
  lastName: string;
  secondName?: string;
  email: string;
  enabled: boolean;
}

interface HealthMetrics {
  peso: number;
  altura: number;
  imc: number;
  grasaCorporal: number;
  masaMuscular: number;
}

interface Measurements {
  pecho: number;
  cintura: number;
  cadera: number;
  biceps: number;
  muslo: number;
}

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
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  user: UserResponse | null = null;
  metrics: HealthMetrics = {} as HealthMetrics;
  measurements: Measurements = {} as Measurements;
  recentRecords: HealthRecord[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.user = JSON.parse(params['user']);
        this.generateMockData();
      }
    });
  }

  generateMockData() {
    this.metrics = {
      peso: 72.5,
      altura: 175,
      imc: 23.7,
      grasaCorporal: 18.5,
      masaMuscular: 35.2
    };

    this.measurements = {
      pecho: 102,
      cintura: 82,
      cadera: 98,
      biceps: 35,
      muslo: 56
    };

    this.recentRecords = [
      { fecha: '05/05/2026', peso: 72.5, imc: 23.7, notes: 'Registro semanal', pesoAnterior: 73.1, grasaCorporal: 18.5, masaMuscular: 35.2, pecho: 102, cintura: 82, cadera: 98, biceps: 35, muslo: 56, frecuenciaCardiaca: 72, presionSistolica: 120, presionDiastolica: 80 },
      { fecha: '28/04/2026', peso: 73.1, imc: 23.9, notes: 'Registro semanal', pesoAnterior: 73.8, grasaCorporal: 19.0, masaMuscular: 35.0, pecho: 103, cintura: 83, cadera: 99, biceps: 34, muslo: 55, frecuenciaCardiaca: 74, presionSistolica: 118, presionDiastolica: 78 },
      { fecha: '21/04/2026', peso: 73.8, imc: 24.1, notes: 'Registro semanal', pesoAnterior: 74.2, grasaCorporal: 19.5, masaMuscular: 34.8, pecho: 104, cintura: 84, cadera: 100, biceps: 34, muslo: 54, frecuenciaCardiaca: 76, presionSistolica: 122, presionDiastolica: 82 },
      { fecha: '14/04/2026', peso: 74.2, imc: 24.2, notes: 'Registro semanal', pesoAnterior: 74.5, grasaCorporal: 20.0, masaMuscular: 34.5, pecho: 104, cintura: 85, cadera: 101, biceps: 33, muslo: 53, frecuenciaCardiaca: 78, presionSistolica: 125, presionDiastolica: 85 },
    ];
  }

  getInitials(): string {
    if (!this.user) return '';
    const first = this.user.firstName?.charAt(0).toUpperCase() ?? '';
    const last = this.user.lastName?.charAt(0).toUpperCase() ?? '';
    return first + last;
  }

  getImcCategory(): string {
    if (this.metrics.imc < 18.5) return 'Bajo peso';
    if (this.metrics.imc < 25) return 'Normal';
    if (this.metrics.imc < 30) return 'Sobrepeso';
    return 'Obesidad';
  }

  getImcColor(): string {
    if (this.metrics.imc < 18.5) return '#f59e0b';
    if (this.metrics.imc < 25) return '#10b981';
    if (this.metrics.imc < 30) return '#f59e0b';
    return '#ef4444';
  }

  openRecordDetail(record: HealthRecord) {
    this.dialog.open(RecordDetailDialog, {
      width: '480px',
      data: record,
    });
  }

  openCreateRecordDialog() {
    const dialogRef = this.dialog.open(CreateRecordDialog, {
      width: '520px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: HealthRecord | undefined) => {
      if (result) {
        this.recentRecords.unshift(result);
        this.metrics.peso = result.peso;
        this.metrics.grasaCorporal = result.grasaCorporal!;
        this.metrics.masaMuscular = result.masaMuscular!;
        this.metrics.imc = result.imc;
        this.measurements = {
          pecho: result.pecho!,
          cintura: result.cintura!,
          cadera: result.cadera!,
          biceps: result.biceps!,
          muslo: result.muslo!,
        };
      }
    });
  }
}