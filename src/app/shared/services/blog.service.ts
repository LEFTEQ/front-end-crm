import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

interface CATEGORY {
  id: number;
  name: string;
}

interface TAG {
  id: number;
  name: string;
}

export interface POST {
  id: number;
  title: string;
  slug: string;
  body: string;
  featured_img: string;
  published: number;
  category_id: number;
}

@Injectable()
export class BlogService {

  constructor(private http: HttpClient) {
  }

  public storeCategory(name: string) {
    return this.http.post<CATEGORY>(environment.apiUrl + '/blog/storecategory',
      {name: name},
      httpOptions);
  }
  public storeTag(name: string) {
    return this.http.post<TAG>(environment.apiUrl + '/blog/storetag',
      {name: name},
      httpOptions);
  }
  public indexCategories() {
    return this.http.get<CATEGORY>(environment.apiUrl + '/blog/indexcategories');
  }
  public indexTags() {
    return this.http.get<TAG>(environment.apiUrl + '/blog/indextags');
  }
  public indexPosts() {
    return this.http.get(environment.apiUrl + '/blog/indexposts');
  }

  public storePost(title: string, slug: string, body: string, author: number, published: number, category_id: number,
                   featured_image: string, tags: any[]) {
    return this.http.post<POST>(environment.apiUrl + '/blog/storepost',
      {title: title, slug: slug, body: body, author: author, published: published, category_id: category_id,
        featured_image: featured_image, tags: tags},
      httpOptions);
  }

  public getPost(id: number) {

    return this.http.get<POST>(environment.apiUrl + '/blog/getpost/' + id);
  }

  public deleteImage(path: string) {
    return this.http.post(environment.apiUrl + '/blog/deleteimage',
      {path: path});
  }

  public updatePost(id: number, title: string, slug: string, body: string, author: number, published: number, category_id: number,
                    featured_image: string, tags: any[]) {
    return this.http.post(environment.apiUrl + '/blog/updatepost',
      {
        id: id, title: title, slug: slug, body: body, author: author, published: published, category_id: category_id,
        featured_image: featured_image, tags: tags
      },
      httpOptions);
  }
}
