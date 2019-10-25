import {
    Injectable,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface PreloaderStateInterface {
    show: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class PreloaderService {
    private loaderSubject: Subject<PreloaderStateInterface>;
    public loaderState: Observable<PreloaderStateInterface>

    constructor() {
        this.loaderSubject = new Subject<PreloaderStateInterface>()
        this.loaderState = this.loaderSubject.asObservable();
    }

    public show() {
        this.loaderSubject.next(<PreloaderStateInterface>{
            show: true
        });
    }

    public hide() {
        this.loaderSubject.next(<PreloaderStateInterface>{
            show: false
        });
    }
}
