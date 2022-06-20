import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  {path:'', children:[
    {path:'add-user', component:AddUsersComponent},
    {path:'list-user', component:ListUserComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
