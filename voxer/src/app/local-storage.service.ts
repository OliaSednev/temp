import {Person} from './app.models';
import {Injectable} from '@angular/core';

// declare var toastr: any;

@Injectable()
export class LocalStorageService {

    storageKey: string = 'personStorage';

    saveToStorage(persons: Person[]) {
        let stringifyObject = JSON.stringify(persons);
        localStorage.setItem(this.storageKey, stringifyObject);
        toastr.success('persons saved successfuly');
    }

    removeStorage() {
        localStorage.removeItem(this.storageKey);
    }

    getFromStorage(): Person[] {
        return <Person[]>JSON.parse(localStorage.getItem(this.storageKey));
    }
}
