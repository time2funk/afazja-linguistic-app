import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { PreloaderService } from '../../../services/preloader.service';
import { ModalService } from 'src/app/services/modal.service';
import {
    faTimes,
    faAngleLeft,
    IconDefinition,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

interface articleInterface {
    sentences: any[],
    name: string,
    level?: string
}

@Component({
    selector: 'app-article-page',
    templateUrl: './article-page.component.html',
    styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

    public faAngleLeftIcon: IconDefinition = faAngleLeft;
    public faTimesIcon: IconDefinition = faTimes;
    public faInfoCircleIcon: IconDefinition = faInfoCircle;
    public article: articleInterface;
    public currentSentence: any = null;
    public focusWord: any = null;
    private articleId: string;
    private level: string;
    private subscribe: any;
    public imagesFeature: string | boolean;
    public imagesLength: string | number;
    public timeStart: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loader: PreloaderService,
        private api: ApiService,
        private cd: ChangeDetectorRef,
        private modalService: ModalService,
    ) {
        this.level = this.route.snapshot.paramMap.get('level');
        this.imagesFeature = this.route.snapshot.paramMap.get('imagesFeature') === 'true';
        if (this.imagesFeature) {
            this.imagesLength = Number.parseInt(
                this.route.snapshot.paramMap.get('imagesLength'), 10
            );
        }
        this.timeStart = new Date();
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

    public wordOnFocus(part) {
        this.focusWord = part;
    }

    public wordFocusOut() {
        this.focusWord = null
    }

    public backToLibrary() {
        this.router.navigate([`/library`]);
    }

    public showFinishWindow() {
        const currentModalRef: NgbModalRef = this.modalService.openAssignmentFinishModal(this.article, this.timeStart);
        currentModalRef.result.then(
            responce => {
                if (responce && responce.action) {
                    if (responce.action === 'close') {
                        this.backToLibrary();
                    } else {
                        this.refreshAssignment();
                    }
                }
            },
            reason => {
                // on Close Event 
            }
        );
    }

    public refreshAssignment() {
        console.log({ article: this.article });
        this.loader.show();
        this.currentSentence = null;
        this.focusWord = null;
        this.article.sentences.forEach(sentence => {
            if (sentence.answers) {
                for (let [key, value] of Object.entries(sentence.answers)) {
                    sentence.answers[key] = null;
                }
            }
            delete sentence.noAsk;
            delete sentence.preview;
            sentence.parts.forEach(part => {
                delete part.ask;
                delete part.success;
            });
        });
        this.manageSentence();
        this.loader.hide();
    }

    public backToSentences() {
        this.currentSentence = null;
        this.focusWord = null;
    }

    public doAssignment() {
        this.focusWord = null;
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
            this.cd.detectChanges();
        } else {
            part.success = false;
        }
        console.log('right answer', part.text);
    }

    private setSentenceAskWords(words, sentence) {
        sentence.answers = {};
        let max;
        switch (this.article.level) {
            case 'hard':
                max = words.length < 5 ? words.length : 5;
                break;
            case 'medium':
                max = words.length < 3 ? words.length : 3;
                break;
            case 'easy':
            default:
                max = 1;
        }
        const indexes = [];
        while (indexes.length < max) {
            const randIndex = Math.floor(Math.random() * words.length);
            if (!indexes.includes(randIndex)) {
                indexes.push(randIndex);
                words[randIndex].ask = true;
                sentence.answers[randIndex] = null;
            }
        }
    }

    private getArticle(): Subscription {
        this.loader.show();
        const options: any = {
            imagesFeature: this.imagesFeature,
        };
        if (this.imagesFeature) {
            options.imagesLength = this.imagesLength;
        }
        return this.api.getArticle(this.articleId, options).subscribe(
            (res) => {
                this.loader.hide();
                console.log({ res })
                this.article = Object.assign({}, res.data, {
                    level: this.level,
                });
                this.manageSentence();
            },
            (error: any) => {
                console.error({ error });
                this.loader.hide();
            }
        );
    }

    private manageSentence(): void {
        this.article.sentences.forEach(sentence => {
            const words = sentence.parts.filter(i => i.type === 'word');
            if (!words.length) {
                // sentence.preview = true;
                sentence.noAsk = true;
            } else {
                this.setSentenceAskWords(words, sentence);
            }
        });
    }
}
