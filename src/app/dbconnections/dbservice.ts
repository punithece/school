import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,Headers, ResponseType  } from '@angular/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import {
  toDataSourceRequestString,
  translateDataSourceResultGroups
} from "@progress/kendo-data-query";
import { AppUrlFiles } from '../AppUrlFiles';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsGet = {
  headersGet: new HttpHeaders({ 'Accept': 'application/json' })
};
@Injectable()
export class DBService {
   
    constructor(private http: HttpClient) { }

    ROOT_URL:String = "";

  public doEmployeeRegister(employee:any) {   
    //let options = new RequestOptions({  headers : headers });
    let body = JSON.stringify(employee);
    return this.http.post(AppUrlFiles.APP_URL_AWS_LOCAL+"api/employee",body, httpOptions);
    /*return this.http.post(`http://localhost:8080/springboot-first-app-testng-1/api/employee`,employee).
        pipe(
           map((data: any) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )*/
    //return this.http.post("http://localhost:8080/springboot-first-app-testng-1/api/employee", body, { headers }).pipe(map(response => 'json'));
    //return this.http.post("http://localhost:8080/springboot-first-app-testng-1/api/employee",employee,{responseType:'text' as 'json'});
  }

  public getDBDtls() {
    return this.http.get(AppUrlFiles.APP_URL_AWS_LOCAL+"api/getDBDtls");
  }

  public updateEmployee(employee:any) {
    let body = JSON.stringify(employee);
    return this.http.post(AppUrlFiles.APP_URL_AWS_LOCAL+"api/updateEmployee",body, httpOptions);
  }

  deleteEmployee(employee:any) {
    return this.http.delete(AppUrlFiles.APP_URL_AWS_LOCAL+"api/deleteEmployee?id="+employee.id,httpOptions);
    //return this.http.delete("http://localhost:8080/springboot-first-app-testng-1/api/deleteEmployee?id=" + employee.id,httpOptions);
}

}