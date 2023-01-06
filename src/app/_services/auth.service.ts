import { Inject, Injectable } from '@angular/core';

const AUTH_API = 'http://localhost:8080/springboot-first-app-testng-1/api/';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginModal } from '../login/loginmodal';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { AppUrlFiles } from '../AppUrlFiles';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//@Inject(SESSION_STORAGE) private storage?: WebStorageService
  constructor(private http: HttpClient,
    ) { }

  login(loginModal:loginModal): Observable<any> {
    let body = JSON.stringify(loginModal);
    //alert("Inside Body"+body);
    return this.http.post(AppUrlFiles.APP_URL_AWS_LOCAL + 'api/signin',  {username: "user",password:"password"}, httpOptions);
  }

  /*{
    username: credentials.username,
    password: credentials.password
  }
  {username: "user",password:"password"}
  */

  register(user:any): Observable<any> {
    return this.http.post(AppUrlFiles.APP_URL_AWS_LOCAL + 'api/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  logout() {
    let headerslogout = new HttpHeaders();
    headerslogout.append('Accept', 'application/json');
    //headerslogout.append('JwtToken',this.storage?.get('JwtToken'));
    return this.http.get(AppUrlFiles.APP_URL_AWS_LOCAL + 'api/logout', {headers :headerslogout} );
  }
}
