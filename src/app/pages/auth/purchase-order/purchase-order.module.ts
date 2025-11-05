import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';
import { PurchaseOrderViewComponent } from './purchase-order-view/purchase-order-view.component';

// Services
import { PurchaseOrderService } from './services/purchase-order.service';

// Shared modules
import { SharedModule } from '../../../theme/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PurchaseOrderListComponent
  },
  {
    path: 'form/:id',
    component: PurchaseOrderFormComponent
  },
  {
    path: 'view/:id',
    component: PurchaseOrderViewComponent
  }
];

@NgModule({
  declarations: [
    PurchaseOrderListComponent,
    PurchaseOrderFormComponent,
    PurchaseOrderViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxPaginationModule
  ],
  providers: [
    PurchaseOrderService
  ]
})
export class PurchaseOrderModule { }