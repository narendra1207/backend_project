import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandlogoComponent } from '../masters/brandlogo/brandlogo.component';
import { CategoryComponent } from '../masters/category/category.component';
import { ColorComponent } from '../masters/color/color.component';
import { SizeComponent } from '../masters/size/size.component';
import { TagComponent } from '../masters/tag/tag.component';
import { UsertypeComponent } from '../masters/usertype/usertype.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'brandlogo', component: BrandlogoComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'tag', component: TagComponent },
      { path: 'color', component: ColorComponent },
      { path: 'size', component: SizeComponent },
      { path: 'usertype', component: UsertypeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
