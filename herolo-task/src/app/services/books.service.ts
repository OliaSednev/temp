import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Book} from '../models/app.models';

@Injectable()
export class BooksService {

    private booksFromJsonFile = 'http://localhost:4200/assets/books.json';

    constructor(private http: Http) {
    }

    getBooks(): Observable<Book[]> {
        return this.http.get(this.booksFromJsonFile)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
