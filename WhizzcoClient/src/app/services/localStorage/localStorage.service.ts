import { Injectable } from '@angular/core';
import * as M from '../../models/app.models';

@Injectable()
export class LocalStorageService {
    get<T>(key: M.LocalStorageKey): T {
        if (!localStorage) {return undefined;}

        let data = localStorage.getItem(M.LocalStorageKey[key]);

        if (!data) {
            return undefined;
        } else {
            return JSON.parse(data);
        }
    }

    set(key: M.LocalStorageKey, value: any): void {
        if (!localStorage) return;

        localStorage.setItem(M.LocalStorageKey[key], JSON.stringify(value));
    }

    delete(key: M.LocalStorageKey): void {
        if (!localStorage) return;
        localStorage.removeItem(M.LocalStorageKey[key]);
    }
}