import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateBlogRoutingModule} from './create-blog-routing.module';
import {CreateBlogComponent} from './create-blog.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {BlogService} from '../../../shared/services/blog.service';
import {ImageUploadModule} from '../../../shared/image-upload/image-upload.module';
import {ImageService} from '../../../shared/image-upload/image-upload/image.service';
import {BlogModule} from '../blog.module';



@NgModule({
  imports: [
    CommonModule,
    CreateBlogRoutingModule,
    SharedModule,
    FroalaEditorModule,
    FroalaViewModule,
    ImageUploadModule,
    BlogModule
  ],
  declarations: [CreateBlogComponent],
  providers: [
    ImageService
  ]
})
export class CreateBlogModule { }
