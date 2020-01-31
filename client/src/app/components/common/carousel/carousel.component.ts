import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
    @Input() wordObject: any = null;
    public showNavigationArrows: boolean = true;
    public showNavigationIndicators: boolean = false;

    constructor() { }

    public ngOnInit() {}

}
