import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const formValue = this.form.value;
    console.log(formValue.email + " " + formValue.password);
    this.authService.login(formValue.email, formValue.password)
      .subscribe(success => {
        console.log('Login Success');
        if (success) {
          this.router.navigateByUrl('/home');
        }
      }, error => {
        alert(error);
      })
  }

  ngOnInit() {
  }

}
