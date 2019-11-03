import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
    FormGroup,
    Validators,
    FormBuilder
} from '@angular/forms';

import { ApiService } from '../../../../services/api.service';
import { PreloaderService } from '../../../../services/preloader.service';

@Component({
    selector: 'app-create-article.modal',
    templateUrl: './create-article.modal.component.html',
    styleUrls: ['./create-article.modal.component.scss']
})
export class CreateArticleModalComponent implements OnInit {
    @Input() config: object = {};
    public formGroup: FormGroup;
    public submitted: boolean = false;
    public error: string = null;
    public title: string = 'Create Article';

    constructor(
        private api: ApiService,
        private loader: PreloaderService,
        private formBuilder: FormBuilder,
        private activeModal: NgbActiveModal,
    ) { }

    public ngOnInit(): void {
        this.initForm();
    }

    get f() { return this.formGroup.controls; }

    private initForm(): void {
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
            // level: [null, Validators.required],
            text: [null, Validators.required],
        });
    }

    public submitHandler() {
        this.submitted = true;
        if (this.formGroup.invalid) return;

        const article = {
            name: this.f.name.value,
            // level: this.f.level.value,
            text: this.f.text.value,
        }
        this.loader.show();
        this.api.createArticle(article)
            .subscribe(
                data => {
                    if (data.id) {
                        this.activeModal.close({
                            name: article.name,
                            id: data.id,
                            success: true,
                        });
                    } 
                },
                error => this.error = error,
                () => this.loader.hide()
            );
    }
}