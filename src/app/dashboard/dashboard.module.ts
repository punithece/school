import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.route";




@NgModule({
   declarations:[DashboardComponent],
   imports:[DashboardRoutingModule],
   providers:[],
   entryComponents: []
})
export class DashboardModule {

}