import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FeatherIconComponent } from './components/feather-icon/feather-icon.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FeatherIconComponent,
    LayoutComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
  
    
  ],
  exports:[ FeatherIconComponent]
})
export class SharedModule { }
