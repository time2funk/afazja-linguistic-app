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
    selector: 'app-create-article',
    templateUrl: './create-article.modal.component.html',
    styleUrls: []
})
export class CreateArticleModalComponent implements OnInit {
    @Input() config: any = {};
    public formGroup: FormGroup;
    public submitted: boolean = false;
    public error: string = null;
    public title: string = 'Utwórz artykuł';

    constructor(
        private api: ApiService,
        private loader: PreloaderService,
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
    ) { }

    public ngOnInit(): void {
        this.initForm();
        if (this.config) {
            const { name, text } = this.config;
            if (name) {
                this.f.name.setValue(name);
            }
            if (text) {
                this.f.text.setValue(text);
            }
        }
    }

    get f() { return this.formGroup.controls; }

    private initForm(): void {
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
            text: [null, Validators.required],
        });
    }

    public submitHandler(): void {
        this.submitted = true;
        if (this.formGroup.invalid) return;

        const article: any = {
            name: this.f.name.value,
            text: this.f.text.value,
        }
        if (this.config) {
            console.log({config: this.config})
            article._id = this.config._id
            this.updateArticle(article);
        } else {
            this.createArticle(article);
        }
    }

    private createArticle(article): void {
        this.loader.show();
        this.api.createArticle(article)
            .subscribe(
                ({data}) => {
                    this.loader.hide();
                    this.activeModal.close({
                        article: data,
                        success: true,
                    });
                },
                error => {
                    this.error = error;
                    this.loader.hide();
                }
            );
    }

    private updateArticle(article): void {
        this.loader.show();
        this.api.updateArticle(article)
            .subscribe(
                ({data}) => {
                    this.loader.hide();
                    this.activeModal.close(Object.assign({}, {
                        success: true,
                        article: data,
                    }));
                },
                error => {
                    this.error = error;
                    this.loader.hide();
                }
            );
    }
}