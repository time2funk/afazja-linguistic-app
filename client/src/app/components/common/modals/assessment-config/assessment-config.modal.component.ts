import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';


enum LevelsEnum {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
};
interface levelType {
    label: string,
    name: LevelsEnum,
    description?: string,
}
const DEFAULT_LEVEL = LevelsEnum.MEDIUM;


@Component({
    selector: 'app-assessment-config',
    templateUrl: './assessment-config.modal.component.html',
    styleUrls: ['./assessment-config.modal.component.scss']
})
export class AssessmentConfigModalComponent implements OnInit {
    @Input() config: any = {};
    public formGroup: FormGroup;
    public submitted: boolean = false;
    public error: string = null;
    public title: string = 'Konfiguracja zadania';
    public levelTypes: levelType[] = [
        {
            label: 'Easy',
            name: LevelsEnum.EASY,
            description: '( 1 słowo )',
        }, {
            label: 'Medium',
            name: LevelsEnum.MEDIUM,
            description: '( 1 - 3 słowa )',
        }, {
            label: 'Hard',
            name: LevelsEnum.HARD,
            description: '( 1 - 5 słów )',
        }
    ];

    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
    ) { }

    public ngOnInit(): void {
        this.initForm();
    }

    get f() { return this.formGroup.controls; }

    private initForm(): void {
        this.formGroup = this.formBuilder.group({
            level: [DEFAULT_LEVEL],
        });
    }

    public submitHandler() {
        const config = Object.assign({}, this.config, {
            level: this.f.level.value
        });
        this.activeModal.close({
            config,
            success: true,
        });
    }
}