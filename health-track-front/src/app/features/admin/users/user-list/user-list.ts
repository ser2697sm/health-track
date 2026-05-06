import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserResponse } from '../../../../core/models/response/user-response';
import { User } from '../../../../core/services/user';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCreateDialog } from '../user-create-dialog/user-create-dialog';
import { UserDetailDialog } from '../user-detail-dialog/user-detail-dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {

  displayedColumns = ['avatar', 'name', 'email', 'status', 'actions'];
  users: UserResponse[] = [];
  searchTerm = signal('');

  get filteredUsers(): UserResponse[] {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.users;
    return this.users.filter(u =>
      `${u.firstName} ${u.lastName} ${u.secondName || ''} ${u.email}`
        .toLowerCase()
        .includes(term)
    );
  }

  constructor(
    private userService: User,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando usuarios', error);
      }
    });
  }

  getInitials(user: UserResponse): string {
    const first = user.firstName?.charAt(0).toUpperCase() ?? '';
    const last = user.lastName?.charAt(0).toUpperCase() ?? '';
    return first + last;
  }

  viewUser(user: UserResponse) {
    console.log(user)
    this.router.navigate(['/dashboard', user.uuid]);
  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(UserCreateDialog, {
      width: '520px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.loadUsers();
      }
    });
  }
}