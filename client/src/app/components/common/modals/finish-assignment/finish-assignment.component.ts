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
    public correctAnswers: any = [];
    public wrongAnswers: any = [];

    constructor(public activeModal: NgbActiveModal) { }

    public ngOnInit() {
        this.config.sentences.forEach((sentence, sentenceIndex) => {
            let secretIndex = 0;
            sentence.parts.forEach((part, partIndex) => {
                if (part.type === "word" && part.ask) {
                    const obj = {
                        sentenceIndex,
                        secretIndex,
                        answer: sentence.answers[partIndex],
                        text: part.text,
                    }
                    switch (!!part.success) {
                        case true:
                            this.correctAnswers.push(obj);
                            break;
                        case false:
                            this.wrongAnswers.push(obj);
                            break;
                    }
                    secretIndex++;
                }
            })
        });
        console.log(this.config, this.correctAnswers, this.wrongAnswers)
    }

    public countResults() {
        const correctAnswersLength = this.correctAnswers.length;
        const totalAnswersLength = this.correctAnswers.length + this.correctAnswers.length;
        return `${correctAnswersLength} / ${totalAnswersLength} poprawnych odpowiedzi`;
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