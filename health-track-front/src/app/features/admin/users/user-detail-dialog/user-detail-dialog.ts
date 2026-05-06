import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserResponse } from '../../../../core/models/response/user-response';

@Component({
  selector: 'app-user-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './user-detail-dialog.html',
  styleUrl: './user-detail-dialog.scss',
})
export class UserDetailDialog {
  initials: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: UserResponse,
    private dialogRef: MatDialogRef<UserDetailDialog>
  ) {
    const first = user.firstName?.charAt(0).toUpperCase() ?? '';
    const last = user.lastName?.charAt(0).toUpperCase() ?? '';
    this.initials = first + last;
  }

  close() {
    this.dialogRef.close();
  }
}