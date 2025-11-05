import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierViewComponent } from './supplier-view/supplier-view.component';

// Services
import { SupplierService } from './services/supplier.service';

// Shared modules
import { SharedModule } from '../../../theme/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: SupplierListComponent
  },
  {
    path: 'form/:id',
    component: SupplierFormComponent
  },
  {
    path: 'view/:id',
    component: SupplierViewComponent
  }
];

@NgModule({
  declarations: [
    SupplierListComponent,
    SupplierFormComponent,
    SupplierViewComponent
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
    SupplierService
  ]
})
export class SupplierMasterModule { }