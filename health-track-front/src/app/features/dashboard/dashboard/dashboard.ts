import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RecordDetailDialog } from '../record-detail-dialog/record-detail-dialog';
import { CreateRecordDialog } from '../create-record-dialog/create-record-dialog';
import { InitialRecordDialog } from '../initial-record-dialog/initial-record-dialog';
import { User } from '../../../core/services/user';
import { ChangeDetectorRef } from '@angular/core';
import { HealthRecord } from '../../../core/services/health-record';
import { HealthRecordResponse } from '../../../core/models/response/healthRecord-response';

interface UserResponse {
  uuid: string;
  firstName: string;
  lastName: string;
  secondName?: string;
  email: string;
  enabled: boolean;
}

interface HealthMetrics {
  peso: number | null;
  altura: number | null;
  imc: number | null;
  grasaCorporal: number | null;
  masaMuscular: number | null;
}

interface Measurements {
  pecho: number | null;
  cintura: number | null;
  cadera: number | null;
  biceps: number | null;
  muslo: number | null;
}

interface DashboardRecord {
  fecha: string;
  peso: number;
  imc: number | null;
  esInicial?: boolean;
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
  records: HealthRecordResponse[] = [];
  latestRecord: HealthRecordResponse | null = null;

  metrics: HealthMetrics = {
    peso: null,
    altura: null,
    imc: null,
    grasaCorporal: null,
    masaMuscular: null,
  };
  measurements: Measurements = {
    pecho: null,
    cintura: null,
    cadera: null,
    biceps: null,
    muslo: null,
  };
  userId: string | null = null;
  recentRecords: DashboardRecord[] = [];
  hasInitialRecord = false;
  nivelActividad = '';
  objetivo = '';
  showWelcome = false;

  constructor(
    private healthRecordService: HealthRecord,
    private userService: User,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.userId = this.route.snapshot.paramMap.get('uuid');

    if (!this.userId) return;

    this.userService.getUser(this.userId).subscribe({
      next: (response: UserResponse) => {
        console.log("EL usuario es" + response)
        this.user = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR GET USER:', err);
      }
    });

    this.getViewRecord();
  }

  getInitials(): string {
    if (!this.user) return '';
    const first = this.user.firstName?.charAt(0).toUpperCase() ?? '';
    const last = this.user.lastName?.charAt(0).toUpperCase() ?? '';
    return first + last;
  }

  getViewRecord() {
    this.healthRecordService.viewRecord().subscribe({
      next: (response) => {
        console.log(response)
        this.records = response;
        this.hasInitialRecord = response.length > 0;
        this.latestRecord = response.at(-1) ?? null;

        if (!this.latestRecord) return;

        this.metrics = {
          peso: this.latestRecord.peso,
          altura: this.latestRecord.height,
          imc: this.calculateImc(this.latestRecord.peso, this.latestRecord.height),
          grasaCorporal: this.latestRecord.bodyFat,
          masaMuscular: this.latestRecord.muscleMass,
        };
        this.nivelActividad = this.latestRecord.levelActivity;
        this.objetivo = this.latestRecord.objective;
        this.recentRecords = response.map((record, index) => ({
          fecha: 'Sin fecha',
          peso: record.peso,
          imc: this.calculateImc(record.peso, record.height),
          esInicial: index === 0,
        }));
      },
      error: (err) => {
        console.error('ERROR GET HEALTH RECORDS:', err);
      }
    })
  }

  calculateImc(peso: number, height: number): number {
    if (!height) return 0;
    const heightInMeters = height / 100;
    return Number((peso / (heightInMeters * heightInMeters)).toFixed(1));
  }

  openInitialRecordDialog() {

    if (!this.userId) return;

    const dialogRef = this.dialog.open(InitialRecordDialog, {
      width: '560px',
      disableClose: true,
      data: {
        userId: this.userId
      }
    });

    dialogRef.afterClosed().subscribe(() => this.getViewRecord());
  }

  openCreateRecordDialog() {
    const dialogRef = this.dialog.open(CreateRecordDialog, {
      width: '520px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => this.getViewRecord());
  }

  openRecordDetail(record: DashboardRecord) {
    this.dialog.open(RecordDetailDialog, {
      width: '480px',
      data: record,
    });
  }

  getNivelActividadLabel(): string {
    const labels: Record<string, string> = {
      SEDENTARIO: 'Sedentario',
      LIGERO: 'Ligero',
      MODERADO: 'Moderado',
      ACTIVO: 'Activo',
      ATLETA: 'Atleta',
    };

    return labels[this.nivelActividad] ?? 'Sin definir';
  }

  getObjetivoLabel(): string {
    const labels: Record<string, string> = {
      PERDER_PESO: 'Perder peso',
      GANAR_MASA_MUSCULAR: 'Ganar masa muscular',
      MANTENER_PESO: 'Mantener peso',
      DEFINIR_TONIFICAR: 'Definir / tonificar',
      MEJORAR_SALUD_GENERAL: 'Mejorar salud general',
    };

    return labels[this.objetivo] ?? 'Sin definir';
  }

  getImcCategory(): string {
    if (this.metrics.imc === null) return '';
    if (this.metrics.imc < 18.5) return 'Bajo peso';
    if (this.metrics.imc < 25) return 'Normal';
    if (this.metrics.imc < 30) return 'Sobrepeso';
    return 'Obesidad';
  }

  getImcColor(): string {
    if (this.metrics.imc === null) {
      return 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)';
    }
    if (this.metrics.imc < 18.5) return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
    if (this.metrics.imc < 25) return 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
    if (this.metrics.imc < 30) return 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)';
    return 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
  }

}
