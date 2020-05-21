import { Directive, ElementRef, OnInit, OnDestroy, Renderer2  } from '@angular/core';
import { Subscription } from 'rxjs';
import { SizeService } from '../../services/size.service';

@Directive({
    selector: '[appSizeIncreased]'
})
export class SizeIncreasedDirective implements OnInit, OnDestroy {
    private subscriber: Subscription;
    private classLabel: string = 'size-increased';

    constructor(
        private renderer: Renderer2,
        private el: ElementRef,
        private sizeService: SizeService,
    ) {}

    public ngOnInit(): void {
        this.subscriber = this.sizeService.sizeIncreasedState.subscribe(flag => {
            if (flag) {
                this.renderer.addClass(this.el.nativeElement, this.classLabel);
            } else {
                this.renderer.removeClass(this.el.nativeElement, this.classLabel);
            }
        });
    }

    public ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }
}
