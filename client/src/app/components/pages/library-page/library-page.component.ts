import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
    faPlus,
    IconDefinition,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import { 
    faTrashAlt,
    faEdit,
} from '@fortawesome/free-regular-svg-icons';
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

    public faPlusIcon: IconDefinition = faPlus;
    public faBarsIcon: IconDefinition = faBars;
    public faTrashIcon: IconDefinition = faTrashAlt;
    public faEditIcon: IconDefinition = faEdit;
    private subscribes: Subscription[] = [];
    public articleList: any[];

    constructor(
        private router: Router,
        private api: ApiService,
        private loader: PreloaderService,
        private modalService: ModalService,
    ) { }

    public ngOnInit() {
        this.getArticles();
    }

    public ngOnDestroy() {
        if (this.subscribes.length) {
            this.subscribes.forEach(s => s.unsubscribe());
        }
    }

    public deleteArticle(article) {
        if (!confirm('Jesteś pewny ?')) {
            return;
        }
        this.loader.show();
        const subscribe = this.api.deleteArticle(article._id).subscribe(
            res => {
                this.loader.hide();
                const index = this.articleList.findIndex(i => i._id === article._id);
                if (index > -1) {
                    this.articleList.splice(index, 1);
                }
            },
            error => {
                console.error({ error });
                this.loader.hide();
            },
        );
        this.subscribes.push(subscribe);
    }

    public openEditArticleModal(article) {
        const currentModalRef: NgbModalRef = this.modalService.openArticleModal(article);
        currentModalRef.result.then(
            responce => {
                if (responce.success) {
                    this.updateArticle(responce.article);
                }
            },
            reason => {
                // on Close Event 
            }
        );
    }

    public openCreateArticleModal() {
        const currentModalRef: NgbModalRef = this.modalService.openArticleModal();
        currentModalRef.result.then(
            responce => {
                if (responce.success) {
                    this.addArticle(responce.article);
                }
            },
            reason => {
                // on Close Event 
            }
        );
    }

    public openAssignmentConfigModal(article, event) {
        if (event.target.closest('.dropdown')) {
            return;
        }
        
        const currentModalRef: NgbModalRef = this.modalService.openAssignmentConfigModal(article);
        currentModalRef.result.then(
            responce => {
                if (responce.success) {
                    console.log({ responce })
                    this.router.navigate(['/article', article._id, { level: responce.config.level }]);
                }
            },
            reason => {
                // on Close Event 
            }
        );
    }

    private updateArticle(newArticle): void {
        const oldArticle = this.articleList.find(i => i._id === newArticle._id);
        Object.assign(oldArticle, {
            sentences: newArticle.sentences,
            name: newArticle.name,
            text: newArticle.text,
        });
        console.log({oldArticle, newArticle})
    }

    private addArticle(article) {
        this.articleList.push(article);
    }

    private getArticles(): void {
        this.loader.show();
        const subscribe = this.api.getArticles().subscribe(
            res => {
                this.loader.hide();
                this.articleList = Array.from(res.data);
            },
            error => {
                console.error({ error });
                this.loader.hide();
            }
        );
        this.subscribes.push(subscribe);
    }
}
