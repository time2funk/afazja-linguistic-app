import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.api;
    }

    public getArticles(): Observable<any[any]> {
        return this.http.get<any[any]>(`${this.url}/article/all`);
    }

    public getArticle(id: string, options: any = {}): Observable<any> {
        return this.http.get<any>(`${this.url}/article/${id}`, { params: options });
    }

    public createArticle(options: {name: string, /*level: string,*/ text: string}): Observable<any> {
        return this.http.post<any>(`${this.url}/article/new`, options);
    }

    public updateArticle(article): Observable<any> {
        return this.http.post<any>(`${this.url}/article/${article._id}`, {article});
    }

    public deleteArticle(id): Observable<any> {
        return this.http.delete<any>(`${this.url}/article/${id}`);
    }

}
