import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordModalComponent } from './components/header/word-modal.component';
import { BodyComponent } from './components/body/body.component';
import { EntryComponent } from './components/entry/entry.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        WordModalComponent,
        BodyComponent,
        EntryComponent
    ],
    providers: [
        //services
    ],
    exports: [
        EntryComponent
    ]
})
export class TextViewerModule { }
