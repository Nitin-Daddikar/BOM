import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { UnAuthGuard } from './pages/un-auth/guard/un-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/secured-pages.module').then((m) => m.SecuredPagesModule)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    canActivate: [UnAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/un-auth/un-auth.module').then((m) => m.UnAuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
