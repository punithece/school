import { ChangeDetectorRef, Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { EmployeeService } from './employeeservice';
import { State, process, DataResult } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent, SelectableSettings,DataBindingDirective, SelectableMode } from '@progress/kendo-angular-grid';
import { employees } from './employees';
import { images } from './images';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { anyChanged } from '@progress/kendo-angular-common';
import { ItemChange } from '@progress/kendo-angular-charts/dist/es2015/common/collection.service';
import { thumbnailsDownIcon } from '@progress/kendo-svg-icons';
import { data } from 'browserslist';


@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  
  
  message:any;
  employeeModal:any;
  name:any;
  salary:any;
  empsections:any; 
  item:any;
  public mySelection1: number[] = [];
  employeeModalRef:any= NgbModalRef;
  action: any;
  public selectableSettings?: SelectableSettings;
  public checkboxOnly = false;
  public mode?: SelectableMode = 'single';
  public drag = false;
   public loading = false;
  
  @ViewChild('content', { static: true }) openModal:any= ElementRef;
  @ViewChild(DataBindingDirective) dataBinding: any;
    public gridData: unknown[] = employees;
    public gridView:  any;
    @ViewChild(DataBindingDirective) dataBindingEmployee: any;
    employeeGridView:any;
    employeeGridData:any;
    public mySelection: string[] = [];
    public opened: boolean = false;
    public openEditDiv: boolean = false;
    public close(status:any) {
        console.log(`Dialog result: ${status}`);
        this.opened = false;
        //this.modalRef.close();
    }
    viewLocalStorageValue:any;
  constructor(private employeeService:EmployeeService,private modalService: NgbModal,private ref?: ChangeDetectorRef) {
    this.employeeModal = { },
    this.setSelectableSettings();
   }
  //private modalService: NgbModal,private empModalRef:NgbModalRef,
  public setSelectableSettings(): void {
    if (this.checkboxOnly || this.mode === 'single') {
        this.drag = false;
    }

    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: this.mode,
        drag: this.drag
    };
}
  ngOnInit(): void {
    /*this.employeeService.getEmployeeDtls(stateEmployee: State).subscribe(
      data => {      
       console.log(data);     
        this.employeeGridView = data;
               
        return true;
      },
      error => {
        Swal.fire('Hey user!', 'Employee Details Not Found!', 'info');
        console.error("Error getting employee details!");
        //return Observable.throw(error);
      }
   ); */ 
   this.onLoadEmployeeDtls();
  }

  ngAfterViewInit() {  
    this.viewLocalStorageValue = localStorage.getItem('viewAccess');
    /*this.employeeService.getEmployeeDtls(stateEmployee: State).subscribe(
      data => {      
       console.log(data);     
        this.employeeGridView = data;
               
        return true;
      },
      error => {
        Swal.fire('Hey user!', 'Employee Details Not Found!', 'info');
        console.error("Error getting employee details!");
        //return Observable.throw(error);
      }
   );  */
   this.onLoadEmployeeDtls();
  }

  public onLoadEmployeeDtls() {
    this.loading = true;
    this.employeeService.getEmployeeDtls().subscribe(data => {
      this.employeeGridView = data;
      this.employeeGridData = process(this.employeeGridView, this.stateEmployee);
      this.loading = false;
      //this.employeeGridView = process(data.,this.stateEmployee);
    })
  }

  public stateEmployee: State = {
    skip: 0,
    //take:10,
    //sort: [],
    //filter: { filters: [], logic: "and" },
  }

  public dataStateChange(stateEmployee: DataStateChangeEvent): void {
    this.stateEmployee = stateEmployee;
    this.employeeGridData = process(this.employeeGridView , this.stateEmployee);
  }

  public registerNow(){
    if (this.action == 'new') {
 
      let resp=this.employeeService.doEmployeeRegister(this.employeeModal);
       
        resp.subscribe((data)=> {
          this.message=data;
          Swal.fire("Employee Created Successfully");
          this.onLoadEmployeeDtls();
          this.employeeModalRef.close();
          this.employeeModal =  {};
        });
        } else {
          let resp=this.employeeService.updateEmployee(this.employeeModal);

          resp.subscribe((data)=> {
            this.message=data
            Swal.fire("Employee Updated Successfully");
            this.onLoadEmployeeDtls();
            this.employeeModalRef.close();
          });
          
        }
      } 


      /*columnDefs = [
        {headerName: 'Make', field: 'make' },
        {headerName: 'Model', field: 'model' },
        {headerName: 'Price', field: 'price'}
      ];
    
      rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 }
      ];*/

      public onFilter(input: Event): void {
        const inputValue = (input.target as HTMLInputElement).value;

        this.gridView = process(this.gridData, {
            filter: {
                logic: "or",
                filters: [
                    {
                        field: 'full_name',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'job_title',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'budget',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'phone',
                        operator: 'contains',
                        value: inputValue
                    },
                    {
                        field: 'address',
                        operator: 'contains',
                        value: inputValue
                    }
                ]
            }
        }).data;

        this.dataBinding.skip = 0;
    }

    public photoURL(dataItem: {img_id: string, gender: string}): string {
        const code: string = dataItem.img_id + dataItem.gender;
        const image: {[Key: string]: string} = images;

        return image[code];
    }

    public flagURL(dataItem: {country: string}): string {
        const code: string = dataItem.country;
        const image: {[Key: string]: string} = images;

        return image[code];
    }

    public toggleText = 'Hide';
    public show = false;

    public onToggle(): void {
        this.show = !this.show;
        this.toggleText = this.show ? 'Hidе' : 'Show';
    }

    //open Modal on Popup start

    public invokeEmployeeMethodAdd() {
      this.action = 'new';
      this.employeeModalRef = this.modalService.open(this.openModal, { centered: true, size: 'lg', backdrop: 'static' });
    }

    //open Model on popup end

    //Edit Employee selected start

    public extrateData() {
      let rowId = this.mySelection1[0];
      let dataEmployee = this.employeeGridView;
      console.log("rowId: ", rowId)
      let itemValue :any;
      let index = dataEmployee.findIndex(function (item:any) {
         //alert(item.id == rowId);
         return item.id == rowId;

      }) ; //findIndex(item.id == rowId);
      console.log("inatdex: ",index)
      this.employeeModal = this.employeeGridView[index];
      console.log ("employeeGridView ===  ",this.employeeGridView[index])
    }

    editEmployee() {
      this.extrateData();
      let selectedRecords = this.employeeModal;
      console.log("this.employeeModal === ", this.employeeModal);
      
      //if (selectedRecords) {
        if (this.employeeModal && Object.keys(this.employeeModal).length != 0) {
          this.action = 'update'
          this.employeeModalRef = this.modalService.open(this.openModal, { centered: true, size: 'lg', backdrop: 'static' });
          this.ref?.markForCheck();
        } else {
          Swal.fire('Hey user!', 'selected row not found!', 'info');
        }
      /*} else {
        Swal.fire('Hey user!', 'Please select a row then click on edit button!', 'info');
      }*/
    }
//Edit Employee END
    getEmployeeClosedData() {
      this.onLoadEmployeeDtls();
  }

  deleteEmployeeRecord() {
    this.extrateData();
    var selectedRecords = this.employeeModal;
    //if (selectedRecords) {
      if (this.employeeModal && Object.keys(this.employeeModal).length != 0) {
        console.log("Entered ");
        this.opened = true;
        //this.modalRef = this.modalService.open(this.deletModal, { centered: true, size: 'sm', backdrop: 'static' });
      } else {
        Swal.fire('Hey user!', 'Please select a row then click on Delete button!', 'info');
  
      }
    /*} else {
      Swal.fire('Hey user!', 'Please select a row then click on Delete button!', 'info');
    }*/
  }

  deleteEmployee() {
    console.log("delete", this.employeeModal)
    let resp=this.employeeService.deleteEmployee(this.employeeModal);

          resp.subscribe((data)=> {
            this.message=data
            Swal.fire("Employee Id deleted Successfully");
            this.opened = false;
            this.onLoadEmployeeDtls();
          },error => {
            this.opened = false;
            Swal.fire('Hey user!', 'Employee record Not Found!', 'info');
            console.error("Error in deleting record!");
            
          });
  }
}
