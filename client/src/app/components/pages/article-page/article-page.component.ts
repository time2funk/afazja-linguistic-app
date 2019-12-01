import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { PreloaderService } from '../../../services/preloader.service';
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
    public articleId;
    public article: articleInterface;
    public currentSentence: any = null;
    private subscribe: any;
    private level: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loader: PreloaderService,
        private api: ApiService,
        private cd: ChangeDetectorRef,
    ) {
        this.level = this.route.snapshot.paramMap.get('level');
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
        return this.api.getArticle(this.articleId).subscribe(
            (res) => {
                this.loader.hide();
                this.article = Object.assign({}, res.data, {
                    level: this.level,
                });
                this.article.sentences.forEach(sentence => {
                    const words = sentence.parts.filter(i => i.type === 'word');
                    if (!words.length) {
                        // sentence.preview = true;
                        sentence.noAsk = true;
                    } else {
                        this.setSentenceAskWords(words, sentence);
                    }
                })
            },
            (error: any) => {
                alert(error);
                console.error({ error });
                this.loader.hide();
            }
        );
    }
}
