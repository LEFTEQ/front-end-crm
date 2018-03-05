import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListBlogComponent} from './list-blog.component';
import {ListBlogRoutingModule} from './list-blog-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {BlogModule} from '../blog.module';

@NgModule({
  imports: [
    CommonModule,
    ListBlogRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    BlogModule
  ],
  declarations: [ListBlogComponent]
})
export class ListBlogModule { }
