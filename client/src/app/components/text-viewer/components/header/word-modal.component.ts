import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-word-modal',
    templateUrl: './word-modal.component.html',
    styleUrls: ['./word-modal.component.scss']
})
export class WordModalComponent implements OnInit {
    public activeView:string;

    constructor() {
        this.activeView = this.activeView || 'info';
    }

    public ngOnInit() { }
    
    public showImgView() {
        this.activeView = 'img';
    }

    public showInfoView() {
        this.activeView = 'info';
    }


}
