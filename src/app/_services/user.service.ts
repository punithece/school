import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUrlFiles } from '../AppUrlFiles';

const API_URL = 'http://localhost:8080/springboot-first-app-testng-1/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(AppUrlFiles.APP_URL_AWS_LOCAL + 'greeting', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppUrlFiles.APP_URL_AWS_LOCAL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AppUrlFiles.APP_URL_AWS_LOCAL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppUrlFiles.APP_URL_AWS_LOCAL + 'admin', { responseType: 'text' });
  }


}
