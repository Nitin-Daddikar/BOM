import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductViewComponent } from './product-view/product-view.component';

// Services
import { ProductService } from './services/product.service';

// Shared modules
import { SharedModule } from '../../../theme/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'form/:id',
    component: ProductFormComponent
  },
  {
    path: 'view/:id',
    component: ProductViewComponent
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductViewComponent
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
    ProductService
  ]
})
export class ProductMasterModule { }