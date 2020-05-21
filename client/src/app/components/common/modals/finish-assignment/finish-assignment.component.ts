import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-finish-assignment',
    templateUrl: './finish-assignment.component.html',
    styleUrls: ['./finish-assignment.component.scss']
})
export class FinishAssignmentComponent implements OnInit {
    @Input() config: any = {};
    @Input() startTime: any = new Date();
    public endTime: any = new Date();

    constructor(public activeModal: NgbActiveModal) { }

    public ngOnInit() { }

    public countResults() {
        const correctAnswers = this.config.sentences.reduce((accumulator, sentence) => 
            accumulator + sentence.parts.reduce((child_accumulator, part) => {
                if (part.type === "word" && part.ask && part.success) {
                    return child_accumulator + 1;
                }
                return child_accumulator;
            }, 0), 0);
        
        const questionsLength = this.config.sentences.reduce((accumulator, sentence) => 
            accumulator + sentence.parts.reduce((child_accumulator, part) => {
                if (part.type === "word" && part.ask) {
                    return child_accumulator + 1;
                }
                return child_accumulator;
            }, 0), 0);
            
        return `${correctAnswers} / ${questionsLength} poprawnych odpowiedzi`;
    }

    get timer() {
        const elapsed_ms = this.endTime - this.startTime;
        const seconds = Math.round(elapsed_ms / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const s = this.TrimSecondsMinutes(seconds);
        const m = this.TrimSecondsMinutes(minutes);
        const h = this.TrimSecondsMinutes(hours);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    private TrimSecondsMinutes(elapsed) {
        if (elapsed >= 60)
            return this.TrimSecondsMinutes(elapsed - 60);
        return elapsed;
    }

    public restart() {
        this.activeModal.close({ action: 'restart' });
    }

    public close() {
        this.activeModal.close({ action: 'close' });
    }
}