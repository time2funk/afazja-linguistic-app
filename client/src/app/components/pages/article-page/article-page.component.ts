import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { PreloaderService } from '../../../services/preloader.service';
// import { ModalService } from 'src/app/services/modal.service';
// import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
    faTimes,
    faAngleLeft,
    // faWindowClose,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-article-page',
    templateUrl: './article-page.component.html',
    styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

    public faAngleLeftIcon: IconDefinition;
    // public faWindowCloseIcon: IconDefinition;
    public faTimesIcon: IconDefinition;
    public articleId;
    public article: {
        sentences: any[],
        name: String,
    };
    private subscribe: any;

    /////////////////////
    public currentSentence: any = null;
    public answers: any = {};
    public answer = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loader: PreloaderService,
        private api: ApiService,
        // private modalService: ModalService,
    ) {
        this.faAngleLeftIcon = faAngleLeft;
        this.faTimesIcon = faTimes;
        this.article = {
            sentences: [],
            name: '',
        };
    }

    public ngOnInit() {
        this.route.params.subscribe((params: Params) => this.articleId = params.id);
        this.subscribe = this.getArticle();

    }

    public ngOnDestroy() {
        if (this.subscribe) {
            this.subscribe.unsubscribe();
        }
    }

    public backToLibrary() {
        this.router.navigate([`/library`]);
    }

    public backToSentences() {
        this.currentSentence = null;
    }

    public doAssignment() {
        if (this.currentSentence) {
            this.currentSentence.preview = true;
        }
    }

    public sentenceSelect(id) {
        this.currentSentence = this.article.sentences.find(s => s.index === id);
    }

    public isLastSentence(ind) {
        return ind === this.article.sentences.length - 1;
    }

    public wordChangeHandler(word, part) {
        if (word === part.text) {
            part.success = true;
        } else {
            part.success = false;
        }
        console.log({word, part, answers:this.answers, answer:this.answer});
    }

    private getArticle(): Subscription {
        this.loader.show();
        return this.api.getArticle(this.articleId).subscribe(
            (res) => {
                this.article = Object.assign({}, res.data);
                this.article.sentences.forEach(sentence => {
                    const words = sentence.parts.filter(i => i.type === 'word');
                    if (!words.length) {
                        sentence.preview = true;
                    } else {
                        // const step = words.length / 2;
                        let i = 1;
                        words.forEach(word => {
                            if (i != 3) {
                                i++;
                                word.ask = false;
                                // return;
                            } else {
                                word.ask = true;
                                i = 1;
                                // return;
                            }
                        });
                    }
                })
                console.log({res: this.article});
            },
            (error: any) => console.error({ error }),
            () => this.loader.hide()
        );
    }
}
