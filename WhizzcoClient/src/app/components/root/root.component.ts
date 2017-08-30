import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/app.models';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './root.component2.html'
})
export class RootComponent {
  loggedInUser: User;
  username: string;
  private _componentTitle: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.userService.getLoggedInUser();
    this.userService.getLoggedInUserObservable().subscribe(user => {
      this.loggedInUser = user;
      if (!this.loggedInUser) return;

      this.username = user.user.name;
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
    if (this.router.isActive("/dashboard",true))
      return "Dashboard";
    else if(this.router.isActive("/websites",true))
      return "Websites";
    else
      return "Campaign";
  }
  //
  // set componentTitle(value: string) {
  //   this._componentTitle = value;
  // }
}
