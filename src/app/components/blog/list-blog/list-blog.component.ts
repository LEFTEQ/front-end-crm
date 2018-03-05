import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {BlogService} from '../../../shared/services/blog.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss']
})
export class ListBlogComponent implements OnInit {

  rows: any = [];
  selected = [];
  tempFilter: any = [];
  columns = [
    { id: 'id' },
    { slug: 'slug' },
    { title: 'title' },
    { featured_image: 'featured_image' }
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private _blog: BlogService) {

   this.getPosts();
  }

  ngOnInit() {
  }


  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {}

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }
  fetchFilterData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
  getPosts() {
    this._blog.indexPosts().subscribe(
      data => {
        // cache our list
        this.tempFilter = data['posts'];
        // push our inital complete list
        this.rows = data['posts'];
        console.log(this.rows);
        this.rows.slice();
      }
    );
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempFilter.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
