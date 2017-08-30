import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import * as M from '../../models/app.models';
import {CampaignData, DashboardData, WebsiteData} from "../../models/app.models";

@Injectable()
export class NetService {

    private serverUrl: string = 'http://localhost:4005';

    constructor(private http: Http) {

    }

    // *************** Login / Logout ************************
    login(username: string, password: string): Observable<M.User> {

        return this.http.post(`${this.serverUrl}/api/login`, {username, password })
            .map(this.extractData)
            .catch(this.handleError);
    }

    // *************** Dashboard ************************

    getDashboardData(): Observable<DashboardData> {
        return this.http.get(`${this.serverUrl}/api/dashboard`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // *************** Websites ************************

    getWebsitesData(): Observable<WebsiteData[]> {
        return this.http.get(`${this.serverUrl}/api/websites`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // *************** Campaigns ************************

    getCampaignData(id: string): Observable<CampaignData[]> {
        return this.http.get(`${this.serverUrl}/api/websites/${id}`)
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