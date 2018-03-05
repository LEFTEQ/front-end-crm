import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogService} from '../../shared/services/blog.service';
import { CategoriesComponent } from './categories/categories.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  exports: [
    CategoriesComponent,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  providers: [
    BlogService
  ],
  declarations: [CategoriesComponent]
})
export class BlogModule { }
