import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListBlogComponent} from './list-blog.component';

const routes: Routes = [
  {
    path: '',
    component: ListBlogComponent,
    data: {
      title: 'List blog component',
      icon: 'icon-user',
      caption: 'List blog component',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBlogRoutingModule { }
