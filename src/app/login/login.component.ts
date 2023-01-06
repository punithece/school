import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { loginModal } from './loginmodal';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //username: any;
  //password: any;
  
  @Input()
  loginModal: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  accessToken: any;
// @Inject(SESSION_STORAGE) private storage?: WebStorageService
  constructor(private router: Router,private authService: AuthService, private tokenStorage: TokenStorageService,
    ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      
    }
  }

  public submit(): void {

    //if((this.username=="admin") && (this.password=="admin")) {
     // if(this.username == "admin") {
      //alert("test");
      //localStorage.setItem("adminLogin",this.username);
      this.router.navigateByUrl('dashboard');
      //this.router.navigateByUrl('sidebar_hospital');
    //} else {
    // alert("wrong details");
    //}
    
    
}

onSubmit(): void {
  this.authService.login(this.loginModal).subscribe(
    data => {
      
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      this.tokenStorage.getToken();
      //this.accessToken = window.sessionStorage.setItem('auth-token',"punithToken");
      //this.accessToken = window.sessionStorage.getItem('auth-token');
      this.router.navigateByUrl('dashboard');

      //this.storage?.set('JwtToken', data.accessToken);
      //this.isLoginFailed = false;
      //this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      
      this.reloadPage();
    },
    err => {
      this.errorMessage = err.error.message;
      //this.isLoginFailed = true;
    }
  );
}

reloadPage(): void {
  window.location.reload();
}

}
