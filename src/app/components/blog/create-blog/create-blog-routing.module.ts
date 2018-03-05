import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateBlogComponent} from './create-blog.component';


const routes: Routes = [
  {
    path: '',
    component: CreateBlogComponent,
    data: {
      title: 'Blog component',
      icon: 'icon-user',
      caption: 'Blog component',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBlogRoutingModule { }
