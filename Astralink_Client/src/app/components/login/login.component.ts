import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    returnUrl: string;
    loginData: { name?: string, password?: string } = {};
    invalidCredentials: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private userService: UserService) {

    }

    ngOnInit() {
        this.userService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login($event: any) {
        $event.preventDefault();

        this.userService.login(this.loginData.name, this.loginData.password)
            .subscribe(
                data => {
                    this.invalidCredentials = false;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.invalidCredentials = true;
                });
    }
}
