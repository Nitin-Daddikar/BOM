import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location as AngularLocation } from '@angular/common';
import { Location, LocationService } from '../services/location.service';

@Component({
    selector: 'app-location-view',
    templateUrl: './location-view.component.html',
    standalone: false
})
export class LocationViewComponent implements OnInit {
    location: Location | null = null;
    loading: boolean = false;
    locationId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private angularLocation: AngularLocation,
        private locationService: LocationService
    ) { }

    ngOnInit(): void {
        this.locationId = +this.route.snapshot.params['id'];
        if (this.locationId) {
            this.loadLocationData();
        }
    }

    loadLocationData(): void {
        this.loading = true;
        this.locationService.getLocation(this.locationId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.location = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading location:', error);
                this.loading = false;
            }
        });
    }

    goBack(): void {
        this.angularLocation.back();
    }
}