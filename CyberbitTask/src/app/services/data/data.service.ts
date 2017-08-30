import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Data } from '../../models/app.models';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private dataUrl: string;

    constructor(private http: Http) {
        this.dataUrl = 'ex_data.json';
    }

    getData(): Observable<Data> {
        return this.http.get(this.dataUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    sendData(devices: string, protocols: string, times: string ) {

        let params = {};
        // : URLSearchParams = new URLSearchParams();
        params['devices'] = devices;
        params['protocols'] = protocols;
        params['times'] = times;


        return this.http.get(this.dataUrl, {search: params})
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
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
