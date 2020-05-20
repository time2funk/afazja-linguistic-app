import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
    FormGroup,
    FormBuilder,
    Validators
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
interface imagesLengthOption {
    label: string;
    value: string | number;
}
const DEFAULT_LEVEL = LevelsEnum.EASY;
const DEFAULT_IMAGES_LENGTH_VALUE = 3;

@Component({
    selector: 'app-assignment-config',
    templateUrl: './assignment-config.modal.component.html',
    styleUrls: ['./assignment-config.modal.component.scss']
})
export class AssignmentConfigModalComponent implements OnInit {
    @Input() config: any = {};
    public formGroup: FormGroup;
    public submitted: boolean = false;
    public error: string = null;
    public title: string = 'Konfiguracja zadania';
    public levelTypes: levelType[] = [
        {
            label: 'Łatwy',
            name: LevelsEnum.EASY,
            description: '( 1 słowo )',
        }, {
            label: 'Średni',
            name: LevelsEnum.MEDIUM,
            description: '( 1 - 3 słowa )',
        }, {
            label: 'Trudny',
            name: LevelsEnum.HARD,
            description: '( 1 - 5 słów )',
        }
    ];
    public imagesLengthOptions: imagesLengthOption[] = [
        {
            label: "2 obrazka",
            value: 2
        },
        {
            label: "3 obrazka",
            value: 3
        },
        {
            label: "4 obrazka",
            value: 4
        },
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
            level: [DEFAULT_LEVEL, Validators.required],
            imagesFeature: [false, Validators.required],
        });

        this.formGroup.controls.imagesFeature.valueChanges.subscribe(value => {
            if (value) {
                this.formGroup.addControl(
                    'imagesLength',
                    this.formBuilder.control(DEFAULT_IMAGES_LENGTH_VALUE, Validators.required)
                );
            } else {
                this.formGroup.removeControl('imagesLength');
            }
        });
    }


    public submitHandler() {
        const imagesFeature = this.f.imagesFeature.value;
        const config = Object.assign({}, this.config, {
            level: this.f.level.value,
            imagesFeature: imagesFeature,
        });
        if (imagesFeature) {
            config.imagesLength = this.f.imagesLength.value;
        }
        this.activeModal.close({
            config,
            success: true,
        });
    }
}