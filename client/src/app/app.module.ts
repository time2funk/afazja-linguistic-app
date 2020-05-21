import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { LibraryPageComponent } from './components/pages/library-page/library-page.component';
import { ArticlePageComponent } from './components/pages/article-page/article-page.component';
import { CreateArticleModalComponent } from './components/common/modals/create-article/create-article.modal.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { AssignmentConfigModalComponent } from './components/common/modals/assignment-config/assignment-config.modal.component';
import { CarouselComponent } from './components/common/carousel/carousel.component';
import { FinishAssignmentComponent } from './components/common/modals/finish-assignment/finish-assignment.component';
import { SizeIncreasedDirective } from './components/directives/size-increased.directive';

@NgModule({
    declarations: [
        AppComponent,
        LibraryPageComponent,
        ArticlePageComponent,
        CreateArticleModalComponent,
        PreloaderComponent,
        AssignmentConfigModalComponent,
        CarouselComponent,
        FinishAssignmentComponent,
        SizeIncreasedDirective,
    ],
    imports: [
        NgbModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        FontAwesomeModule,
    ],
    providers: [ApiService],
    bootstrap: [AppComponent],
    entryComponents: [
        CreateArticleModalComponent,
        AssignmentConfigModalComponent,
        FinishAssignmentComponent,
    ],
})
export class AppModule { };
