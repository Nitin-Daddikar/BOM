import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { LocationListComponent } from './location-list/location-list.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationViewComponent } from './location-view/location-view.component';

// Services
import { LocationService } from './services/location.service';

// Shared modules
import { SharedModule } from '../../../theme/shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: LocationListComponent
    },
    {
        path: 'form/:id',
        component: LocationFormComponent
    },
    {
        path: 'view/:id',
        component: LocationViewComponent
    }
];

@NgModule({
    declarations: [
        LocationListComponent,
        LocationFormComponent,
        LocationViewComponent
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
        LocationService
    ]
})
export class LocationMasterModule { }