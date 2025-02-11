import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { registerLicense } from '@syncfusion/ej2-base';
import { AuthServiceService } from './services/auth/auth-service.service';
import { MenuItem } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public date = new Date().getFullYear();
  loggedin: boolean = false;
  items: MenuItem[] = [];
  username: string | null = "";

  constructor(private router: Router, private authServiceService: AuthServiceService) {}

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if (token != null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let a = this.parseJwt(token);
      console.log("token", a);
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.username = localStorage.getItem("username");
        this.validateToken(token);
      }
    });

    registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCdkx0R3xbf1xzZFJMZVVbQXVPIiBoS35RdUVkW3xfeXFcQ2lYV0J3');
    this.authServiceService.loggedInSubject.subscribe(x => {
      console.log('loggedInSubject fired', x);
      this.loggedin = x;
    });

    if (token?.length) {
      this.loggedin = true;
    }

    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ];
  }

  logout() {
    localStorage.removeItem("token");
    this.loggedin = false;
  }

  validateToken(token: string | null) {
    if (token) {
      let a = this.parseJwt(token);
      if (localStorage.getItem("employeeId")?.toString() === a['unique_name']) {
        console.log("Token is valid.");
      } else {
        console.log("Token is not valid.");
      }
    }
  }

  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  navigateToDefaulRoute() {
    this.router.navigate(['']);
  }
}
