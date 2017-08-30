import {Injectable} from '@angular/core';
import {Person} from './app.models';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Http, Response} from '@angular/http';


@Injectable()
export class PersonService {

    persons: Person[];
    private personsJsonFile = 'persons.json';  // URL to json file

    constructor(private http: Http) {
    }

    getAllPersons(): Observable<Person[]> {
        return this.http.get(this.personsJsonFile)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
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


    readFile($event: any) {
        let file = $event.target.files[0];

        let reader = new FileReader();

        let service = this;

        reader.onload = function (e) {
            let text = reader.result;
            let data = JSON.parse(text);
            service.persons = data.data;
        }

        reader.readAsText(file);
    }

    // readJsonFile(file: File) {
    //     let reader = new FileReader();
    //
    //     reader.onload = function(e) {
    //         let text = reader.result;
    //     }
    //
    //     reader.readAsText(file, encoding);
    // }
}
