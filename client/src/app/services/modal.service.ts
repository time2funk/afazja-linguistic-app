import {
    Injectable,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CreateArticleModalComponent } from '../components/common/modals/create-article/create-article.modal.component';
import { AssignmentConfigModalComponent } from '../components/common/modals/assignment-config/assignment-config.modal.component';
import { FinishAssignmentComponent } from '../components/common/modals/finish-assignment/finish-assignment.component';


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

    public openAssignmentConfigModal(article): NgbModalRef {
        const ref = this.modalService.open(AssignmentConfigModalComponent, defaultConfig);
        ref.componentInstance.config = article;
        return ref;
    }

    public openAssignmentFinishModal(data): NgbModalRef {
        const ref = this.modalService.open(FinishAssignmentComponent, defaultConfig);
        ref.componentInstance.config = data;
        return ref;
    }
}
