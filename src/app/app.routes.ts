import { Routes } from '@angular/router';
import { AdminLogin } from './pages/admin-login/admin-login';
import { Admin } from './pages/admin/admin';
import { Home } from './pages/home/home';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'admin/login',
        component: AdminLogin
    },
    {
        path: 'admin',
        component: Admin,
        canActivate: [adminGuard]
    }
];
