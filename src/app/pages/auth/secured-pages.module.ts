import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/theme/shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-master',
    loadChildren: () => import('./product-master/product-master.module').then(m => m.ProductMasterModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'location-master',
    loadChildren: () => import('./location-master/location-master.module').then(m => m.LocationMasterModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'supplier-master',
    loadChildren: () => import('./supplier-master/supplier-master.module').then(m => m.SupplierMasterModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'purchase-order',
    loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bom',
    loadChildren: () => import('./bom/bom.module').then(m => m.BOMModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SecuredPagesModule { }