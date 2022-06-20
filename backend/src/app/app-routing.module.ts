import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { contentRoutes } from './shared/routes/content.routes';

const routes: Routes = [
  {path:'', component:LayoutComponent ,children:contentRoutes , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
