import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PreloaderService, PreloaderStateInterface } from '../../../services/preloader.service';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
    public show: boolean;
    private subscription: Subscription;

    constructor(
        private loaderService: PreloaderService,
    ) {
        this.show = false;
    }

    public ngOnInit(): void {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: PreloaderStateInterface) => {
                this.show = state.show;
            });
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
