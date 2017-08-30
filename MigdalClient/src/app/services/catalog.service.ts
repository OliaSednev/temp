import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {CatalogItem} from '../models/app.models';

@Injectable()
export class CatalogItemService {

    private catalogItemsServiceUrl: string = 'http://localhost:54385/api/catalogitems';

    constructor(private http: Http) {
    }

    /*////////////////Students////////////////////////////*/
    getCatalogItems(): Observable<CatalogItem[]> {
        return this.http.get(this.catalogItemsServiceUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateCatalogItem(catalogItem: CatalogItem): Observable<CatalogItem> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(`${this.catalogItemsServiceUrl}/${catalogItem.ID}`, catalogItem, new RequestOptions({headers: headers, body: catalogItem}))
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteCatalogItem(catalogItem: CatalogItem): Observable<CatalogItem> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.delete(`${this.catalogItemsServiceUrl}/${catalogItem.ID}`, {headers: headers})
            .map(() => null)
            .catch(this.handleError);
    }

    addCatalogItem(newCatalogItem: CatalogItem): Observable<CatalogItem> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.catalogItemsServiceUrl, newCatalogItem, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        // return body.data || {};
        return body || {};
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
