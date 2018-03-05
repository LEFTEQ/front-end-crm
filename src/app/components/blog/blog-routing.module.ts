import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Blog',
      status: false
    },
    children: [
      {
        path: 'create-blog',
        loadChildren: './create-blog/create-blog.module#CreateBlogModule'
      },
      {
        path: 'list-blog',
        loadChildren: './list-blog/list-blog.module#ListBlogModule'
      },
      {
        path: 'edit-blog/:id',
        loadChildren: './create-blog/create-blog.module#CreateBlogModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule{ }
