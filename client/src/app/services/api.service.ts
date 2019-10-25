import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../config';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private url: string;

    constructor(private http: HttpClient) {
        this.url = config.api;
    }

    public getArticles(): Observable<any[]> {
        return this.http.get<any[]>(`${this.url}/article/all`);
    }

    public getArticle(id: string): Observable<any> {
        return this.http.get<any>(`${this.url}/article/${id}`);
    }

    public createArticle(options: {name: string, level: string, text: string}): Observable<any> {
        return this.http.post<any>(`${this.url}/article/all`, options);
    }

    public wordCheck(options: {answer: string, word: string}): Observable<boolean> {
        return this.http.post<boolean>(`${this.url}/answer/check`, options);
    }

    public fetch() {
        return this.http.get('google.com').toPromise();
    }

}
