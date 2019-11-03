import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
    faPlus,
    faJournalWhills,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { ApiService } from '../../../services/api.service';
import { PreloaderService } from '../../../services/preloader.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-library-page',
    templateUrl: './library-page.component.html',
    styleUrls: ['./library-page.component.scss']
})
export class LibraryPageComponent implements OnInit, OnDestroy {

    public faPlusIcon: IconDefinition;
    public faJournalWhillsIcon: IconDefinition;
    private subscribe: any;
    private currentModalRef: NgbModalRef;

    public articleList: any[];
    // test
    public testArticleList: any[] = [
        {
            name: 'Article 1',
            id: 123,
        },
        {
            name: 'Article 2',
            id: 124,
        },
        {
            name: 'Article 3',
            id: 125,
        },
        {
            name: 'Lorem Ipsum',
            id: 126,
        },
        {
            name: 'Journal Whills',
            id: 127,
        },
    ];

    constructor(
        private router: Router,
        // private route: ActivatedRoute,
        private api: ApiService,
        private loader: PreloaderService,
        private modalService: ModalService,
    ) {
        this.faPlusIcon = faPlus;
        this.faJournalWhillsIcon = faJournalWhills;
    }

    public ngOnInit() {
        this.subscribe = this.getArticles();
    }

    public ngOnDestroy() {
        if (this.subscribe) {
            this.subscribe.unsubscribe();
        }
    }

    public openArticle(id) {
        this.router.navigate([`/article/${id}`]);
        // this.router.navigate([`${link.split('?')[0]}`], { queryParams: { id: 37, username: 'jimmy' } });
    }

    public openModal() {
        this.currentModalRef = this.modalService.openCreateArticleModal();
        this.currentModalRef.result.then(
            responce => {
                if (responce.success) {
                    this.updateArticleList(responce.id, responce.name)
                }
            },
            reason => {
                // on Close Event 
            }
        );
    }

    private updateArticleList(id, name) {
        this.articleList.push({
            name,
            _id: id
        });
    }

    private getArticles(): Subscription {
        this.loader.show();
        return this.api.getArticles().subscribe(
            (res) => this.articleList = Array.from(res.data),
            (error: any) => console.error({ error }),
            () => this.loader.hide()
        );
    }
}
