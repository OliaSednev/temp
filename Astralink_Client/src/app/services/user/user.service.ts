import {Injectable} from '@angular/core';
import {LocalStorageService} from '../localStorage/localStorage.service';
import * as M from '../../models/app.models';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {NetService} from '../net/net.service';

@Injectable()
export class UserService {
    private user: M.User;
    private userObservable: Observable<M.User>;
    private userChangeSubscriber: Subject<M.User>;

    constructor(private localStorageService: LocalStorageService,
                private net: NetService,
                private router: Router) {


        this.user = this.localStorageService.get<M.User>(M.LocalStorageKey.User);

        this.userChangeSubscriber = new Subject();

        this.userObservable = Observable.create(o => {
            this.userChangeSubscriber.subscribe(o);

            this.user = this.localStorageService.get<M.User>(M.LocalStorageKey.User);

            // if (!this.user) {
            //     this.user = {
            //         user: {
            //             name: 'ninja',
            //             role: 'Admin',
            //             permissions: [],
            //         },
            //         token: '12345',
            //         expiresOn: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7) - (1000*60*60))
            //     };
            //
            //     this.localStorageService.set(M.LocalStorageKey.User, this.user);
            // }

            if (this.isLoggedIn()) {
                this.userChangeSubscriber.next(this.user);
            }
        });
    }

    login(username: string, password: string): Observable<any> {
        return Observable.create(o => {
            this.net.login(username, password).subscribe(user => {
                if (!user) {
                    o.error();
                    o.complete();
                    return;
                }
                this.user = user;

                this.localStorageService.set(M.LocalStorageKey.User, this.user);

                this.userChangeSubscriber.next(this.user);

                o.next(user);
                o.complete();
            }, error => {
                o.error(error);
                o.complete();
            });
        });
    }

    logout() {
        this.user = undefined;
        this.localStorageService.delete(M.LocalStorageKey.User);

        this.userChangeSubscriber.next(this.user);
    }

    isLoggedIn(): boolean {

        if (this.user && this.user.name && this.user.name.length > 0) {
            return true;
        }

        return false;
    }

    getLoggedInUser(): M.User {
        if (this.isLoggedIn()) {
            return this.user;
        }

        return undefined;
    }

    getLoggedInUserObservable(): Observable<M.User> {
        return this.userObservable;
    }

    navigateToLoginPage(returnPath?: string) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: returnPath }});
    }
}
