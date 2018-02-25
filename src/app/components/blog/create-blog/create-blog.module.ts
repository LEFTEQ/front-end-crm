import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateBlogRoutingModule} from './create-blog-routing.module';
import {CreateBlogComponent} from './create-blog.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    CommonModule,
    CreateBlogRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule,
    FroalaViewModule
  ],
  declarations: [CreateBlogComponent]
})
export class CreateBlogModule { }
