import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TextViewerModule } from './components/text-viewer/text-viewer.module';
import { ApiService } from './services/api.service';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        NavBarComponent
    ],
    imports: [
        BrowserModule,
        TextViewerModule,
        HttpClientModule,
        FormsModule,
        // FontAwesomeModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { };
