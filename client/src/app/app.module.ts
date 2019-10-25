import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './components/common/tool-bar/tool-bar.component';
import { TextViewerModule } from './components/text-viewer/text-viewer.module';
import { ApiService } from './services/api.service';
import { LibraryPageComponent } from './components/pages/library-page/library-page.component';
import { ArticlePageComponent } from './components/pages/article-page/article-page.component';
import { PictureTooltipComponent } from './components/common/tooltips/picture.tooltip/picture.tooltip.component';
import { DescriptionTooltipComponent } from './components/common/tooltips/description.tooltip/description.tooltip.component';
import { CreateArticleModalComponent } from './components/common/modals/create-article.modal/create-article.modal.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolBarComponent,
        LibraryPageComponent,
        ArticlePageComponent,
        PictureTooltipComponent,
        DescriptionTooltipComponent,
        CreateArticleModalComponent,
        PreloaderComponent,
    ],
    imports: [
        NgbModule,
        ReactiveFormsModule,
        BrowserModule,
        TextViewerModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        // FontAwesomeModule,
    ],
    providers: [ApiService],
    bootstrap: [AppComponent],
    entryComponents: [CreateArticleModalComponent],
})
export class AppModule { };
