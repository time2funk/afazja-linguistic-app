import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-finish-assignment',
    templateUrl: './finish-assignment.component.html',
    styleUrls: ['./finish-assignment.component.scss']
})
export class FinishAssignmentComponent implements OnInit {
    @Input() config: any = {};

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

    public restart() {
        this.activeModal.close({ action: 'restart' });
    }

    public close() {
        this.activeModal.close({ action: 'close' });
    }
}