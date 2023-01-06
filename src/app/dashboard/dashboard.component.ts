import { Component, Inject, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, of, ReplaySubject, Subject, zip } from 'rxjs';
import { count, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { async } from '@angular/core/testing';
import { ThemeService } from '@progress/kendo-angular-charts';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { DataserviceService } from '../_services/dataservice.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  firstName:string = "Punith";
  lastName:string = "Galiveti";
   val: string = ''; 
   public opened = false;
   title = '';
   data:any;
   accessTokenCheck:any;
   public titleone:string = 'Sharing data using service';
   sizeone:any;
   square:any;
  courses:any;
   birthday = new Date();
   accessToken : any;
   checkUppercasePipe:string = "Punith";
   checklowercasePipe:string = "GALIVETI"
   checkcurrency:number = 243;
   titleCasePipe:string = "Java Module";
   localstoragevalue:any;
   viewLocalStorageValue:any;

  public close(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }
  isVisible: boolean = true;
  isDropDownVisible = true;
  public listItems: Array<string> = ["JAVA", "JAVA SCRIPT", "SPRING", "HIBERNATE", "SPRING BOOT"];

   propertyTypes = [
      {"id":1,name: "Java"},
      {"id":2,name:"JavaScript"},
      {"id":3,name:"Spring"},
      {"id":4,name:"Hibernate"},
      {"id":5,name:"SpringBoot"}
   ]
   //@Inject(SESSION_STORAGE) private storage?: WebStorageService
  constructor(private router: Router,private _dataService: DataserviceService,
    private tokenStorage: TokenStorageService
    ) { 
    this.data = "";
    this.title = "USing RxJs with angular";
    let a = this.getData();
    
   
    //dataService.setOption('square', this.square);

  }

  ngOnInit(): void {
    //this.accessTokenCheck = window.sessionStorage.setItem('auth-token','punithnewToken');
    //alert(""+this.tokenStorage.getToken());
    this.accessTokenCheck = window.sessionStorage.setItem('accessToken',this.tokenStorage.getToken());
    this.sizeone =16;
    this.square = Math.sqrt(this.sizeone);
    this.courses = this._dataService.getCourses();
    this._dataService.setOption('sizeone', this.sizeone);
    this._dataService.setOption('square', this.square);
    //this.storage?.get('JwtToken');
    //this.accessTokenCheck = this.storage?.get('JwtToken');
    this.localstoragevalue = window.localStorage.setItem('viewAccess','Developed By Punith Reddy');



  }

  ngAfterViewInit() {
    this.accessToken = sessionStorage.getItem('accessToken');
    this.viewLocalStorageValue = localStorage.getItem('viewAccess');
  }

  hideList(){
    this.isVisible = false;
  }

  showList(){
    this.isVisible = true;
  }

  hideDropDownList() {
    this.isDropDownVisible = false;
  }
  showDropDownList() {
    this.isDropDownVisible = true;
  }

 foo(input: boolean) {
    let one = 1200;
    let ans;
    if (input) {
         ans = one + 1;
    }
    alert("ans =="+ans);
    return ans;
}

onclickButton() {
  alert("SECOND BUTTON CLICKED");
}

onClickDIV() {
  alert("DIV BUTTON CLICKED");
}

onSubmitValues() {
    let all_nums = of(1, 7, 5, 10, 10, 20);
    let final_val = all_nums.pipe(count());
    final_val.subscribe(x => console.log("The count is"+x));
}

subjectafunction() {
  const subject_test = new Subject();

  subject_test.subscribe({
    next: (v) =>console.log('From Subject : ${v}'+v)
  });

  subject_test.subscribe({
    next: (v) =>console.log('From Subject : ${v}'+v)
  });
  //subject_test.next("A");
  //subject_test.complete();
  //subject_test.next("B");
  subject_test.error(new Error( "There is an error"));
}

onajaxCall(){
  let finalval = ajax('https://jsonplaceholder.typicode.com/users').pipe(map(e => e.response));
  let subscribe1 = finalval.subscribe(a => console.log(a));
  let subscribe2 = finalval.subscribe(a => console.log(a));
}

onAjaxCallSubject() {
  const subjectTest = new Subject();

  subjectTest.subscribe({
    next: (v) => console.log(v)
  });
  subjectTest.subscribe({
    next: (v) => console.log(v)
  });

  let finalCall = ajax('https://jsonplaceholder.typicode.com/users').pipe(map(e => e.response));
  let subscriber = finalCall.subscribe(subjectTest);
}
onBehaviorSubject() {
  const behaviorSubject = new BehaviorSubject("Testing Behaviour Subject");

  behaviorSubject.subscribe({
    next: (v) =>console.log('observerA: ${v}'+v)
  });
  behaviorSubject.next("Hello");
  behaviorSubject.subscribe({
    next: (v) =>console.log('observerB: ${v}'+v)
  });
  behaviorSubject.next("Last call to Behaviour Subject");

}

onReplaySubject() {
  const replaySubject = new ReplaySubject(1);
  //buffer 2 values but new subscribers

  replaySubject.subscribe({
    next: (v) =>console.log('Testing Replay Subject A: ${v}'+v)
  });
  replaySubject.next(1);
  replaySubject.next(2);
  replaySubject.next(3);
  //replaySubject.next(4)
  replaySubject.subscribe({
    next: (v) => console.log('Testing Replay Subject B: ${v}'+v)
  });
  replaySubject.next(5);
}

onAsyncSubject() {
  const asyncSubject = new AsyncSubject();

  asyncSubject.subscribe({
    next: (v) => console.log('Testing Async Subject A: ${v}'+v)
  });
  asyncSubject.next(1);
  asyncSubject.next(2);
  asyncSubject.next(3);
  asyncSubject.complete();
  asyncSubject.subscribe({
    next: (v) =>console.log('Testing Async Subject B: ${v}'+v)
  });
}

getData() {
  const response = ajax('https://jsonplaceholder.typicode.com/users').pipe(map(e=>e.response));
  response.subscribe(res => {
    console.log(res);
    this.data = res;
  })
}

}
