import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../authGuard";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
    {
        path:"", component: DashboardComponent,
        children:[
            {
                path:"dashboard",
                loadChildren:() =>import('./dashboard.module').then(m => m.DashboardModule),
                canActivate:[AuthGuardService]
            }
        ]
    }
]


@NgModule({
    exports:[RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class DashboardRoutingModule {

}