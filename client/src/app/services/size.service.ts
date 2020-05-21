import {
    Injectable,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SizeService {
    public sizeIncreasedState: Observable<boolean>;
    public state: boolean = false;
    private sizeIncreasedSubject: Subject<boolean>;

    constructor() {
        this.sizeIncreasedSubject = new Subject<boolean>()
        this.sizeIncreasedState = this.sizeIncreasedSubject.asObservable();
        this.sizeIncreasedSubject.next(this.state);
    }

    public toggleSize() {
        this.state = !this.state;
        this.sizeIncreasedSubject.next(this.state);
    }
}
