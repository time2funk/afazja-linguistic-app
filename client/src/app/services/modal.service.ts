import {
    Injectable,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CreateArticleModalComponent } from '../components/common/modals/create-article/create-article.modal.component';
import { AssessmentConfigModalComponent } from '../components/common/modals/assessment-config/assessment-config.modal.component';


const defaultConfig: any = {
    windowClass: 'modal-holder',
    centered: true
};

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(
        private modalService: NgbModal,
    ) { }

    public openArticleModal(article?): NgbModalRef {
        const ref = this.modalService.open(CreateArticleModalComponent, defaultConfig);
        ref.componentInstance.config = article || null;
        return ref;
    }

    public openAssessmentConfigModal(article): NgbModalRef {
        const ref = this.modalService.open(AssessmentConfigModalComponent, defaultConfig);
        ref.componentInstance.config = article;
        return ref;
    }
}
