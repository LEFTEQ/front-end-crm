import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ToastyService} from 'ng2-toasty';


@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {
  regForm: FormGroup;
  submitted: boolean;
  emailTaken: boolean;
  constructor(private authService: AuthService, private toast: ToastyService) {
    this.emailTaken = false;
    const username = new FormControl('', Validators.required);
    const email = new FormControl('', [Validators.required, Validators.email]);
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);


    this.regForm = new FormGroup({
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword

    });
  }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  onSignUp(form: NgForm) {
    this.authService.onSignUp(form.value.username, form.value.email, form.value.password).subscribe(
      (data) => {
        this.emailTaken = false;
        this.toast.success({
          title: data.message, msg: data.message, showClose: true, timeout: 5000,
          theme: 'bootstrap'
        });
      },
      (error) => {
        console.log(error);
        if (error.error.errors.email) {
          this.emailTaken = true;
          this.toast.error({
            title: error.status, msg: error.error.errors.email, showClose: true, timeout: 5000,
            theme: 'bootstrap'
          });
        }else {
          this.emailTaken = false;
          this.toast.error({
            title: error.status, msg: error, showClose: true, timeout: 5000,
            theme: 'bootstrap'
          });
        }
      }
    );
  }

}
