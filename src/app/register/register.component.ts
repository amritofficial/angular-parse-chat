import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  isPasswordMatch() {
    const val = this.form.value;
    return val && val.password && val.password == val.confirm;
  }

  signUp() {
    const val = this.form.value;
    console.log(val)
    this.authService.signup(val.username, val.email, val.password)
      .subscribe(success => {
        alert('User created successfully !');
        this.router.navigateByUrl('/home');
      }, error => {
        alert(error.message)
      })
  }

  ngOnInit() {
  }

}
