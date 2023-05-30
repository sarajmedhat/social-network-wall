import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  constructor(public userService: UserService, private router: Router) {}
  public logout() {
    this.userService.user = undefined;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
