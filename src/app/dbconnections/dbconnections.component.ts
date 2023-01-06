import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataStateChangeEvent, SelectableMode, SelectableSettings } from '@progress/kendo-angular-grid';
import { DBService } from './dbservice';
import { State, process, DataResult } from '@progress/kendo-data-query';
import { anyChanged } from '@progress/kendo-angular-common';

@Component({
  selector: 'app-dbconnections',
  templateUrl: './dbconnections.component.html',
  styleUrls: ['./dbconnections.component.css']
})
export class DbconnectionsComponent implements OnInit {
  dbModal:any;
  public mySelection1: number[] = [];
  gridDataDB:any
  gridViewDB:any;
  dbModalRef:any= NgbModalRef;
  action: any;
  public selectableSettings?: SelectableSettings;
  public checkboxOnly = false;
  public mode?: SelectableMode = 'single';
  public drag = false;
  public loading = false;
  public opened: boolean = false;
    public openEditDiv: boolean = false;
    public close(status:any) {
        console.log(`Dialog result: ${status}`);
        this.opened = false;
        //this.modalRef.close();
    }
    responsePayload:any;
  @ViewChild('content', { static: true }) openModal:any= ElementRef;
  constructor(private dbService:DBService,private modalService: NgbModal,private ref?: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.onLoadDBDetails();
  }

  
 
  public stateDB: State = {
     skip:0
  }

  onLoadDBDetails() {
    this.loading = true;
    this.dbService.getDBDtls().subscribe(data => {
      this.gridViewDB= data;
      this.gridDataDB = process(this.gridViewDB, this.stateDB);
      this.loading = false;
  });
}
  

  public dataStateChange(stateDB: DataStateChangeEvent): void {
    this.stateDB = stateDB;
    this.gridDataDB = process(this.gridViewDB , this.stateDB);
  }
  invokeDBMethodAdd() {
    this.action = 'new';
    this.dbModalRef = this.modalService.open(this.openModal, { centered: true, size: 'lg', backdrop: 'static' });
  }

  editDB() {

  }

  deleteDBRecord() {

  }

 



}
