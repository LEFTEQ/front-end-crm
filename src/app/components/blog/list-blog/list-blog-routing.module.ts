import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListBlogComponent} from './list-blog.component';

const routes: Routes = [
  {
    path: '',
    component: ListBlogComponent,
    data: {
      title: 'Simple Login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListBlogRoutingModule { }
