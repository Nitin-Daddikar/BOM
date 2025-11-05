import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location as AngularLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationService } from '../services/location.service';

@Component({
    selector: 'app-location-form',
    templateUrl: './location-form.component.html',
    standalone: false
})
export class LocationFormComponent implements OnInit {
    locationForm: FormGroup;
    isEditing: boolean = false;
    loading: boolean = false;
    locationId: number | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private location: AngularLocation,
        private locationService: LocationService
    ) {
        this.locationForm = this.fb.group({
            name: ['', [Validators.required]],
            type: ['Plant', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.locationId = this.route.snapshot.params['id'] === 'new' ? null : +this.route.snapshot.params['id'];
        if (this.locationId) {
            this.isEditing = true;
            this.loadLocationData();
        }
    }

    loadLocationData(): void {
        this.loading = true;
        this.locationService.getLocation(this.locationId!).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.locationForm.patchValue(response.data);
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading location:', error);
                this.loading = false;
            }
        });
    }

    onSubmit(): void {
        if (this.locationForm.invalid) {
            Object.keys(this.locationForm.controls).forEach(key => {
                const control = this.locationForm.get(key);
                if (control?.invalid) {
                    control.markAsTouched();
                }
            });
            return;
        }

        const locationData = this.locationForm.value;
        this.loading = true;

        if (this.isEditing) {
            this.locationService.updateLocation(this.locationId!, locationData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error updating location:', error);
                }
            });
        } else {
            this.locationService.createLocation(locationData).subscribe({
                next: (response) => {
                    this.loading = false;
                    if (response.success) {
                        this.goBack();
                    }
                },
                error: (error) => {
                    this.loading = false;
                    console.error('Error creating location:', error);
                }
            });
        }
    }

    goBack(): void {
        this.location.back();
    }
}