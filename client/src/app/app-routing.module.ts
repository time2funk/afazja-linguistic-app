import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryPageComponent } from './components/pages/library-page/library-page.component';
import { ArticlePageComponent } from './components/pages/article-page/article-page.component';

const routes: Routes = [
    {
        path: '', 
        pathMatch: 'full',
        redirectTo: '/library'
    },
    { 
        path: 'library', 
        component: LibraryPageComponent,
    },
    { 
        path: 'article/:id', 
        component: ArticlePageComponent,
    },
    { 
        path: '**', 
        redirectTo: '/library',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
