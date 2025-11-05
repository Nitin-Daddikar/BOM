import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { BOMListComponent } from './bom-list/bom-list.component';
import { BOMFormComponent } from './bom-form/bom-form.component';
import { BOMViewComponent } from './bom-view/bom-view.component';

// Services
import { BOMService } from './services/bom.service';

// Shared modules
import { SharedModule } from '../../../theme/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: BOMListComponent
  },
  {
    path: 'form/:id',
    component: BOMFormComponent
  },
  {
    path: 'view/:id',
    component: BOMViewComponent
  }
];

@NgModule({
  declarations: [
    BOMListComponent,
    BOMFormComponent,
    BOMViewComponent
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
    BOMService
  ]
})
export class BOMModule { }