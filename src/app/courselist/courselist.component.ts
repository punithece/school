import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { filter, reduce } from 'rxjs/operators';
//import * as EventEmitter from 'events';
import { DataserviceService } from '../_services/dataservice.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  courses :any;
  data:any;
  sizeone:any;
   square:any;
   @Input() item ='';
   currentItem = 'Television';
   condition = false;
   changeNameView:any;
   itemView = [
     {id:1,name:"Java8"},
     {id:2,name:"JavaScript"},
     {id:3,name:"React"},
     {id:4,name:"Angular"},
     {id:5,name:"VueJs"}

   ]
   //@Output() newItemEvent = new EventEmitter();
  constructor(private router: Router,private _dataService: DataserviceService) { }

  ngOnInit(): void {
      this.courses = this._dataService.getCourses();
      this.data = this._dataService.getOption();

      //this.changeNameView = "Developed By Punith";
  }

  ngAfterViewInit() {
    this.data = this._dataService.getOption();
  }

  addNewItem(value: string) {
    //this.newItemEvent.emit(value);
  }
  ngOnChanges() {
    this.changeNameView = "Developed By Punith";
  }

  trackByItems(index : number, item: any):number { return item.id ;}

  onCalculateValue() {
    let test1 = of(1,2,3,4,5,6,7,8,9,10);
    let case1 = test1.pipe(
      filter(x=>x%2 ===0),
      reduce((acc,one) => acc + one, 0)
    )
    case1.subscribe(x=>console.log(x));
  }

  greet() {
    let a="hello";
    if(a=="hello") {
      let b="world";
      console.log(a+' '+b);
    }
    console.log(a);
  }
}
