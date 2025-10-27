import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main-routes').then((r) => r.mainRoutes),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];
