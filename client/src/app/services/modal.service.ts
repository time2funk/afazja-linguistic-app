import {
    Injectable,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CreateArticleModalComponent } from '../components/common/modals/create-article.modal/create-article.modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    // private modals: any[] = [];

    constructor(
        private modalService: NgbModal,
    ) { }

    public openCreateArticleModal(): NgbModalRef {
        const modalRef = this.modalService.open(CreateArticleModalComponent, {
            windowClass: 'modal-holder',
            centered: true
        });
        return modalRef;
    }
}
