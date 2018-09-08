import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Parse = require('parse');

@Injectable({
  providedIn: 'root'
})
export class ParseService {
  postsQuery;

  constructor() {
    console.log('Parse initialized!')
    Parse.initialize("angular-parse-chat");
    Parse.serverURL = 'https://angular-parse-chat.herokuapp.com/parse'
  }

  public postsSubscription() {
    if (!this.postsQuery) {
      this.postsQuery = new Parse.Query('Posts');
    }
    return this.postsQuery.subscribe();
  }

  public login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      Parse.User.logIn(email, password, {
        success: function (user) {
          console.log('Logged')
          observer.next(true);
          observer.complete();
        },
        error: function (user, error) {
          observer.error(error)
        }
      });
    })
  }


  public register(username:string, email: string, password:string): Observable<boolean> {
    return new Observable(observer => {
      var user = new Parse.User()
      user.set("email", email)
      user.set("username", username)
      user.set("password", password)
      // user.set("email", "email@example.com");
      user.signUp(null, {
        success: (user) => {
          observer.next(true)
          observer.complete()
        },
        error: (user, error) => {
          observer.error(error)
        }
      })
    })
  }

  public logout(): Observable<boolean> {
    return new Observable(data => {
      Parse.User.logOut().then(() => data.next(true));
    })
  }

  public get currentUser() {
    // this gives the current session token
    // to retreive the current session id use Parse.Session.current()
    // console.log(Parse.User.current().getSessionToken());
    // console.log(Parse.Session.sessionToken);
    return Parse.User.current();
  }

  public getCurrentSession() {
    // console.log(Parse.session.token)
    return Parse.Session.current();
  }
}
