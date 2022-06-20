import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CKEditorModule } from 'ngx-ckeditor';


@NgModule({
  declarations: [
    AddProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    CKEditorModule,
    
  ]
})
export class ProductsModule { }
