import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

/*const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
      path:"login",
      loadChildren:() =>import('./login/login.module').then(m=>m.LoginModule)

    }
];*/

@NgModule({
  declarations:[],
  imports: [],//RouterModule.forChild(routes)
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
