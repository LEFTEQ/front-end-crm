import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateBlogComponent} from './create-blog.component';


const routes: Routes = [
  {
    path: '',
    component: CreateBlogComponent,
    data: {
      title: 'Create blog',
      icon: 'icon-user',
      caption: 'Create blog',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBlogRoutingModule { }
