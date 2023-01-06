import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { HttpModule } from '@angular/http';
import { EmployeeService } from './employeedetails/employeeservice';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GridModule,PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { RatingComponent } from './rating.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { SidebarmenuComponent } from './sidebarmenu/sidebarmenu.component';
//import { IconsModule } from '@progress/kendo-angular-icons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { HammerModule} from '@angular/platform-browser';
import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DbconnectionsComponent } from './dbconnections/dbconnections.component';
import { DBService } from './dbconnections/dbservice';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DataserviceService } from './_services/dataservice.service';
import { CourselistComponent } from './courselist/courselist.component';



const ROUTES: Routes = [
  { path: 'login', component: LoginComponent},
  //{path: '',   redirectTo: '/login', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'employeedtls', component: EmployeedetailsComponent},
  { path: 'sidebarmenu', component: SidebarmenuComponent},
  { path: 'dbconnections', component: DbconnectionsComponent},
  { path: 'courselist', component: CourselistComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}

  
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EmployeedetailsComponent,
    RatingComponent,
    SidebarmenuComponent,
    DbconnectionsComponent,
    PageNotFoundComponent,
    CourselistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    GridModule,
    InputsModule,
    ChartsModule,
    PDFModule,
    ExcelModule,
    PopupModule,
    HammerModule,
    DialogsModule,
    DropDownsModule,
    //IconsModule,
    RouterModule.forRoot(ROUTES),
    NgbModule
  ],
  providers: [EmployeeService,DBService,DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
