import {Component} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/app.models';
import {Router} from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './root.component.html'
})
export class RootComponent {
    loggedInUser: User;
    username: string;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.loggedInUser = this.userService.getLoggedInUser();
        this.userService.getLoggedInUserObservable().subscribe(user => {
            this.loggedInUser = user;

            if (!this.loggedInUser) {
                return;
            }
            this.username = user.name;
        });
    }

    logout(): void {
        this.userService.logout();
        this.userService.navigateToLoginPage();
        this.loggedInUser = undefined;
        this.username = undefined;
    }

    isActive(instruction: string): boolean {
        return this.router.isActive(instruction, false);
    }

    get componentTitle(): string {
        if (!this.router.isActive('/drawing-canvas-list', true)) {
            if (!this.router.isActive('/drawing-canvas', true)) {
                return 'Drawing';
            } else {
                return 'Create a drawing-canvas';
            }
        } else {
            return 'Public Drawings';
        }
    }
}
