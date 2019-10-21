import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-viewer-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
    @Input() public textData: any[];

    constructor() { }

    public ngOnInit():void {
        console.log({data: this.textData});
    }

    public ngOnDestroy(): void {
    }

    public ngOnChanges(): void {
    }
}
