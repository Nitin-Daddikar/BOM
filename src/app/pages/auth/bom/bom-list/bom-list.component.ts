import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { BOM, BOMService } from '../services/bom.service';
import { APP_CONFIG, TABLE_CONFIG } from 'src/app/theme/shared/constants/app.constants';

@Component({
    selector: 'app-bom-list',
    templateUrl: './bom-list.component.html',
    standalone: false
})
export class BOMListComponent implements OnInit {
    boms: BOM[] = [];
    loading: boolean = false;
    error: string = '';

    paginationData: any = {
        total: 0,
        from: 0,
        to: 0,
        prev_page_url: null,
        next_page_url: null,
        per_page: APP_CONFIG.PAGINATION.PER_PAGE,
        current_page: APP_CONFIG.PAGINATION.DEFAULT_PAGE
    };

    search: any = {
        fg_code: "",
        fg_name: "",
        fg_qty: ""
    };
    key: any = TABLE_CONFIG.DEFAULT_SORT_KEY;
    order: string = 'ASC';
    class = '';
    reverse: boolean = true;

    // triggered by html, rate-limited in milliseconds
    searchNotifier = new Subject<void>();

    constructor(
        private bomService: BOMService
    ) { }

    ngOnInit(): void {
        this.getData();
        this.searchNotifier.pipe(debounceTime(750))
            .subscribe(() => this.getData());
    }

    getReset() {
        // Reset all search fields
        Object.keys(this.search).forEach(key => {
            this.search[key] = '';
        });
        this.getData();
    }

    sort(key = '') {
        if (key != '') {
            this.key = key;
            if (this.reverse) {
                this.order = 'ASC';
                this.class = 'fa fa-sort-alpha-asc';
            }
            else {
                this.order = 'DESC';
                this.class = 'fa fa-sort-alpha-desc';
            }
        }
        else {
            this.key = "";
            this.order = "";
        }
        this.reverse = !this.reverse;
        this.getData(this.paginationData.current_page);
    }

    getData(page: number = 1): void {
        this.loading = true;
        this.error = '';

        // Initialize base params
        let params: any = {
            page: page,
            per_page: this.paginationData.per_page
        };

        // Add search parameters
        Object.keys(this.search).forEach(key => {
            if (this.search[key] !== '') {
                params[`search[${key}]`] = this.search[key];
            }
        });

        // Add sort parameter if key exists
        if (this.key) {
            params[`sort[${this.key}]`] = this.order;
        }

        this.bomService.getBOMs(params).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.boms = response.data.data || [];
                    this.paginationData = {
                        total: response.data.meta?.total || 0,
                        from: response.data.meta?.from || 0,
                        to: response.data.meta?.to || 0,
                        prev_page_url: response.data.meta?.prev_page_url,
                        next_page_url: response.data.meta?.next_page_url,
                        per_page: response.data.meta?.per_page || this.paginationData.per_page,
                        current_page: response.data.meta?.current_page || 1,
                        id: 'list'
                    };
                } else {
                    this.error = 'Failed to load BOMs';
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading BOMs:', error);
                this.error = 'An error occurred while loading BOMs';
                this.loading = false;
            }
        });
    }

    deleteBOM(id: number): void {
        if (confirm('Are you sure you want to delete this BOM?')) {
            this.bomService.deleteBOM(id).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.getData(this.paginationData.current_page);
                    }
                },
                error: (error) => {
                    console.error('Error deleting BOM:', error);
                    alert('Failed to delete BOM');
                }
            });
        }
    }
}