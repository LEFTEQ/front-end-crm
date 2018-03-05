import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {BlogService, POST} from '../../../shared/services/blog.service';
import {UserService} from '../../../shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastyService} from 'ng2-toasty';
import {environment} from '../../../../environments/environment';


/*
Todo remove image when view leave
* */

const createMode = [{
  title: 'Create new blog',
}];
const editMode = [{
  title: 'Edit blog',
}];


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'],
  encapsulation: ViewEncapsulation.None

})


export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;
  addNewColumn: boolean;
  tags: any[];
  tagNames: any[] = [];
  id: number;
  edit: boolean;
  post: POST;
  selectedCategoryId: number;
  postId: number;
  texts: any[];
  featured_image?: string;
  featured_image_uploaded?: string;
  postLoaded = false;
  categories: any = [];

  constructor(public _blog: BlogService, private _user: UserService, private router: Router, private route: ActivatedRoute,
              private toast: ToastyService) {
    this.addNewColumn = false;
    const title = new FormControl();
    const slug = new FormControl();
    const body = new FormControl();
    this.blogForm = new FormGroup({
      title: title,
      slug: slug,
      body: body,
    });

  }


  ngOnInit() {
    this.indexCategories();

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (String(this.id) !== 'NaN') {
        this.edit = true;
        this.getPost(this.id);
        this.texts = editMode;
      } else {
        this.edit = false;
        this.texts = createMode;
      }

    });

  }

  /*
    ngAfterViewInit() {
      if (this.edit) {
        setTimeout(() => {

        });
      }
    }
  */

  /* Images handlers */
  onRemoved(event) {
    let path: string;
    if (event.src) {
      path = String(event.src);
      path = path.replace(environment.url + '/storage', '');
    } else {
      path = JSON.parse(event['serverResponse']['_body']).path;
    }

    this.featured_image = '';
    console.log(path);
    this._blog.deleteImage(path).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  onUploadFinished(event) {
    this.featured_image = JSON.parse(event['serverResponse']['_body']).path;
  }
 onSelectCategory(event){
    this.selectedCategoryId = event.target.defaultValue;
 }
  /* End images handlers */
  getPost(id: number) {

    this._blog.getPost(id).subscribe(
      data => {
        this.post = data['post'];
        this.tags = data['tags'];
        this.selectedCategoryId = this.post.category_id;
        if (this.post['featured_image']) {
          let url = this.post['featured_image'];
          url = url.replace('public/', '');
          this.featured_image = url;
          this.featured_image_uploaded = environment.url + '/storage/' + url;
        }

        this.postLoaded = true;
        this.blogForm.setValue({
          title: this.post.title,
          slug: this.post.slug,
          body: this.post.body,
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  /*
    selectAnswer(category, event) {
      const index = this.selectedTags.indexOf(event.target.value);

      if (event.target.checked) {
        this.selectedTags.push(event.target.value);
      } else {
        if (index !== -1) {
          this.selectedTags.splice(index, 1);
        }
      }
    }
    */

  toggleAddNewColumn() {
    this.addNewColumn = !this.addNewColumn;
  }

  storeCategory(form: NgForm) {
    this._blog.storeCategory(form.value.name).subscribe(
      data => {
        this.toast.success({
          title: data['message'], msg: data['message'], showClose: true, timeout: 5000,
          theme: 'bootstrap'
        });
        this.indexCategories();
        form.reset();
      },
      error => {
        console.log(error);
      }
    );
  }

  indexCategories() {
    this._blog.indexCategories().subscribe(
      categories => {
        if (this.edit) {
          this.categories = categories['categories'];
        } else {
          this.categories = categories['categories'];
        }
      }
    );
  }

  pushTagNames() {
    for (const name of this.tags) {
      this.tagNames.push(name['name']);
    }
  }

  storePost(form: NgForm, published: number) {

    this.pushTagNames();

    let userId = 0;
    this._user.getUser().subscribe(
      userData => {
        userId = userData['user'].id;
      }
    );

    this._blog.storePost(form.value.title, form.value.slug, form.value.body, userId, published, this.selectedCategoryId,
      this.featured_image, this.tagNames).subscribe(
      post => {
        this.postId = post['postId'];
        console.log(this.postId);

        if (published === 1) {
          this.toast.success({
            title: 'Successfully published', msg: 'Successfully published', showClose: true, timeout: 5000,
            theme: 'bootstrap'
          });
        } else {
          this.toast.success({
            title: 'Successfully saved concept', msg: 'Successfully saved concept', showClose: true, timeout: 5000,
            theme: 'bootstrap'
          });
        }
        this.router.navigate(['/blog/edit-blog/' + this.postId]);
      }
      ,
      error => {
        console.log(error);
      }
    );

  }

  updatePost(published: number) {
    console.log(this.blogForm);
    console.log(this.selectedCategoryId);

    const form = this.blogForm.value;
    const userId = 0;
    this.pushTagNames();
    this._blog.updatePost(this.post.id, form.title, form.slug, form.body, userId, published, this.selectedCategoryId,
      this.featured_image, this.tagNames).subscribe(
      data => {
        if (published === 1) {
          this.toast.success({
            title: 'Successfully updated & published', msg: 'Successfully updated & published', showClose: true, timeout: 5000,
            theme: 'bootstrap'
          });
        } else {
          this.toast.success({
            title: 'Successfully updated concept', msg: 'Successfully updated concept', showClose: true, timeout: 5000,
            theme: 'bootstrap'
          });
        }
      },
      error => {
        console.log(error);
      }
    );

  }

}
