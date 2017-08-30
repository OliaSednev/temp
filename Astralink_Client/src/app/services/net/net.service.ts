import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import * as M from '../../models/app.models';
import {Drawing} from '../../models/app.models';

@Injectable()
export class NetService {

    private serverUrl: string = 'http://localhost:4010';

    constructor(private http: Http) {

    }

    // *************** Login / Logout ************************
    login(username: string, password: string): Observable<M.User> {

        return this.http.post(`${this.serverUrl}/api/login`, {username, password })
            .map(this.extractData)
            .catch(this.handleError);
    }

    // *************** Drawings ************************

    getPublicDrawings(): Observable<Drawing[]> {
        return this.http.get(`${this.serverUrl}/api/drawings`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDrawing(id: string): Observable<Drawing> {
        return this.http.get(`${this.serverUrl}/api/drawings/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    uploadDrawing(drawingData: Drawing): Observable<Drawing> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.serverUrl}/api/drawings`, drawingData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteDrawing(drawing: Drawing): Observable<Drawing> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.delete(`${this.serverUrl}/api/drawings`, new RequestOptions({headers: headers, body: drawing}))
            .map(this.extractData)
            .catch(this.handleError);
    }

    // *************** Handlers ************************

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
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
