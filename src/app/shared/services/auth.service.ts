import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';

@Injectable()
export class AuthService {

  constructor(private auth$: ParseService) { }

  login(email:string, password:string) {
    return this.auth$.login(email,password)
  }

  // logout() {
  //   return this.auth$.logout()
  // }

  signup(username, email:string, password:string) {
    return this.auth$.register(username, email, password)
  }

  logout() {
    return this.auth$.logout();
  }

  get authenticated(): boolean {
    // console.log(this.auth$.getCurrentSession());
    return this.auth$.currentUser !== null;
  }
}
