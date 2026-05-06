import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { PrivateLayout } from './features/layout/private-layout/private-layout';
import { UserList } from './features/admin/users/user-list/user-list';
import { Dashboard } from './features/dashboard/dashboard/dashboard';

export const routes: Routes = [
    // 🔓 Público
    {
        path: 'login',
        component: Login
    },

    // 🔐 Privado (usa layout)
    {
        path: '',
        component: PrivateLayout,
        children: [
            {
                path: 'admin/users',
                component: UserList
            },
            {
                path: 'dashboard/:uuid',
                component: Dashboard
            }
        ]
    },

    // Redirecciones
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];