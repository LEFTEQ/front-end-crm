import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services/auth.service';
import {ToastyService} from 'ng2-toasty';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss'
  ]
})
export class BasicLoginComponent implements OnInit {
  signInForm: FormGroup;
  rememberMe: boolean;

  constructor(private router: Router, private authService: AuthService, private toast: ToastyService) {
    const email = new FormControl('', [Validators.required, Validators.email]);
    const password = new FormControl('', Validators.required);
    const rememberMe = new FormControl();
    this.signInForm = new FormGroup({
      email: email,
      password: password,
      rememberMe: rememberMe
    });
  }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  onSignIn(form: NgForm) {
    if (form.value.rememberMe === true) {
      this.rememberMe = true;
    } else {
      this.rememberMe = false;
    }
    this.authService.onSignIn(form.value.email, form.value.password).subscribe(
      (data) => {
        if (this.rememberMe === true) {
          localStorage.setItem('token', data.token);
        } else {
          this.authService.setTokenSingle(data.token);
        }

        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);
        this.toast.error({
          title: error.status, msg: error.error.message, showClose: true, timeout: 5000,
          theme: 'bootstrap'
        });
      }
    );
  }

}

