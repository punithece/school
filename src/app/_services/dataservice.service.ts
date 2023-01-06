import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
 private data :any;

  courses = [
    {'id': 1,'name': "punith"}
  ]

  constructor() { }

  setOption(option:any,value:any) {
       //debugger;
       this.data[option] = value;
  }

  getOption() {
    return this.data;
  }

  getCourses() {
    return this.courses;
  }
}
