import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../shared/services/blog.service';
import {NgForm} from '@angular/forms';
import {ToastyService} from 'ng2-toasty';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[];
  addNewColumn: boolean;

  constructor(private _blog: BlogService, private toast: ToastyService) {
    this.addNewColumn = false;
  }

  ngOnInit() {
    this.indexCategories();
  }

  indexCategories() {
    this._blog.indexCategories().subscribe(
      categories => {

        this.categories = categories['categories'];


      }
    );
  }

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
}
